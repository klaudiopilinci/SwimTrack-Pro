from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import Session
from typing import List, Optional
import bcrypt
import re

from database import engine, get_db, Base
import models

models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="SwimTrack Pro API",
    description="Ekosistemi Inteligjent për Menaxhimin dhe Analitikën e Notit",
    version="2.5.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- SIGURIA (BCRYPT) ---
def hash_password(password: str) -> str:
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode("utf-8"), salt).decode("utf-8")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode("utf-8"), hashed_password.encode("utf-8"))

# --- MODELET PYDANTIC ---
class UserRegisterInput(BaseModel):
    emri: str
    email: str
    fjalekalimi: str
    roli: str = "notar"

class UserLoginInput(BaseModel):
    email: str
    fjalekalimi: str

class SwimmerInput(BaseModel):
    emri: str
    niveli: str
    madhesia_pishines: int
    objektivi: str
    ditet_ne_jave: int

class SessionLogInput(BaseModel):
    notari: str
    distanca_e_planifikuar: int
    distanca_reale: int
    koha_minuta: float
    veshtiresia: str

class BiometricInput(BaseModel):
    mosha: int
    koha_sekonda_lap: float
    numri_terheqjeve: int
    pulsi_bpm: int

class AIChatInput(BaseModel):
    mesazhi: str
    notari: Optional[str] = "Klaudio"
    gjuha: Optional[str] = "sq"

@app.get("/")
def home():
    return {"status": "Online", "version": "2.5.0", "message": "SwimTrack Pro API"}

# --- AUTHENTICATION ---
@app.post("/auth/register")
def register_user(user_data: UserRegisterInput, db: Session = Depends(get_db)):
    user_exists = db.query(models.UserModel).filter(models.UserModel.email == user_data.email).first()
    if user_exists:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Ky email është i regjistruar tashmë në sistem!"
        )
    hashed_pwd = hash_password(user_data.fjalekalimi)
    perdorues_ri = models.UserModel(
        emri=user_data.emri,
        email=user_data.email,
        fjalekalimi_hash=hashed_pwd,
        roli=user_data.roli.lower()
    )
    db.add(perdorues_ri)
    db.commit()
    db.refresh(perdorues_ri)
    return {
        "mesazhi": "Llogaria u krijua me sukses!",
        "id": perdorues_ri.id,
        "emri": perdorues_ri.emri,
        "email": perdorues_ri.email,
        "roli": perdorues_ri.roli
    }

@app.post("/auth/login")
def login_user(login_data: UserLoginInput, db: Session = Depends(get_db)):
    user = db.query(models.UserModel).filter(models.UserModel.email == login_data.email).first()
    if not user or not verify_password(login_data.fjalekalimi, user.fjalekalimi_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email ose fjalëkalim i pasaktë!"
        )
    return {
        "status": "Sukses",
        "id": user.id,
        "emri": user.emri,
        "email": user.email,
        "roli": user.roli
    }

# --- SMART SWIM PLANNER ---
@app.post("/planner/generate")
def generate_and_save_plan(swimmer: SwimmerInput, db: Session = Depends(get_db)):
    if swimmer.niveli.lower() == "fillestar":
        nxehje = f"200m not i lirë i lehtë (në pishinë {swimmer.madhesia_pishines}m)"
        kryesore = f"4 x 50m me pushim 30s (Fokusi: {swimmer.objektivi})"
        qetesim = "100m not i qetë për rikthimin e frymëmarrjes"
        distanca = 500
    elif swimmer.niveli.lower() == "mesatar":
        nxehje = "400m të përziera (stili i lirë + shpinë)"
        kryesore = f"8 x 100m me pushim 20s (Fokusi: {swimmer.objektivi})"
        qetesim = "200m not qetësues me stil shpinë"
        distanca = 1400
    else:
        nxehje = "600m kombinim teknik me ritëm mesatar"
        kryesore = f"10 x 200m me intensitet të lartë (Fokusi: {swimmer.objektivi})"
        qetesim = "300m not i lehtë relaksues"
        distanca = 2900

    plan_db = models.TrainingPlanModel(
        notari=swimmer.emri,
        niveli=swimmer.niveli,
        madhesia_pishines=swimmer.madhesia_pishines,
        objektivi=swimmer.objektivi,
        distanca_totale=distanca,
        nxehja=nxehje,
        seanca_kryesore=kryesore,
        qetesimi=qetesim
    )
    db.add(plan_db)
    db.commit()
    db.refresh(plan_db)

    return {
        "mesazhi": "Plani u gjenerua me sukses!",
        "id_ne_databaze": plan_db.id,
        "notari": plan_db.notari,
        "distanca_totale_metra": plan_db.distanca_totale,
        "plani_stervitor": {
            "1_nxehja": plan_db.nxehja,
            "2_seanca_kryesore": plan_db.seanca_kryesore,
            "3_qetesimi": plan_db.qetesimi
        }
    }

