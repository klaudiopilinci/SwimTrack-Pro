"use client";

import { useState, useEffect, useRef } from "react";

const dict = {
  sq: {
    title: "SwimTrack Pro",
    subtitle: "Ekosistemi Inteligjent i Performancës & Biometrikës",
    online: "Serveri Online",
    heroWelcome: "Mirësevini në Qendrën e Performancës",
    heroDesc: "Kronometër live, grafikë analitikë, plane inteligjente dhe trajner AI 24/7 për çdo sport dhe gjendje të trupit.",
    readinessTitle: "Gadishmëria Fizike",
    totalDist: "Distanca Totale",
    totalSessions: "Seanca të Kryera",
    goalCompletion: "Realizimi i Qëllimit",
    meters: "m",
    chartTitle: "Grafiku i Performancës (Metra / Seancë)",
    chartEmpty: "Regjistroni stërvitje për të parë grafikun e ecurisë.",
    badgesTitle: "Medaljet & Arritjet (Achievements)",
    plannerTitle: "Smart Swim Planner",
    plannerDesc: "Gjenerues inteligjent sipas nivelit dhe pishinës.",
    swimmerName: "Emri i Notarit",
    level: "Niveli",
    beginner: "Fillestar",
    intermediate: "Mesatar",
    advanced: "I Avancuar",
    poolSize: "Pishina",
    pool25: "25m (Shkurt)",
    pool50: "50m (Olimpike)",
    objective: "Objektivi",
    endurance: "Qëndrueshmëri",
    speed: "Shpejtësi",
    technique: "Teknikë",
    daysWeek: "Ditë/javë",
    btnPlan: "Gjenero Planin",
    planFor: "Plani për",
    warmup: "1. Nxehja",
    mainSet: "2. Seanca",
    cooldown: "3. Qetësimi",
    adaptiveTitle: "Adaptive Training & TSS",
    adaptiveDesc: "Analizë e stresit fiziologjik dhe përshtatje automatike.",
    plannedDist: "Plani (m)",
    actualDist: "Reale (m)",
    duration: "Koha (min)",
    difficulty: "Vështirësia",
    diffEasy: "E Lehtë",
    diffMedium: "Mesatare",
    diffHard: "Shumë e Vështirë",
    btnLog: "Regjistro & Analizo",
    pace: "Pace 100m",
    tssLoad: "Ngarkesa TSS",
    status: "Statusi",
    diagTitle: "Diagnoza Adaptive",
    bioTitle: "Laboratori Biometrik & Sports Science",
    bioDesc: "Llogaritja e Eficiencës SWOLF dhe Zonave Kardiake (Z1–Z5)",
    bioBadge: "Haskell & Fox",
    age: "Mosha",
    lapTime: "Koha/Lap (sek)",
    strokeCount: "Tërheqje (Strokes)",
    heartRate: "Pulsi (BPM)",
    btnBio: "Llogarit SWOLF & Zonën Kardiake",
    swolfMetric: "Metrika SWOLF",
    hrZone: "Zona Kardiake",
    maxHrText: "e Maksimumit",
    // LIVE STOPWATCH & CHALLENGES (MODULI 6 & 9)
    liveTitle: "Kronometri Live i Pishinës & Sfida Javore",
    liveDesc: "Mat stërvitjen në kohë reale me xhiro (Laps) dhe ruaje direkt në databazë.",
    liveBadge: "Live Pool Tracker",
    btnStart: "▶ Nis",
    btnPause: "⏸ Ndalo",
    btnLap: "🏁 +50m Xhiro",
    btnReset: "🔄 Fillo Nga E Para",
    btnSaveLive: "💾 Ruaj Stërvitjen në Databazë",
    liveDistLabel: "Distanca e Matur",
    liveLapsLabel: "Xhirot e Përfunduara",
    challengeTitle: "🔥 Sfida Javore: 5,000 Metra",
    challengeRemaining: "edhe aq për trofeun javor",
    pbTitle: "🏆 Rekordet Personale (Personal Bests)",
    pbMaxDist: "Distanca Rekord në 1 Seancë",
    pbTotalSwam: "Totali i Notuar Deri Tani",
    aiWidgetBtn: "Trajneri AI",
    aiChatHeader: "Trajneri Personal AI",
    aiOnlineStatus: "online • flet për çdo sport & trup",
    aiChatPlaceholder: "Shkruaj çfarë bëre ose si ndihesh sot...",
    btnFollowPlan: "✅ Ndjek këtë plan",
    adoptedSuccess: "Plani u vendos te Smart Swim Planner!",
    historyTitle: "Historiku i Seancave",
    historyDesc: "Të dhëna live nga databaza SQLite",
    btnRefresh: "Rifresko",
    btnExport: "Eksporto CSV",
    colId: "ID",
    colSwimmer: "Notari",
    colPlan: "Plani",
    colActual: "Reale",
    colDuration: "Koha",
    colDiff: "Vështirësia",
    colDate: "Data",
    btnLogin: "Kyçu / Hyr",
    btnLogout: "Dil",
    authLoginTab: "Hyrje",
    authRegisterTab: "Regjistrim",
    authEmail: "Email Adresa",
    authPassword: "Fjalëkalimi",
    authName: "Emri i Plotë",
    authRole: "Roli",
    roleSwimmer: "Notar",
    roleCoach: "Trajner Noti",
    btnSubmitLogin: "Hyr në Llogari",
    btnSubmitRegister: "Krijo Llogari të Re",
  },
  en: {
    title: "SwimTrack Pro",
    subtitle: "Smart Swimming Ecosystem & Biometric Analytics",
    online: "Server Online",
    heroWelcome: "Welcome to the Performance Center",
    heroDesc: "Live pool stopwatch, visual analytics, smart workouts, and a 24/7 AI coach for swimming, gym, running & recovery.",
    readinessTitle: "Physical Readiness",
    totalDist: "Total Distance",
    totalSessions: "Sessions Logged",
    goalCompletion: "Goal Completion",
    meters: "m",
    chartTitle: "Performance Chart (Meters / Session)",
    chartEmpty: "Log sessions to visualize your progress chart.",
    badgesTitle: "Achievements & Milestones",
    plannerTitle: "Smart Swim Planner",
    plannerDesc: "Scientific workout generator by level & pool size.",
    swimmerName: "Swimmer Name",
    level: "Level",
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced",
    poolSize: "Pool Size",
    pool25: "25m (Short)",
    pool50: "50m (Olympic)",
    objective: "Objective",
    endurance: "Endurance",
    speed: "Speed",
    technique: "Technique",
    daysWeek: "Days/wk",
    btnPlan: "Generate Plan",
    planFor: "Plan for",
    warmup: "1. Warm-up",
    mainSet: "2. Main Set",
    cooldown: "3. Cool-down",
    adaptiveTitle: "Adaptive Training & TSS",
    adaptiveDesc: "Physiological load analysis & auto-adaptation.",
    plannedDist: "Target (m)",
    actualDist: "Actual (m)",
    duration: "Time (min)",
    difficulty: "Exertion",
    diffEasy: "Easy",
    diffMedium: "Moderate",
    diffHard: "Very Hard",
    btnLog: "Log & Analyze",
    pace: "100m Pace",
    tssLoad: "TSS Load",
    status: "Status",
    diagTitle: "Adaptive Diagnostic",
    bioTitle: "Biometric Lab & Sports Science",
    bioDesc: "SWOLF Efficiency & Physiological Heart Rate Zones (Z1–Z5)",
    bioBadge: "Haskell & Fox",
    age: "Age",
    lapTime: "Lap Time (s)",
    strokeCount: "Strokes/Lap",
    heartRate: "Heart Rate (BPM)",
    btnBio: "Calculate SWOLF & HR Zone",
    swolfMetric: "SWOLF Score",
    hrZone: "Training Zone",
    maxHrText: "of Max HR",
    // LIVE STOPWATCH & CHALLENGES
    liveTitle: "Live Pool Stopwatch & Weekly Challenge",
    liveDesc: "Track your swim live with lap splits and save directly to the database.",
    liveBadge: "Live Pool Tracker",
    btnStart: "▶ Start",
    btnPause: "⏸ Pause",
    btnLap: "🏁 +50m Lap",
    btnReset: "🔄 Reset",
    btnSaveLive: "💾 Save Workout to Database",
    liveDistLabel: "Tracked Distance",
    liveLapsLabel: "Completed Laps",
    challengeTitle: "🔥 Weekly Challenge: 5,000 Meters",
    challengeRemaining: "remaining for the weekly trophy",
    pbTitle: "🏆 Personal Records (Personal Bests)",
    pbMaxDist: "Longest Single Session",
    pbTotalSwam: "All-Time Distance Swam",
    aiWidgetBtn: "AI Coach",
    aiChatHeader: "Personal AI Coach",
    aiOnlineStatus: "online • all sports & recovery",
    aiChatPlaceholder: "Tell me how your body feels today...",
    btnFollowPlan: "✅ Follow this plan",
    adoptedSuccess: "Plan adopted into Smart Swim Planner!",
    historyTitle: "Workout History",
    historyDesc: "Live records from SQLite database",
    btnRefresh: "Refresh",
    btnExport: "Export CSV",
    colId: "ID",
    colSwimmer: "Swimmer",
    colPlan: "Target",
    colActual: "Actual",
    colDuration: "Time",
    colDiff: "Exertion",
    colDate: "Date",
    btnLogin: "Sign In",
    btnLogout: "Logout",
    authLoginTab: "Login",
    authRegisterTab: "Register",
    authEmail: "Email Address",
    authPassword: "Password",
    authName: "Full Name",
    authRole: "Role",
    roleSwimmer: "Swimmer",
    roleCoach: "Swim Coach",
    btnSubmitLogin: "Sign In",
    btnSubmitRegister: "Create Account",
  },
};

