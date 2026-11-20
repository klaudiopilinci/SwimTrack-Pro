from datetime import datetime
from sqlalchemy import Column, Integer, String, Float, DateTime
from database import Base

# Tabela 1: Përdoruesit dhe Rolet (Notar, Trajner, Admin)
class UserModel(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    emri = Column(String)
    email = Column(String, unique=True, index=True)
    fjalekalimi_hash = Column(String)
    roli = Column(String, default="notar")  # "notar", "trajner", "admin"
    data_regjistrimit = Column(DateTime, default=datetime.now)

# Tabela 2: Ruajtja e Planeve të Gjeneruara
class TrainingPlanModel(Base):
    __tablename__ = "training_plans"

    id = Column(Integer, primary_key=True, index=True)
    notari = Column(String, index=True)
    niveli = Column(String)
    madhesia_pishines = Column(Integer)
    objektivi = Column(String)
    distanca_totale = Column(Integer)
    nxehja = Column(String)
    seanca_kryesore = Column(String)
    qetesimi = Column(String)
    data_krijimit = Column(DateTime, default=datetime.now)

# Tabela 3: Regjistrimi i Seancave Reale (Moduli Adaptiv)
class TrainingSessionModel(Base):
    __tablename__ = "training_sessions"

    id = Column(Integer, primary_key=True, index=True)
    notari = Column(String, index=True)
    distanca_e_planifikuar = Column(Integer)
    distanca_reale = Column(Integer)
    koha_minuta = Column(Float)
    veshtiresia = Column(String)
    data_stervitjes = Column(DateTime, default=datetime.now)