# --- ADAPTIVE TRAINING & TSS ---
@app.post("/sessions/log")
def log_training_session(session_data: SessionLogInput, db: Session = Depends(get_db)):
    sesioni_ri = models.TrainingSessionModel(
        notari=session_data.notari,
        distanca_e_planifikuar=session_data.distanca_e_planifikuar,
        distanca_reale=session_data.distanca_reale,
        koha_minuta=session_data.koha_minuta,
        veshtiresia=session_data.veshtiresia
    )
    db.add(sesioni_ri)
    db.commit()
    db.refresh(sesioni_ri)

    pace_per_100m = 0.0
    if session_data.distanca_reale > 0:
        pace_per_100m = round((session_data.koha_minuta / (session_data.distanca_reale / 100)), 2)

    koef = {"e_lehte": 1.0, "mesatare": 1.5, "shume_e_veshtire": 2.2}.get(session_data.veshtiresia.lower(), 1.2)
    ngarkesa_tss = round((session_data.koha_minuta * koef * (session_data.distanca_reale / 1000)), 1)

    rekomandimi = "Stërvitje e shkëlqyer! Vazhdoni me këtë ngarkesë progresive."
    statusi_lodhjes = "Optimal"

    if session_data.distanca_reale < session_data.distanca_e_planifikuar:
        if session_data.veshtiresia.lower() in ["mesatare", "shume_e_veshtire"]:
            statusi_lodhjes = "Mbingarkesë e Lartë"
            rekomandimi = "Analiza Fiziologjike: U vu re lodhje e parakohshme. Propozojmë ulje të volumit me 15% dhe pushim aktiv 48 orë."
    elif session_data.distanca_reale >= session_data.distanca_e_planifikuar:
        if session_data.veshtiresia.lower() == "e_lehte":
            statusi_lodhjes = "Nën-ngarkesë (Gati për rritje)"
            rekomandimi = "Analiza e Sistemit: Trupi juaj e përballoi lehtësisht. Propozojmë rritje të distancës me +200m në seancën e radhës."

    return {
        "mesazhi": "Stërvitja u regjistrua me sukses!",
        "id_stervitja": sesioni_ri.id,
        "notari": sesioni_ri.notari,
        "ritmi_100m": f"{pace_per_100m} min/100m",
        "ngarkesa_stervitore_tss": ngarkesa_tss,
        "statusi_lodhjes": statusi_lodhjes,
        "analiza_adaptive": rekomandimi
    }