export default function SwimTrackDashboard() {
  const [lang, setLang] = useState<"sq" | "en">("sq");
  const t = dict[lang];

  // Auth State
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authName, setAuthName] = useState("");
  const [authRole, setAuthRole] = useState("notar");
  const [authLoading, setAuthLoading] = useState(false);

  // Planner State
  const [swimmerName, setSwimmerName] = useState("Klaudio");
  const [level, setLevel] = useState("avancuar");
  const [poolSize, setPoolSize] = useState(25);
  const [objective, setObjective] = useState("shpejtesi");
  const [daysPerWeek, setDaysPerWeek] = useState(6);
  const [generatedPlan, setGeneratedPlan] = useState<any>(null);
  const [loadingPlan, setLoadingPlan] = useState(false);

  // Session State
  const [sessionSwimmer, setSessionSwimmer] = useState("Klaudio");
  const [plannedDist, setPlannedDist] = useState(2000);
  const [actualDist, setActualDist] = useState(1800);
  const [duration, setDuration] = useState(35);
  const [difficulty, setDifficulty] = useState("mesatare");
  const [adaptiveResult, setAdaptiveResult] = useState<any>(null);
  const [loadingSession, setLoadingSession] = useState(false);

  // Biometrics State
  const [age, setAge] = useState(22);
  const [lapTime, setLapTime] = useState(19.5);
  const [strokeCount, setStrokeCount] = useState(16);
  const [heartRate, setHeartRate] = useState(152);
  const [swolfResult, setSwolfResult] = useState<any>(null);
  const [loadingSwolf, setLoadingSwolf] = useState(false);

  // Live Stopwatch State (Moduli 9)
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [liveLaps, setLiveLaps] = useState<Array<{ lap: number; dist: number; timeStr: string }>>([]);
  const [savingLive, setSavingLive] = useState(false);

  // Floating WhatsApp AI Chat State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<Array<{ sender: "user" | "ai"; text: string; time: string; plan?: any }>>([
    {
      sender: "ai",
      time: "Tani",
      text: "Përshëndetje! 👋 Unë jam Trajneri yt Personal. Mund të më shkruash jo vetëm për notin, por edhe nëse ke bërë palestër, vrap, futboll, nëse je i lodhur nga puna, ose ke ndonjë dhimbje apo pyetje për ushqimin!"
    }
  ]);
  const [loadingChat, setLoadingChat] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // History State
  const [historyData, setHistoryData] = useState<any>(null);

  const loadHistory = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/sessions/history");
      const data = await res.json();
      setHistoryData(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  // Kronometri timer
  useEffect(() => {
    let interval: any;
    if (isRunning) {
      interval = setInterval(() => {
        setElapsedMs((prev) => prev + 100);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    if (isChatOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages, isChatOpen]);

  const formatStopwatch = (ms: number) => {
    const totalSec = Math.floor(ms / 1000);
    const mins = Math.floor(totalSec / 60).toString().padStart(2, "0");
    const secs = (totalSec % 60).toString().padStart(2, "0");
    const tenths = Math.floor((ms % 1000) / 100);
    return `${mins}:${secs}.${tenths}`;
  };

  const handleAddLap = () => {
    const nextLapNum = liveLaps.length + 1;
    setLiveLaps((prev) => [
      { lap: nextLapNum, dist: nextLapNum * 50, timeStr: formatStopwatch(elapsedMs) },
      ...prev,
    ]);
  };

  const handleResetStopwatch = () => {
    setIsRunning(false);
    setElapsedMs(0);
    setLiveLaps([]);
  };

  const handleSaveLiveWorkout = async () => {
    const dist = liveLaps.length * 50;
    if (dist === 0) {
      alert(lang === "sq" ? "Shto të paktën 1 xhiro (+50m) përpara se ta ruash!" : "Add at least 1 lap (+50m) before saving!");
      return;
    }
    setIsRunning(false);
    setSavingLive(true);
    const mins = Math.max(1, Number((elapsedMs / 60000).toFixed(1)));
    try {
      const res = await fetch("http://127.0.0.1:8000/sessions/log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          notari: swimmerName,
          distanca_e_planifikuar: dist,
          distanca_reale: dist,
          koha_minuta: mins,
          veshtiresia: "mesatare",
        }),
      });
      if (res.ok) {
        alert(lang === "sq" ? `Sukses! Seanca Live (${dist}m) u ruajt në databazë!` : `Saved! Live session (${dist}m) persisted to database!`);
        handleResetStopwatch();
        loadHistory();
      }
    } catch (err) {
      alert("Gabim gjatë ruajtjes!");
    } finally {
      setSavingLive(false);
    }
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    const endpoint = authMode === "login" ? "/auth/login" : "/auth/register";
    const payload = authMode === "login"
      ? { email: authEmail, fjalekalimi: authPassword }
      : { emri: authName, email: authEmail, fjalekalimi: authPassword, roli: authRole };

    try {
      const res = await fetch(`http://127.0.0.1:8000${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const errorData = await res.json();
        alert(errorData.detail || "Gabim gjatë autentifikimit!");
        return;
      }
      const userData = await res.json();
      setCurrentUser(userData);
      setShowAuthModal(false);
      setSwimmerName(userData.emri || authName || "Klaudio");
      setSessionSwimmer(userData.emri || authName || "Klaudio");
    } catch (err) {
      alert("Gabim gjatë lidhjes me serverin!");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleGeneratePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingPlan(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/planner/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          emri: swimmerName,
          niveli: level,
          madhesia_pishines: Number(poolSize),
          objektivi: objective,
          ditet_ne_jave: Number(daysPerWeek),
        }),
      });
      const data = await res.json();
      setGeneratedPlan(data);
    } catch (err) {
      alert("Sigurohu që Backend-i është ndezur!");
    } finally {
      setLoadingPlan(false);
    }
  };

  const handleLogSession = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingSession(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/sessions/log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          notari: sessionSwimmer,
          distanca_e_planifikuar: Number(plannedDist),
          distanca_reale: Number(actualDist),
          koha_minuta: Number(duration),
          veshtiresia: difficulty,
        }),
      });
      const data = await res.json();
      setAdaptiveResult(data);
      loadHistory();
    } catch (err) {
      alert("Gabim gjatë lidhjes me Backend-in!");
    } finally {
      setLoadingSession(false);
    }
  };

  const handleCalculateSwolf = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingSwolf(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/analytics/swolf-zones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mosha: Number(age),
          koha_sekonda_lap: Number(lapTime),
          numri_terheqjeve: Number(strokeCount),
          pulsi_bpm: Number(heartRate),
        }),
      });
      const data = await res.json();
      setSwolfResult(data);
    } catch (err) {
      alert("Gabim gjatë llogaritjes biometrike!");
    } finally {
      setLoadingSwolf(false);
    }
  };

  const sendMessageText = async (textToSend: string) => {
    if (!textToSend.trim()) return;
    const nowTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setChatMessages((prev) => [...prev, { sender: "user", text: textToSend, time: nowTime }]);
    setLoadingChat(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/ai-coach/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mesazhi: textToSend,
          notari: swimmerName,
          gjuha: lang,
        }),
      });
      const data = await res.json();
      const replyTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      setChatMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          time: replyTime,
          text: data.pergjigjja,
          plan: data.plani_i_sugjeruar,
        },
      ]);
    } catch (err) {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          time: nowTime,
          text: lang === "sq" ? "Pati një problem gjatë lidhjes me serverin." : "Connection error.",
        },
      ]);
    } finally {
      setLoadingChat(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const txt = chatInput;
    setChatInput("");
    await sendMessageText(txt);
  };

  const handleAdoptPlan = (plan: any) => {
    setGeneratedPlan({
      notari: swimmerName,
      distanca_totale_metra: plan.distanca_totale_metra,
      plani_stervitor: {
        "1_nxehja": plan["1_nxehja"],
        "2_seanca_kryesore": plan["2_seanca_kryesore"],
        "3_qetesimi": plan["3_qetesimi"],
      },
    });
    alert(t.adoptedSuccess);
  };

  const handleExportCSV = () => {
    if (!historyData || !historyData.historiku.length) {
      alert(lang === "sq" ? "Nuk ka të dhëna!" : "No data!");
      return;
    }
    const headers = [t.colId, t.colSwimmer, t.colPlan, t.colActual, t.colDuration, t.colDiff, t.colDate];
    const rows = historyData.historiku.map((item: any) => [
      item.id,
      `"${item.notari}"`,
      item.distanca_e_planifikuar,
      item.distanca_reale,
      item.koha_minuta,
      `"${item.veshtiresia}"`,
      `"${new Date(item.data_stervitjes).toLocaleDateString()}"`,
    ]);
    const csvContent = "\uFEFF" + [headers.join(","), ...rows.map((r: any) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `SwimTrack_Report_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalMeters = historyData?.statistika_kryesore?.total_distanca_m || 0;
  const totalSessions = historyData?.statistika_kryesore?.seanca_totale || 0;
  const completionRate = historyData?.statistika_kryesore?.shkalla_realizimit_perqind || 85;
  const recentSessions = historyData?.historiku?.slice(0, 6).reverse() || [];
  const maxSessionDist = Math.max(...recentSessions.map((s: any) => s.distanca_reale), 1000);
  const personalBestDist = historyData?.historiku?.length
    ? Math.max(...historyData.historiku.map((s: any) => s.distanca_reale))
    : 0;
  const challengePercent = Math.min(100, Math.round((totalMeters / 5000) * 100));

  return (
    <div
      className="min-h-screen text-slate-100 p-4 md:p-8 font-sans relative overflow-x-hidden selection:bg-cyan-400 selection:text-slate-950"
      style={{
        background: "linear-gradient(155deg, #03152a 0%, #052845 45%, #073857 78%, #021222 100%)",
      }}
    >
      <div
        className="fixed inset-0 pointer-events-none opacity-25"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(34, 211, 238, 0.14) 1px, transparent 1px), linear-gradient(to bottom, rgba(34, 211, 238, 0.14) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      ></div>
      <div className="fixed top-[-15%] left-[10%] w-[650px] h-[650px] bg-cyan-400/20 rounded-full blur-[160px] pointer-events-none"></div>
      <div className="fixed bottom-[-15%] right-[5%] w-[600px] h-[600px] bg-teal-400/15 rounded-full blur-[150px] pointer-events-none"></div>

      {/* HEADER KRISTALOR */}
      <header className="max-w-6xl mx-auto mb-6 flex flex-col md:flex-row items-center justify-between bg-[#072038]/80 border border-cyan-400/30 backdrop-blur-2xl rounded-3xl px-6 py-4 shadow-[0_10px_40px_rgba(0,0,0,0.45)] gap-4 relative z-10">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-2xl shadow-lg shadow-cyan-500/30">
            🏊‍♂️
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent">
              {t.title}
            </h1>
            <p className="text-cyan-200/70 text-xs font-medium">{t.subtitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap justify-center">
          {currentUser ? (
            <div className="flex items-center gap-2.5 bg-[#04182b]/90 border border-cyan-400/40 px-3.5 py-1.5 rounded-2xl shadow-md">
              <span className="w-7 h-7 rounded-full bg-cyan-500/20 flex items-center justify-center text-sm">👤</span>
              <div className="text-left">
                <p className="text-xs font-bold text-white leading-tight">{currentUser.emri || swimmerName}</p>
                <p className="text-[10px] text-cyan-300 font-mono capitalize">{currentUser.roli || "notar"}</p>
              </div>
              <button
                onClick={() => setCurrentUser(null)}
                className="ml-2 text-[11px] bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 px-2 py-0.5 rounded-lg font-semibold transition-all"
              >
                {t.btnLogout}
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowAuthModal(true)}
              className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 text-cyan-200 border border-cyan-400/40 px-4 py-2 rounded-2xl text-xs font-bold transition-all shadow-md active:scale-95 flex items-center gap-1.5"
            >
              <span>🔑</span>
              <span>{t.btnLogin}</span>
            </button>
          )}

          <div className="flex items-center bg-[#04182b]/90 border border-cyan-500/25 p-1 rounded-2xl shadow-inner">
            <button
              onClick={() => setLang("sq")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                lang === "sq"
                  ? "bg-gradient-to-r from-cyan-400 to-sky-400 text-slate-950 shadow-md"
                  : "text-cyan-200/70 hover:text-white"
              }`}
            >
              AL Shqip
            </button>
            <button
              onClick={() => setLang("en")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                lang === "en"
                  ? "bg-gradient-to-r from-cyan-400 to-sky-400 text-slate-950 shadow-md"
                  : "text-cyan-200/70 hover:text-white"
              }`}
            >
              GB English
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-2 bg-emerald-500/15 border border-emerald-400/40 px-3.5 py-2 rounded-2xl text-emerald-300 text-xs font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]"></span>
            {t.online}
          </div>
        </div>
      </header>

      {/* AUTH MODAL */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#020c17]/80 backdrop-blur-md">
          <div className="bg-[#061e33] border border-cyan-400/30 rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl relative">
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-lg font-bold"
            >
              ✕
            </button>
            <div className="text-center mb-6">
              <span className="text-4xl">🏊‍♂️</span>
              <h3 className="text-xl font-black text-white mt-2">SwimTrack Pro Auth</h3>
              <p className="text-xs text-cyan-200/70 mt-1">Platforma e Notarëve dhe Trajnerëve</p>
            </div>
            <div className="grid grid-cols-2 gap-2 bg-[#041322] p-1 rounded-xl mb-6 border border-cyan-500/20">
              <button
                onClick={() => setAuthMode("login")}
                className={`py-2 text-xs font-bold rounded-lg transition-all ${
                  authMode === "login" ? "bg-cyan-400 text-slate-950" : "text-slate-300 hover:text-white"
                }`}
              >
                {t.authLoginTab}
              </button>
              <button
                onClick={() => setAuthMode("register")}
                className={`py-2 text-xs font-bold rounded-lg transition-all ${
                  authMode === "register" ? "bg-cyan-400 text-slate-950" : "text-slate-300 hover:text-white"
                }`}
              >
                {t.authRegisterTab}
              </button>
            </div>
            <form onSubmit={handleAuthSubmit} className="space-y-4">
              {authMode === "register" && (
                <>
                  <div>
                    <label className="block text-xs font-medium text-cyan-100 mb-1">{t.authName}</label>
                    <input
                      type="text"
                      value={authName}
                      onChange={(e) => setAuthName(e.target.value)}
                      placeholder="psh. Klaudio Pilinci"
                      className="w-full bg-[#041322] border border-cyan-500/30 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-cyan-100 mb-1">{t.authRole}</label>
                    <select
                      value={authRole}
                      onChange={(e) => setAuthRole(e.target.value)}
                      className="w-full bg-[#041322] border border-cyan-500/30 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    >
                      <option value="notar">{t.roleSwimmer}</option>
                      <option value="trajner">{t.roleCoach}</option>
                    </select>
                  </div>
                </>
              )}
              <div>
                <label className="block text-xs font-medium text-cyan-100 mb-1">{t.authEmail}</label>
                <input
                  type="email"
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  placeholder="notari@swimtrack.com"
                  className="w-full bg-[#041322] border border-cyan-500/30 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-cyan-100 mb-1">{t.authPassword}</label>
                <input
                  type="password"
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#041322] border border-cyan-500/30 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={authLoading}
                className="w-full mt-2 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black py-3 rounded-xl text-xs transition-all shadow-lg active:scale-95"
              >
                {authLoading ? "..." : authMode === "login" ? t.btnSubmitLogin : t.btnSubmitRegister}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MAIN CONTAINER */}
      <div className="max-w-6xl mx-auto space-y-7 relative z-10 pb-24">
        {/* HERO BANNER */}
        <section className="relative overflow-hidden bg-gradient-to-r from-[#072642]/90 via-[#0a365c]/80 to-[#062847]/90 border border-cyan-400/30 rounded-3xl p-6 md:p-8 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            <div className="space-y-3 text-center md:text-left">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest bg-cyan-400/15 text-cyan-300 border border-cyan-400/30 px-3 py-1 rounded-full">
                ✨ Smart Swimming Ecosystem
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-white">
                {t.heroWelcome}, <span className="text-cyan-300">{swimmerName}</span>!
              </h2>
              <p className="text-xs md:text-sm text-cyan-100/80 max-w-xl leading-relaxed">
                {t.heroDesc}
              </p>
            </div>

            <div className="flex items-center gap-4 bg-[#04182b]/70 border border-cyan-400/25 p-4 rounded-2xl shadow-inner shrink-0">
              <div className="relative w-20 h-20 flex items-center justify-center">
                <svg className="w-20 h-20 -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-slate-800"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-cyan-400 drop-shadow-[0_0_6px_rgba(34,211,238,0.8)]"
                    strokeWidth="3.5"
                    strokeDasharray={`${Math.min(100, completionRate)}, 100`}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className="absolute text-sm font-black text-white">{completionRate}%</span>
              </div>
              <div>
                <p className="text-xs font-bold text-cyan-300 uppercase tracking-wider">{t.readinessTitle}</p>
                <p className="text-lg font-black text-white">{totalMeters.toLocaleString()} {t.meters}</p>
                <p className="text-[11px] text-emerald-400 font-semibold">● {totalSessions} {t.totalSessions}</p>
              </div>
            </div>
          </div>

          <svg
            className="absolute bottom-0 left-0 w-full h-12 text-cyan-400/10 pointer-events-none"
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
          >
            <path
              fill="currentColor"
              d="M0,64L80,58.7C160,53,320,43,480,53.3C640,64,800,96,960,96C1120,96,1280,64,1360,48L1440,32L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            ></path>
          </svg>
        </section>

        {/* GRAFIKU VIZUAL & MEDALJET */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <section className="lg:col-span-2 bg-[#072038]/80 border border-cyan-400/25 backdrop-blur-xl rounded-3xl p-6 shadow-xl flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <span className="text-xl">📈</span>
                <h3 className="text-sm font-extrabold text-white">{t.chartTitle}</h3>
              </div>
              <span className="text-[11px] text-cyan-300 font-mono bg-cyan-500/15 px-2.5 py-0.5 rounded-lg border border-cyan-400/20">
                Live SQLite Data
              </span>
            </div>

            {recentSessions.length > 0 ? (
              <div className="flex items-end justify-around gap-3 h-36 pt-4 pb-1 px-2 bg-[#041424]/60 rounded-2xl border border-cyan-500/15">
                {recentSessions.map((item: any, i: number) => {
                  const hPercent = Math.max(18, Math.round((item.distanca_reale / maxSessionDist) * 100));
                  return (
                    <div key={i} className="flex flex-col items-center flex-1 h-full justify-end group">
                      <span className="text-[10px] font-mono text-cyan-300 font-bold mb-1 opacity-80 group-hover:opacity-100">
                        {item.distanca_reale}m
                      </span>
                      <div
                        className="w-full max-w-[36px] bg-gradient-to-t from-blue-600 via-cyan-500 to-emerald-300 rounded-t-xl transition-all duration-500 shadow-[0_0_15px_rgba(34,211,238,0.3)] group-hover:brightness-125"
                        style={{ height: `${hPercent}%` }}
                      ></div>
                      <span className="text-[9px] text-slate-400 mt-1.5 font-mono">#{item.id}</span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="h-36 flex items-center justify-center text-xs text-slate-400 bg-[#041424]/50 rounded-2xl border border-dashed border-cyan-500/20">
                {t.chartEmpty}
              </div>
            )}
          </section>

          <section className="bg-[#072038]/80 border border-amber-400/25 backdrop-blur-xl rounded-3xl p-6 shadow-xl">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="text-xl">🏆</span>
              <h3 className="text-sm font-extrabold text-white">{t.badgesTitle}</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className={`p-3 rounded-2xl border text-center transition-all ${totalSessions >= 1 ? "bg-cyan-500/15 border-cyan-400/40 shadow-[0_0_15px_rgba(34,211,238,0.15)]" : "bg-slate-900/50 border-slate-800 opacity-40"}`}>
                <span className="text-2xl block">💧</span>
                <p className="text-[11px] font-bold text-white mt-1">First Splash</p>
                <p className="text-[9px] text-cyan-300">1+ Seancë</p>
              </div>
              <div className={`p-3 rounded-2xl border text-center transition-all ${totalMeters >= 1000 ? "bg-amber-500/15 border-amber-400/40 shadow-[0_0_15px_rgba(251,191,36,0.15)]" : "bg-slate-900/50 border-slate-800 opacity-40"}`}>
                <span className="text-2xl block">🌊</span>
                <p className="text-[11px] font-bold text-white mt-1">1K Club</p>
                <p className="text-[9px] text-amber-300">1,000m+</p>
              </div>
              <div className={`p-3 rounded-2xl border text-center transition-all ${swolfResult ? "bg-indigo-500/15 border-indigo-400/40 shadow-[0_0_15px_rgba(129,140,248,0.15)]" : "bg-slate-900/50 border-slate-800 opacity-40"}`}>
                <span className="text-2xl block">🧬</span>
                <p className="text-[11px] font-bold text-white mt-1">Bio Master</p>
                <p className="text-[9px] text-indigo-300">SWOLF Test</p>
              </div>
              <div className={`p-3 rounded-2xl border text-center transition-all ${totalMeters >= 5000 ? "bg-emerald-500/15 border-emerald-400/40 shadow-[0_0_15px_rgba(52,211,153,0.15)]" : "bg-slate-900/50 border-slate-800 opacity-40"}`}>
                <span className="text-2xl block">🦈</span>
                <p className="text-[11px] font-bold text-white mt-1">5K Shark</p>
                <p className="text-[9px] text-emerald-300">5,000m+</p>
              </div>
            </div>
          </section>
        </div>

        {/* MODULI 6 & 9: KRONOMETRI LIVE I PISHINËS & SFIDA JAVORE */}
        <section className="bg-gradient-to-br from-[#072038]/85 via-[#072642]/80 to-[#063240]/80 border border-emerald-400/35 backdrop-blur-xl rounded-3xl p-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-400/15 border border-emerald-400/35 flex items-center justify-center text-xl">⏱️</div>
              <div>
                <h2 className="text-lg font-extrabold text-white">{t.liveTitle}</h2>
                <p className="text-xs text-cyan-200/70">{t.liveDesc}</p>
              </div>
            </div>
            <span className="text-xs bg-emerald-500/20 text-emerald-200 border border-emerald-400/35 px-3 py-1 rounded-xl font-mono font-bold w-fit">
              {t.liveBadge}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Kronometri Digjital */}
            <div className="bg-[#031221]/95 border border-emerald-500/30 rounded-2xl p-5 flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <span className="text-[10px] text-emerald-400 uppercase tracking-widest font-bold block">Digital Stopwatch</span>
                  <div className="text-4xl sm:text-5xl font-black font-mono text-white tracking-wider drop-shadow-[0_0_10px_rgba(52,211,153,0.4)]">
                    {formatStopwatch(elapsedMs)}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-cyan-300 uppercase block">{t.liveDistLabel}</span>
                  <span className="text-2xl font-black text-cyan-400 font-mono">{liveLaps.length * 50}m</span>
                  <span className="text-[10px] text-slate-400 block">{liveLaps.length} {t.liveLapsLabel}</span>
                </div>
              </div>

              {/* Butonat e Kronometrit */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  onClick={() => setIsRunning(!isRunning)}
                  className={`py-2.5 rounded-xl text-xs font-black transition-all active:scale-95 ${
                    isRunning
                      ? "bg-amber-500 hover:bg-amber-400 text-slate-950"
                      : "bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20"
                  }`}
                >
                  {isRunning ? t.btnPause : t.btnStart}
                </button>
                <button
                  onClick={handleAddLap}
                  className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black py-2.5 rounded-xl text-xs transition-all active:scale-95 shadow-md shadow-cyan-500/20"
                >
                  {t.btnLap}
                </button>
                <button
                  onClick={handleResetStopwatch}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold py-2.5 rounded-xl text-xs transition-all active:scale-95 border border-slate-700"
                >
                  {t.btnReset}
                </button>
                <button
                  onClick={handleSaveLiveWorkout}
                  disabled={savingLive}
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-400 hover:to-indigo-400 text-white font-bold py-2.5 rounded-xl text-xs transition-all active:scale-95"
                >
                  {savingLive ? "..." : t.btnSaveLive}
                </button>
              </div>

              {/* Lista e xhirove (Splits) */}
              {liveLaps.length > 0 && (
                <div className="max-h-24 overflow-y-auto space-y-1 pr-1 border-t border-slate-800 pt-2">
                  {liveLaps.map((l) => (
                    <div key={l.lap} className="flex justify-between text-xs font-mono bg-[#072038]/70 px-3 py-1 rounded-lg">
                      <span className="text-emerald-300 font-bold">Xhiro #{l.lap} ({l.dist}m)</span>
                      <span className="text-white">{l.timeStr}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Sfida e Javës & Rekordet Personale */}
            <div className="space-y-4 flex flex-col justify-between">
              <div className="bg-[#031221]/95 border border-amber-400/30 rounded-2xl p-5 space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-extrabold text-amber-300">{t.challengeTitle}</h3>
                  <span className="text-xs font-mono font-bold text-white bg-amber-500/20 px-2.5 py-0.5 rounded-lg border border-amber-400/30">
                    {challengePercent}%
                  </span>
                </div>
                <div className="w-full h-3.5 bg-slate-800 rounded-full overflow-hidden p-0.5">
                  <div
                    className="h-full bg-gradient-to-r from-amber-400 via-orange-400 to-emerald-400 rounded-full transition-all duration-700 shadow-[0_0_12px_rgba(251,191,36,0.5)]"
                    style={{ width: `${challengePercent}%` }}
                  ></div>
                </div>
                <p className="text-[11px] text-slate-300">
                  {totalMeters >= 5000
                    ? "🎉 Urime! E fitove trofeun javor prej 5,000 metrash!"
                    : `${(5000 - totalMeters).toLocaleString()}m ${t.challengeRemaining}.`}
                </p>
              </div>

              <div className="bg-[#031221]/95 border border-cyan-400/30 rounded-2xl p-5">
                <h3 className="text-sm font-extrabold text-cyan-300 mb-3">{t.pbTitle}</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#072038] p-3 rounded-xl border border-cyan-500/20">
                    <span className="text-[10px] text-cyan-200/70 block">{t.pbMaxDist}</span>
                    <span className="text-xl font-black text-white font-mono">{personalBestDist.toLocaleString()}m</span>
                  </div>
                  <div className="bg-[#072038] p-3 rounded-xl border border-cyan-500/20">
                    <span className="text-[10px] text-cyan-200/70 block">{t.pbTotalSwam}</span>
                    <span className="text-xl font-black text-emerald-400 font-mono">{totalMeters.toLocaleString()}m</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DY KARTAT: PLANNER & ADAPTIVE */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
          {/* SMART SWIM PLANNER */}
          <section className="bg-[#072038]/80 border border-cyan-400/25 backdrop-blur-xl rounded-3xl p-6 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-xl bg-cyan-400/15 border border-cyan-400/30 flex items-center justify-center text-lg">⚡</div>
                <div>
                  <h2 className="text-lg font-extrabold text-white">{t.plannerTitle}</h2>
                  <p className="text-xs text-cyan-200/70">{t.plannerDesc}</p>
                </div>
              </div>

              <form onSubmit={handleGeneratePlan} className="space-y-4 mt-5">
                <div>
                  <label className="block text-xs font-semibold text-cyan-100 mb-1">{t.swimmerName}</label>
                  <input
                    type="text"
                    value={swimmerName}
                    onChange={(e) => setSwimmerName(e.target.value)}
                    className="w-full bg-[#041424]/90 border border-cyan-500/25 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-cyan-100 mb-1">{t.level}</label>
                    <select
                      value={level}
                      onChange={(e) => setLevel(e.target.value)}
                      className="w-full bg-[#041424]/90 border border-cyan-500/25 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    >
                      <option value="fillestar">{t.beginner}</option>
                      <option value="mesatar">{t.intermediate}</option>
                      <option value="avancuar">{t.advanced}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-cyan-100 mb-1">{t.poolSize}</label>
                    <select
                      value={poolSize}
                      onChange={(e) => setPoolSize(Number(e.target.value))}
                      className="w-full bg-[#041424]/90 border border-cyan-500/25 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    >
                      <option value={25}>{t.pool25}</option>
                      <option value={50}>{t.pool50}</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-cyan-100 mb-1">{t.objective}</label>
                    <select
                      value={objective}
                      onChange={(e) => setObjective(e.target.value)}
                      className="w-full bg-[#041424]/90 border border-cyan-500/25 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    >
                      <option value="qendrueshmeri">{t.endurance}</option>
                      <option value="shpejtesi">{t.speed}</option>
                      <option value="teknike">{t.technique}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-cyan-100 mb-1">{t.daysWeek}</label>
                    <input
                      type="number"
                      min={1}
                      max={7}
                      value={daysPerWeek}
                      onChange={(e) => setDaysPerWeek(Number(e.target.value))}
                      className="w-full bg-[#041424]/90 border border-cyan-500/25 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loadingPlan}
                  className="w-full mt-2 bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black py-3 rounded-xl text-sm transition-all shadow-lg shadow-cyan-500/20 active:scale-[0.98]"
                >
                  {loadingPlan ? "..." : t.btnPlan}
                </button>
              </form>
            </div>

            {generatedPlan && (
              <div className="mt-6 bg-[#031221]/95 border border-cyan-400/40 rounded-2xl p-4 space-y-2 shadow-inner">
                <div className="flex justify-between items-center border-b border-cyan-500/20 pb-2">
                  <span className="text-xs font-bold text-cyan-300">{t.planFor}: {generatedPlan.notari}</span>
                  <span className="text-xs bg-cyan-400/20 text-cyan-300 px-2.5 py-0.5 rounded-lg font-mono font-bold">
                    {generatedPlan.distanca_totale_metra}{t.meters}
                  </span>
                </div>
                <p className="text-xs text-slate-200"><strong className="text-cyan-300">{t.warmup}:</strong> {generatedPlan.plani_stervitor["1_nxehja"]}</p>
                <p className="text-xs text-slate-200"><strong className="text-cyan-300">{t.mainSet}:</strong> {generatedPlan.plani_stervitor["2_seanca_kryesore"]}</p>
                <p className="text-xs text-slate-200"><strong className="text-cyan-300">{t.cooldown}:</strong> {generatedPlan.plani_stervitor["3_qetesimi"]}</p>
              </div>
            )}
          </section>

          {/* ADAPTIVE TRAINING */}
          <section className="bg-[#072038]/80 border border-sky-400/25 backdrop-blur-xl rounded-3xl p-6 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-xl bg-sky-400/15 border border-sky-400/30 flex items-center justify-center text-lg">🔄</div>
                <div>
                  <h2 className="text-lg font-extrabold text-white">{t.adaptiveTitle}</h2>
                  <p className="text-xs text-cyan-200/70">{t.adaptiveDesc}</p>
                </div>
              </div>

              <form onSubmit={handleLogSession} className="space-y-4 mt-5">
                <div>
                  <label className="block text-xs font-semibold text-cyan-100 mb-1">{t.swimmerName}</label>
                  <input
                    type="text"
                    value={sessionSwimmer}
                    onChange={(e) => setSessionSwimmer(e.target.value)}
                    className="w-full bg-[#041424]/90 border border-sky-500/25 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-400"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-cyan-100 mb-1">{t.plannedDist}</label>
                    <input
                      type="number"
                      value={plannedDist}
                      onChange={(e) => setPlannedDist(Number(e.target.value))}
                      className="w-full bg-[#041424]/90 border border-sky-500/25 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-cyan-100 mb-1">{t.actualDist}</label>
                    <input
                      type="number"
                      value={actualDist}
                      onChange={(e) => setActualDist(Number(e.target.value))}
                      className="w-full bg-[#041424]/90 border border-sky-500/25 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-cyan-100 mb-1">{t.duration}</label>
                    <input
                      type="number"
                      step="0.5"
                      value={duration}
                      onChange={(e) => setDuration(Number(e.target.value))}
                      className="w-full bg-[#041424]/90 border border-sky-500/25 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-cyan-100 mb-1">{t.difficulty}</label>
                    <select
                      value={difficulty}
                      onChange={(e) => setDifficulty(e.target.value)}
                      className="w-full bg-[#041424]/90 border border-sky-500/25 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-400"
                    >
                      <option value="e_lehte">{t.diffEasy}</option>
                      <option value="mesatare">{t.diffMedium}</option>
                      <option value="shume_e_veshtire">{t.diffHard}</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loadingSession}
                  className="w-full mt-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-400 hover:to-indigo-400 text-white font-black py-3 rounded-xl text-sm transition-all shadow-lg shadow-blue-500/25 active:scale-[0.98]"
                >
                  {loadingSession ? "..." : t.btnLog}
                </button>
              </form>
            </div>

            {adaptiveResult && (
              <div className="mt-6 bg-[#031221]/95 border border-sky-400/40 rounded-2xl p-4 space-y-3 shadow-inner">
                <div className="grid grid-cols-3 gap-2 border-b border-sky-500/20 pb-2.5 text-center">
                  <div>
                    <span className="text-[10px] text-cyan-200/70 uppercase tracking-wider block">{t.pace}</span>
                    <span className="text-xs font-mono font-bold text-cyan-300">{adaptiveResult.ritmi_100m}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-cyan-200/70 uppercase tracking-wider block">{t.tssLoad}</span>
                    <span className="text-xs font-mono font-bold text-indigo-300">{adaptiveResult.ngarkesa_stervitore_tss} pts</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-cyan-200/70 uppercase tracking-wider block">{t.status}</span>
                    <span className="text-xs font-bold text-amber-300">{adaptiveResult.statusi_lodhjes}</span>
                  </div>
                </div>
                <div>
                  <span className="text-xs font-bold text-sky-300 block mb-1">💡 {t.diagTitle}:</span>
                  <p className="text-xs text-slate-200 leading-relaxed">{adaptiveResult.analiza_adaptive}</p>
                </div>
              </div>
            )}
          </section>
        </div>

        {/* LABORATORI BIOMETRIK SWOLF */}
        <section className="bg-gradient-to-br from-[#072038]/85 via-[#072340]/80 to-[#0e1f45]/80 border border-indigo-400/30 backdrop-blur-xl rounded-3xl p-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-xl">🧬</div>
              <div>
                <h2 className="text-lg font-extrabold text-white">{t.bioTitle}</h2>
                <p className="text-xs text-cyan-200/70">{t.bioDesc}</p>
              </div>
            </div>
            <span className="text-xs bg-indigo-500/20 text-indigo-200 border border-indigo-400/30 px-3 py-1 rounded-xl font-mono font-semibold w-fit">
              {t.bioBadge}
            </span>
          </div>

          <form onSubmit={handleCalculateSwolf} className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-5">
            <div>
              <label className="block text-xs font-semibold text-cyan-100 mb-1">{t.age}</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full bg-[#041424]/90 border border-indigo-400/25 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-cyan-100 mb-1">{t.lapTime}</label>
              <input
                type="number"
                step="0.1"
                value={lapTime}
                onChange={(e) => setLapTime(Number(e.target.value))}
                className="w-full bg-[#041424]/90 border border-indigo-400/25 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-cyan-100 mb-1">{t.strokeCount}</label>
              <input
                type="number"
                value={strokeCount}
                onChange={(e) => setStrokeCount(Number(e.target.value))}
                className="w-full bg-[#041424]/90 border border-indigo-400/25 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-cyan-100 mb-1">{t.heartRate}</label>
              <input
                type="number"
                value={heartRate}
                onChange={(e) => setHeartRate(Number(e.target.value))}
                className="w-full bg-[#041424]/90 border border-indigo-400/25 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div className="sm:col-span-4">
              <button
                type="submit"
                disabled={loadingSwolf}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 text-white font-black py-3 rounded-xl text-sm transition-all shadow-lg shadow-indigo-500/20 active:scale-[0.98]"
              >
                {loadingSwolf ? "..." : t.btnBio}
              </button>
            </div>
          </form>

          {swolfResult && (
            <div className="bg-[#031221]/95 border border-indigo-400/40 rounded-2xl p-5 grid grid-cols-1 md:grid-cols-2 gap-5 shadow-inner">
              <div className="space-y-1">
                <span className="text-xs text-cyan-200/70 font-semibold">{t.swolfMetric}:</span>
                <div className="flex items-baseline gap-2.5">
                  <span className="text-4xl font-black text-cyan-300 font-mono">{swolfResult.swolf_score}</span>
                  <span className="text-xs font-bold text-emerald-400">({swolfResult.klasifikimi_swolf})</span>
                </div>
                <p className="text-[11px] text-slate-400">SWOLF = {lapTime}s + {strokeCount} strokes</p>
              </div>

              <div className="space-y-2">
                <span className="text-xs text-cyan-200/70 font-semibold">{t.hrZone}:</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-extrabold text-amber-300">{swolfResult.zona_kardiake}</span>
                  <span className="text-xs font-mono text-slate-300">({swolfResult.hr_percent}% {t.maxHrText})</span>
                </div>
                <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-400 via-amber-400 to-rose-500 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, swolfResult.hr_percent)}%` }}
                  ></div>
                </div>
                <p className="text-[11px] text-slate-300">🎯 {swolfResult.fokusi_fiziologjik}</p>
              </div>
            </div>
          )}
        </section>

        {/* HISTORIKU NGA DATABAZA */}
        {historyData && historyData.historiku.length > 0 && (
          <section className="bg-[#072038]/80 border border-cyan-400/25 backdrop-blur-xl rounded-3xl p-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-teal-400/15 border border-teal-400/30 flex items-center justify-center text-lg">📊</div>
                <div>
                  <h3 className="text-base font-extrabold text-white">{t.historyTitle}</h3>
                  <p className="text-xs text-cyan-200/70">{t.historyDesc}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleExportCSV}
                  className="text-xs bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-extrabold px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 shadow-md active:scale-95"
                >
                  📥 {t.btnExport}
                </button>
                <button
                  onClick={loadHistory}
                  className="text-xs bg-[#041424] hover:bg-slate-800 text-cyan-200 px-3.5 py-2 rounded-xl border border-cyan-500/25 transition-all active:scale-95"
                >
                  🔄 {t.btnRefresh}
                </button>
              </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-cyan-500/15">
              <table className="w-full text-left text-xs text-slate-200">
                <thead className="bg-[#041424]/90 text-cyan-300 border-b border-cyan-500/20">
                  <tr>
                    <th className="py-3 px-4">{t.colId}</th>
                    <th className="py-3 px-4">{t.colSwimmer}</th>
                    <th className="py-3 px-4">{t.colPlan}</th>
                    <th className="py-3 px-4">{t.colActual}</th>
                    <th className="py-3 px-4">{t.colDuration}</th>
                    <th className="py-3 px-4">{t.colDiff}</th>
                    <th className="py-3 px-4">{t.colDate}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-cyan-500/10 bg-[#051a2e]/40">
                  {historyData.historiku.map((item: any) => (
                    <tr key={item.id} className="hover:bg-cyan-500/10 transition-colors">
                      <td className="py-3 px-4 font-mono text-cyan-400 font-bold">#{item.id}</td>
                      <td className="py-3 px-4 font-bold text-white">{item.notari}</td>
                      <td className="py-3 px-4">{item.distanca_e_planifikuar}m</td>
                      <td className="py-3 px-4 text-cyan-300 font-bold">{item.distanca_reale}m</td>
                      <td className="py-3 px-4">{item.koha_minuta} min</td>
                      <td className="py-3 px-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          item.veshtiresia === "e_lehte" ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" :
                          item.veshtiresia === "mesatare" ? "bg-amber-500/20 text-amber-300 border border-amber-500/30" :
                          "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                        }`}>
                          {item.veshtiresia}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-400">
                        {new Date(item.data_stervitjes).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>

      {/* FLOATING WHATSAPP-STYLE AI COACH */}
      {isChatOpen && (
        <div className="fixed bottom-24 right-5 z-50 w-[92vw] sm:w-[400px] h-[560px] flex flex-col rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.85)] border border-emerald-500/30 bg-[#0b141a]/95 backdrop-blur-2xl">
          <div className="bg-[#202c33] px-4 py-3 flex items-center justify-between border-b border-slate-700/60">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-xl shadow-md">
                  🤖
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#202c33]"></span>
              </div>
              <div>
                <h3 className="text-sm font-bold text-white leading-tight">{t.aiChatHeader}</h3>
                <p className="text-[11px] text-emerald-400 font-medium">{t.aiOnlineStatus}</p>
              </div>
            </div>
            <button
              onClick={() => setIsChatOpen(false)}
              className="w-8 h-8 rounded-full hover:bg-slate-700/60 flex items-center justify-center text-slate-300 hover:text-white font-bold transition-colors"
            >
              ✕
            </button>
          </div>

          <div
            className="flex-1 overflow-y-auto p-4 space-y-3"
            style={{
              backgroundColor: "#0b141a",
              backgroundImage: "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 0)",
              backgroundSize: "18px 18px",
            }}
          >
            {chatMessages.map((msg, index) => (
              <div
                key={index}
                className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed shadow-md relative ${
                    msg.sender === "user"
                      ? "bg-[#005c4b] text-slate-100 rounded-tr-none"
                      : "bg-[#202c33] text-slate-100 rounded-tl-none border border-slate-700/50"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>

                  {msg.plan && (
                    <div className="mt-3 bg-[#111b21] border border-emerald-500/40 rounded-xl p-3 space-y-1.5">
                      <div className="flex justify-between items-center border-b border-slate-700/70 pb-1.5">
                        <span className="text-[11px] font-bold text-emerald-400">🏊 {msg.plan.titulli}</span>
                        <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-mono font-bold">
                          {msg.plan.distanca_totale_metra}m
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-300"><strong>Nxehja:</strong> {msg.plan["1_nxehja"]}</p>
                      <p className="text-[11px] text-slate-300"><strong>Seanca:</strong> {msg.plan["2_seanca_kryesore"]}</p>
                      <p className="text-[11px] text-slate-300"><strong>Qetësimi:</strong> {msg.plan["3_qetesimi"]}</p>

                      <button
                        onClick={() => handleAdoptPlan(msg.plan)}
                        className="w-full mt-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold py-1.5 rounded-lg text-[11px] transition-all active:scale-95"
                      >
                        {t.btnFollowPlan}
                      </button>
                    </div>
                  )}

                  <div className="flex items-center justify-end gap-1 mt-1 text-[9px] text-slate-400">
                    <span>{msg.time}</span>
                    {msg.sender === "user" && <span className="text-sky-400 font-bold">✓✓</span>}
                  </div>
                </div>
              </div>
            ))}

            {loadingChat && (
              <div className="bg-[#202c33] text-emerald-400 text-[11px] px-3 py-2 rounded-2xl rounded-tl-none w-fit border border-slate-700/50 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="bg-[#182229] px-3 py-2 flex gap-1.5 overflow-x-auto border-t border-slate-800">
            <button
              onClick={() => sendMessageText(lang === "sq" ? "Bëra palestër me pesha sot dhe jam i vrarë" : "Did heavy gym weights today and I'm sore")}
              className="shrink-0 text-[10px] bg-[#2a3942] hover:bg-emerald-500/20 text-slate-200 px-2.5 py-1 rounded-full border border-slate-700 transition-colors"
            >
              🏋️ Palestër sot
            </button>
            <button
              onClick={() => sendMessageText(lang === "sq" ? "Vrapova dhe luajta futboll, më dhembin këmbët" : "Ran and played football, legs hurt")}
              className="shrink-0 text-[10px] bg-[#2a3942] hover:bg-emerald-500/20 text-slate-200 px-2.5 py-1 rounded-full border border-slate-700 transition-colors"
            >
              ⚽ Futboll / Vrap
            </button>
            <button
              onClick={() => sendMessageText(lang === "sq" ? "Më dhemb mesi dhe qafa nga puna" : "Lower back and neck pain from work")}
              className="shrink-0 text-[10px] bg-[#2a3942] hover:bg-emerald-500/20 text-slate-200 px-2.5 py-1 rounded-full border border-slate-700 transition-colors"
            >
              🤕 Mes & Qafë
            </button>
            <button
              onClick={() => sendMessageText(lang === "sq" ? "Si ta përdor kreatinën dhe çfarë të ha?" : "How should I take creatine and eat?")}
              className="shrink-0 text-[10px] bg-[#2a3942] hover:bg-emerald-500/20 text-slate-200 px-2.5 py-1 rounded-full border border-slate-700 transition-colors"
            >
              🥗 Ushqim & Kreatinë
            </button>
          </div>

          <form onSubmit={handleSendMessage} className="bg-[#202c33] p-2.5 flex items-center gap-2 border-t border-slate-700/60">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder={t.aiChatPlaceholder}
              className="flex-1 bg-[#2a3942] rounded-full px-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
            />
            <button
              type="submit"
              disabled={loadingChat}
              className="w-10 h-10 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black flex items-center justify-center shadow-lg transition-all active:scale-90 text-sm"
            >
              ➤
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-6 right-5 z-50 flex items-center gap-2.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-black px-5 py-3.5 rounded-full shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all hover:scale-105 active:scale-95 border border-white/20"
      >
        <span className="text-xl">{isChatOpen ? "✕" : "💬"}</span>
        <span className="text-xs tracking-wide">{isChatOpen ? (lang === "sq" ? "Mbyll" : "Close") : t.aiWidgetBtn}</span>
        {!isChatOpen && (
          <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping"></span>
        )}
      </button>
    </div>
  );
}