# --- SWOLF & HR ZONES ---
@app.post("/analytics/swolf-zones")
def calculate_swolf_and_zones(data: BiometricInput):
    swolf = round(data.koha_sekonda_lap + data.numri_terheqjeve, 1)
    if swolf < 35:
        klasifikimi_swolf = "Nivel Elitar (Hidrodinamikë e shkëlqyer)"
    elif swolf <= 45:
        klasifikimi_swolf = "Nivel Shumë i Mirë (Teknikë e qëndrueshme)"
    elif swolf <= 55:
        klasifikimi_swolf = "Nivel Mesatar (Kërkohet shtrirje më e gjatë e krahut)"
    else:
        klasifikimi_swolf = "Kërkon Përmirësim (Lëvizje të shpejta, kapje e dobët e ujit)"

    max_hr = 220 - data.mosha
    hr_percent = round((data.pulsi_bpm / max_hr) * 100, 1) if max_hr > 0 else 0

    if hr_percent < 60:
        zona = "Zone 1: Rigjenerim Aktiv"
        fokusi = "Përmirësim i qarkullimit dhe eliminim i laktatit (Puls i lehtë)"
    elif hr_percent < 70:
        zona = "Zone 2: Baza Aerobike (Endurance)"
        fokusi = "Zhvillim i kapacitetit kardio dhe efiçencë e oksigjenit"
    elif hr_percent < 80:
        zona = "Zone 3: Ritëm Gaze (Tempo)"
        fokusi = "Konsolidim i shpejtësisë aerobike për gara të gjata"
    elif hr_percent < 90:
        zona = "Zone 4: Pragu Anaerobik (Threshold)"
        fokusi = "Tolerancë e lartë ndaj lodhjes dhe djegies muskulare"
    else:
        zona = "Zone 5: VO2 Max (Sprint Maksimal)"
        fokusi = "Fuqi shpërthyese anaerobike dhe shpejtësi maksimale"

    return {
        "swolf_score": swolf,
        "klasifikimi_swolf": klasifikimi_swolf,
        "max_hr": max_hr,
        "hr_percent": hr_percent,
        "zona_kardiake": zona,
        "fokusi_fiziologjik": fokusi
    }

# =========================================================================
# AI COACH MULTI-SPORT & NJERËZOR (NOT, PALESTËR, VRAP, FUTBOLL, SHËNDET)
# =========================================================================
@app.post("/ai-coach/chat")
def ai_coach_chat(data: AIChatInput):
    msg = data.mesazhi.lower()
    emri = data.notari or "Kampion"
    is_sq = data.gjuha == "sq"

    dist_match = re.search(r'(\d+)\s*(m|metra|meters|km)', msg)
    koment_dist = ""
    if dist_match:
        val, unit = dist_match.group(1), dist_match.group(2)
        koment_dist = f"Bravo për ato {val}{unit}, është një distancë shumë serioze! " if is_sq else f"Props for hitting {val}{unit}, that's solid work! "

    # 1. PËRSHËNDETJE / IDENTITET / FALENDERIM
    if any(w in msg for w in ["pershendetje", "përshëndetje", "ckemi", "çkemi", "si je", "hello", "hi", "hey", "miremengjes", "miredita"]):
        if len(msg.split()) <= 5:
            return {
                "pergjigjja": (
                    f"Ç'kemi {emri}! 😊 Jam super mirë, këtu jam për ty. Si po të shkon dita? Ke bërë not sot, ke qenë në palestër apo vrap, apo thjesht do të bisedojmë për formën tënde fizike?"
                    if is_sq else f"Hey {emri}! 😊 Doing awesome and right here for you. How's your day going? Did you hit the pool, gym, or a run today?"
                ),
                "plani_i_sugjeruar": None
            }

    if any(w in msg for w in ["kush je", "ca je", "who are you", "what are you"]):
        return {
            "pergjigjja": (
                f"Unë jam trajneri yt personal inteligjent te SwimTrack Pro! Nuk di vetëm për notin, por të ndihmoj edhe kur bën palestër, vrap, futboll, me ushqimin, gjumin dhe çdo lodhje apo dhimbje të trupit. Më pyet për çfarë të duash!"
                if is_sq else f"I'm your intelligent personal coach at SwimTrack Pro! Beyond swimming, I help you manage gym workouts, running, team sports, sleep, nutrition, and any physical fatigue. Ask me anything!"
            ),
            "plani_i_sugjeruar": None
        }

    if any(w in msg for w in ["faleminderit", "flm", "rrofsh", "thanks", "thank you"]):
        return {
            "pergjigjja": (
                f"Asgjë fare, {emri}! Për këtë jam këtu. Kujdesu për veten dhe më shkruaj sa herë të duash këshillë. Sukses! 💪🔥"
                if is_sq else f"You're very welcome, {emri}! Always here for you. Take care and reach out anytime! 💪🔥"
            ),
            "plani_i_sugjeruar": None
        }

    # 2. URGJENCË / TEMPERATURË / GRIP / MARRJE MENDSH / DHIMBJE KOKE
    if any(w in msg for w in ["temperatur", "ethe", "grip", "semur", "sëmur", "marrje mendsh", "marramendje", "gjoks", "vjell", "koke", "kokë", "fever", "sick", "flu", "dizzy", "headache", "chest"]):
        if is_sq:
            return {
                "pergjigjja": f"Dëgjo këshillën time si mik dhe trajner, {emri}: kur ke temperaturë, dhimbje të fortë koke, marrje mendsh ose shenja gripi, **trupi po shpenzon 100% të energjisë për të luftuar virusin/lodhjen**. Mos hyr në ujë sot dhe mos bëj asnjë sport të rëndë! Pi çaj të ngrohtë, lëngje me elektrolite, ha supë ose fruta dhe fli mirë. Pishina pret për nesër ose pasnesër:",
                "plani_i_sugjeruar": {
                    "titulli": "Protokolli i Shërimit: Pushim Total",
                    "distanca_totale_metra": 0,
                    "1_nxehja": "Pushim absolut jashtë ujit dhe dhomë e ngrohtë",
                    "2_seanca_kryesore": "2–3 litra ujë/çaj + vitamina C dhe ushqim i lehtë",
                    "3_qetesimi": "8–9 orë gjumë të thellë për rikuperim imunitar"
                }
            }
        else:
            return {
                "pergjigjja": f"Listen to me closely, {emri}: when dealing with a fever, strong headache, dizziness, or flu symptoms, your body needs 100% of its resources to heal. Skip the pool and intense workouts today! Stay warm, drink plenty of fluids/tea, rest up, and let your immune system win:",
                "plani_i_sugjeruar": {
                    "titulli": "Recovery Protocol: Complete Rest",
                    "distanca_totale_metra": 0,
                    "1_nxehja": "Complete rest out of the water",
                    "2_seanca_kryesore": "Hydration, electrolytes, and vitamin-rich warm meals",
                    "3_qetesimi": "8–9 hours deep sleep before any exercise"
                }
            }

    # 3. PALESTËR / PESHA / MUSKUJ TË VRARË (CROSS-TRAINING)
    if any(w in msg for w in ["palest", "pesh", "hekur", "gym", "weight", "lift", "bicep", "squat", "muskuj", "vrar", "sore"]):
        if is_sq:
            return {
                "pergjigjja": f"{koment_dist}Kombinimi i palestrës me notin është zgjedhja më e zgjuar që mund të bësh, {emri}! 💪 Kur ngre pesha, fibrat e muskujve krijojnë mikro-çarje dhe mbushen me acid laktik (prandaj ndihesh 'i vrarë'). Noti është **rikuperimi aktiv perfekt** sepse në ujë s'ka peshë mbi nyje dhe uji masazhon muskujt duke rritur qarkullimin e gjakut. Mos bëj sprinte të forta sot, thjesht bëj këtë not të butë çlirues:",
                "plani_i_sugjeruar": {
                    "titulli": "Rikuperim Aktiv Pas Palestrës (Active Flush)",
                    "distanca_totale_metra": 800,
                    "1_nxehja": "200m not i lirë shumë i qetë për zgjatjen e muskujve",
                    "2_seanca_kryesore": "4 x 100m not me ritëm të butë (përzier krol + shpinë)",
                    "3_qetesimi": "200m shpinë e ngadaltë + dush i ngrohtë & proteina"
                }
            }
        else:
            return {
                "pergjigjja": f"{koment_dist}Pairing gym lifting with swimming is top-tier athletic conditioning, {emri}! 💪 Heavy lifting causes micro-tears and stiffness (DOMS). Easy swimming acts as the ultimate active recovery: zero joint impact and water pressure flushes metabolic waste out of your muscles. Try this light recovery swim:",
                "plani_i_sugjeruar": {
                    "titulli": "Post-Gym Active Flush Swim",
                    "distanca_totale_metra": 800,
                    "1_nxehja": "200m super easy freestyle to lengthen tight muscles",
                    "2_seanca_kryesore": "4 x 100m relaxed alternating freestyle and backstroke",
                    "3_qetesimi": "200m gentle backstroke + protein shake post-swim"
                }
            }

    # 4. VRAP / FUTBOLL / BASKETBOLL / BIÇIKLETË / KARDIO NË TOKË
    if any(w in msg for w in ["vrap", "futboll", "basket", "tenis", "biciklet", "biçiklet", "kardio", "maraton", "run", "football", "soccer", "basketball", "cycling", "tennis"]):
        if is_sq:
            return {
                "pergjigjja": f"{koment_dist}Sportet në tokë si vrapi, futbolli apo basketbolli janë super për zemrën, por krijojnë goditje të forta (*impact*) te gjunjët, kaviljet dhe pulpat. Prandaj pas tyre ndihesh me këmbët e rënda si plumb! Për ta shlodhur pjesën e poshtme pa humbur kondicionin e kardios, bëj këtë seancë në pishinë ku punojnë kryesisht krahët dhe mushkëritë:",
                "plani_i_sugjeruar": {
                    "titulli": "Rikuperim Këmbësh Pas Vrapit / Futbollit",
                    "distanca_totale_metra": 1000,
                    "1_nxehja": "200m krol i lehtë me rrotullim të lirë",
                    "2_seanca_kryesore": "6 x 100m me pull-buoy mes këmbëve (këmbët pushojnë 100%)",
                    "3_qetesimi": "200m not shpinë duke lëshuar kyçet e këmbëve të lira"
                }
            }
        else:
            return {
                "pergjigjja": f"{koment_dist}Land sports like running, football, or basketball build great stamina, but they put repetitive ground impact on your knees, ankles, and calves. Swimming lets your joints decompress while keeping your cardio sharp! Here's a leg-saving pool session:",
                "plani_i_sugjeruar": {
                    "titulli": "Post-Run / Football Leg Decompression",
                    "distanca_totale_metra": 1000,
                    "1_nxehja": "200m relaxed mixed swim",
                    "2_seanca_kryesore": "6 x 100m pull-buoy freestyle (gives your legs complete rest)",
                    "3_qetesimi": "200m easy backstroke with loose ankles"
                }
            }

    # 5. PAGJUMËSIA / PUNA NË ZYRË / LODHJA MENDORE / STRESI
    if any(w in msg for w in ["gjum", "pagjum", "pun", "zyr", "kompjuter", "shkoll", "stres", "ankth", "merzit", "mërzit", "nervoz", "sleep", "work", "office", "stress", "tired"]):
        if is_sq:
            return {
                "pergjigjja": f"Të kuptoj plotësisht, {emri}. Kur rri gjithë ditën në punë, shkollë ose para kompjuterit (ose kur nuk ke fjetur mirë), truri mbushet me kortizol dhe qafa e shpatullat ngurtësohen. Uji është ilaçi më i mirë natyral: ul tensionin nervor dhe të ndihmon të flesh si qengj sonte! Mos u sforco me shpejtësi sot, bëj këtë not terapeutik me frymëmarrje të thellë:",
                "plani_i_sugjeruar": {
                    "titulli": "Çlirim Nga Stresi i Ditës & Gjumë i Thellë",
                    "distanca_totale_metra": 600,
                    "1_nxehja": "200m not shumë i qetë pa kronometër e pa stres",
                    "2_seanca_kryesore": "4 x 50m rrëshqitje të gjata në ujë me frymëmarrje të thellë",
                    "3_qetesimi": "200m not shpinë duke relaksuar qafën dhe shpatullat"
                }
            }
        else:
            return {
                "pergjigjja": f"I totally feel you, {emri}. Long hours at work/school or poor sleep spike cortisol and tighten up your neck and shoulders. Water is natural therapy—it drops nervous tension and guarantees deeper sleep tonight. Don't race the clock today; try this mindful reset:",
                "plani_i_sugjeruar": {
                    "titulli": "Stress Reset & Deep Sleep Swim",
                    "distanca_totale_metra": 600,
                    "1_nxehja": "200m unhurried easy swimming",
                    "2_seanca_kryesore": "4 x 50m long relaxed glides focusing on slow exhales",
                    "3_qetesimi": "200m soothing backstroke to loosen neck & shoulders"
                }
            }

    # 6. SUPLEMENTE & USHQIMI (KREATINË, PROTEINA, MAGNEZ, KAFE, DIETË)
    if any(w in msg for w in ["kreatin", "protein", "vitamin", "magnez", "kafe", "ushq", "ha ", "ham", "uri", "ujë", "uje", "pi ", "dobës", "dobes", "creatine", "protein", "magnesium", "eat", "food", "diet", "water"]):
        if is_sq:
            return {
                "pergjigjja": f"Pyetje shumë e mirë për trupin, {emri}! Ja si funksionon shkenca e nutricionit sportiv: \n• **Para stërvitjes (45 min):** Karbohidrate të shpejta (1 banane ose tost me mjaltë) për energji pa rënduar stomakun.\n• **Kreatina & Magnezi:** Kreatina është super e sigurt dhe rrit fuqinë shpërthyese, por kërkon **+1 litër ujë më shumë në ditë**! Magnezi para gjumit shëron muskujt dhe ndalon ngërçet.\n• **Pas stërvitjes (brenda 30 min):** Proteina (vezë, pulë, kos grek ose whey) për riparim muskulor.\nJa një seancë e pastër për metabolizmin:",
                "plani_i_sugjeruar": {
                    "titulli": "Stërvitje Metabolike & Djegie Kalorish",
                    "distanca_totale_metra": 1100,
                    "1_nxehja": "200m not i qetë",
                    "2_seanca_kryesore": "7 x 100m me ritëm të moderuar (Zona 2 aerobike)",
                    "3_qetesimi": "200m not i lehtë + hidratim dhe vakt me proteina"
                }
            }
        else:
            return {
                "pergjigjja": f"Smart sports nutrition question, {emri}! Here's the science: \n• **Pre-workout (45 mins):** Fast carbs like a banana or oats for clean energy.\n• **Creatine & Magnesium:** Creatine boosts power output safely, just drink **1 extra liter of water daily**. Magnesium before bed prevents cramps and improves sleep.\n• **Post-workout (30 mins):** High-quality protein (eggs, chicken, Greek yogurt, or whey) to rebuild fibers. Here's a balanced metabolic set:",
                "plani_i_sugjeruar": {
                    "titulli": "Metabolic Conditioning & Burn",
                    "distanca_totale_metra": 1100,
                    "1_nxehja": "200m easy warmup",
                    "2_seanca_kryesore": "7 x 100m steady Zone 2 aerobic pace",
                    "3_qetesimi": "200m cooldown + immediate protein & water"
                }
            }

    # 7. NGËRÇET, MESI, QAFA, GJUNJËT, SUPET, FRYMËMARRJA, VESHËT (DETAJET E NOTIT)
    if any(w in msg for w in ["ngerc", "ngërç", "ngerç", "pulp", "kofsh", "kemb", "këmb", "cramp", "calf"]):
        return {
            "pergjigjja": f"{koment_dist}Ngërçi në pishinë ndodh sepse ne djersisim edhe në ujë dhe humbasim magnez e kalium, ose mbajmë kyçet shumë të tendosura. Tërhiqi gishtat e këmbës ngadalë drejt vetes buzë pishinës, pi ujë me elektrolite dhe përdor këtë plan që i lë këmbët të pushojnë:" if is_sq else f"{koment_dist}Pool cramps happen from hidden dehydration/electrolyte loss or overly stiff ankles. Stretch the calf gently on deck, drink electrolytes, and rest the legs with this set:",
            "plani_i_sugjeruar": {"titulli": "Çlirim nga Ngërçet", "distanca_totale_metra": 600, "1_nxehja": "200m not i butë", "2_seanca_kryesore": "4 x 50m me pull-buoy mes këmbëve", "3_qetesimi": "200m shpinë relaksuese"}
        }

    if any(w in msg for w in ["mes", "shpin", "bel", "kurriz", "back pain", "spine"]):
        return {
            "pergjigjja": f"{koment_dist}Dhimbja e mesit vjen zakonisht nga harkimi i shtyllës kurrizore kur legeni bie poshtë. Shtrëngo lehtë muskujt e barkut në ujë dhe bëj këtë seancë që e drejton dhe e shlodh mesin:" if is_sq else f"{koment_dist}Lower back soreness usually comes from over-arching when hips drop. Engage your core lightly in the water and try this spine-friendly session:",
            "plani_i_sugjeruar": {"titulli": "Lirim i Mesit & Core", "distanca_totale_metra": 700, "1_nxehja": "200m not shpinë", "2_seanca_kryesore": "6 x 50m krol me barkun e mbajtur lehtë", "3_qetesimi": "200m shpinë e ngadaltë"}
        }

    if any(w in msg for w in ["qaf", "cervikal", "neck"]):
        return {
            "pergjigjja": f"Dhimbja e qafës ndodh kur shikon përpara drejt murit në vend të vijës poshtë në dysheme. Mbaje kokën neutrale duke parë poshtë. Ja plani për të çliruar qafën:" if is_sq else f"Neck stiffness happens when looking forward instead of straight down at the pool bottom. Keep your head neutral. Try this neck-relief workout:",
            "plani_i_sugjeruar": {"titulli": "Qetësim Cervikal", "distanca_totale_metra": 650, "1_nxehja": "250m shpinë", "2_seanca_kryesore": "4 x 50m krol duke parë dyshemenë", "3_qetesimi": "200m not relaksues"}
        }

    if any(w in msg for w in ["gjun", "knee", "bretkos"]):
        return {
            "pergjigjja": f"Dhimbja e gjunjëve vjen pothuajse gjithmonë nga goditja rrethore e bretkosës. Ndaloje bretkosën për pak ditë dhe noto vetëm drejt (krol/shpinë):" if is_sq else f"Knee soreness almost always comes from breaststroke whip kicks. Pause breaststroke for a few days and swim linear strokes only:",
            "plani_i_sugjeruar": {"titulli": "Mbrojtje e Gjunjëve", "distanca_totale_metra": 800, "1_nxehja": "200m krol i lehtë", "2_seanca_kryesore": "8 x 50m me pull-buoy", "3_qetesimi": "200m shpinë me këmbë të drejta"}
        }

    if any(w in msg for w in ["sup", "shpatull", "krah", "shoulder", "arm"]):
        return {
            "pergjigjja": f"{koment_dist}Kur supet dhembin, krahu po hyn shumë i kryqëzuar në ujë. Mos e sforco shpatullën! Punojmë me këmbët dhe notin shpinë që të shlodhen tendinat:" if is_sq else f"{koment_dist}Shoulder strain happens from cross-over hand entry. Unload the shoulders with kick work and gentle backstroke:",
            "plani_i_sugjeruar": {"titulli": "Rikuperim i Supeve", "distanca_totale_metra": 750, "1_nxehja": "250m shpinë e ngadaltë", "2_seanca_kryesore": "6 x 50m vetëm këmbë me dërrasë", "3_qetesimi": "200m not i qetë"}
        }

    if any(w in msg for w in ["frym", "mushk", "lodh", "breath", "tired", "fatigue"]):
        return {
            "pergjigjja": f"{koment_dist}Kur të ikën fryma shpejt, zakonisht ke mbajtur ajrin nën ujë në vend që ta lëshosh me flluska vazhdimisht. Nxirre frymën ngadalë në ujë që mushkëritë të jenë gati kur kthen kokën:" if is_sq else f"{koment_dist}Breathlessness comes from CO2 buildup when holding breath underwater. Trickle bubbles steadily while submerged so you're ready to inhale when you turn:",
            "plani_i_sugjeruar": {"titulli": "Kontrolli i Frymëmarrjes", "distanca_totale_metra": 800, "1_nxehja": "200m flluska të vazhdueshme", "2_seanca_kryesore": "8 x 50m frymëmarrje çdo 3 tërheqje", "3_qetesimi": "200m relaksim"}
        }

    if any(w in msg for w in ["vesh", "sy", "klor", "ear", "eye", "chlorine"]):
        return {
            "pergjigjja": f"Për veshët me ujë: thaji me peshqir duke anuar kokën ose përdor tapa silikoni. Për sytë nga klori: shpërlaji me ujë të ftohtë pas daljes. Ja një seancë e shpejtë:" if is_sq else f"For trapped ear water, tilt and towel dry (or use silicone earplugs). Rinse chlorine off eyes with fresh cool water. Here is a brisk set:",
            "plani_i_sugjeruar": {"titulli": "Seancë e Shpejtë Ngrohëse", "distanca_totale_metra": 800, "1_nxehja": "200m ritëm i gjallë", "2_seanca_kryesore": "4 x 100m me pushim 15s", "3_qetesimi": "200m dhe dush i ngrohtë"}
        }

    # 8. ENERGJI E LARTË / SPRINT / SHPEJTËSI
    if any(w in msg for w in ["shpejt", "gar", "super", "shkelq", "shkëlq", "energj", "sprint", "fast", "great"]):
        return {
            "pergjigjja": f"Kjo më pëlqen, {emri}! 🔥 Kur trupi është në formë të shkëlqyer, është momenti ideal për shpejtësi maksimale dhe rritje të VO2 Max:" if is_sq else f"Love that energy, {emri}! 🔥 When your body feels primed, let's hit explosive sprints to push your VO2 Max:",
            "plani_i_sugjeruar": {"titulli": "Sprint Shpërthyes", "distanca_totale_metra": 1400, "1_nxehja": "400m progresive", "2_seanca_kryesore": "8 x 50m SPRINT 95% (45s pushim)", "3_qetesimi": "600m not i butë relaksues"}
        }

    # 9. PËRGJIGJE E PËRGJITHSHME NJERËZORE
    return {
        "pergjigjja": (
            f"{koment_dist}Të kuptoj plotësisht, {emri}. Çdo aktivitet — qoftë not, palestër, vrap apo edhe një ditë e ngarkuar në punë — ndikon te energjia dhe muskujt tanë. Më thuaj lirisht çfarë ke bërë sot ose çfarë ndjen në trup (p.sh. dhimbje, lodhje, ushqim, gjumë) që ta përshtatim fiks! Ndërkohë, ja një plan i balancuar:"
            if is_sq else f"{koment_dist}I hear you, {emri}. Everything you do—swimming, gym, running, or even a long workday—impacts your recovery and performance. Tell me anything specific you did or feel in your body, and meanwhile here is a solid balanced session:"
        ),
        "plani_i_sugjeruar": {
            "titulli": "Seancë e Ekuilibruar Ditore",
            "distanca_totale_metra": 1000,
            "1_nxehja": "300m të përziera të lehta",
            "2_seanca_kryesore": "5 x 100m ritëm mesatar",
            "3_qetesimi": "200m shpinë e qetë"
        }
    }

# --- HISTORIKU ---
@app.get("/sessions/history")
def get_session_history(db: Session = Depends(get_db)):
    sesionet = db.query(models.TrainingSessionModel).order_by(models.TrainingSessionModel.data_stervitjes.desc()).all()
    total_metra = sum(s.distanca_reale for s in sesionet)
    numri = len(sesionet)
    shkalla = 0
    if numri > 0:
        plan_tot = sum(s.distanca_e_planifikuar for s in sesionet)
        shkalla = round((total_metra / plan_tot * 100), 1) if plan_tot > 0 else 100

    return {
        "statistika_kryesore": {
            "total_distanca_m": total_metra,
            "seanca_totale": numri,
            "shkalla_realizimit_perqind": shkalla
        },
        "historiku": sesionet
    }