from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

# Krijojmë skedarin e databazës lokale swimtrack.db
# (Me SQLAlchemy, mjafton të ndryshojmë këtë adresë më vonë për ta lidhur me PostgreSQL!)
SQLALCHEMY_DATABASE_URL = "sqlite:///./swimtrack.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Kjo është baza nga e cila do të ndërtojmë të gjitha tabelat
Base = declarative_base()

# Funksion ndihmës për të hapur dhe mbyllur lidhjen me databazën në çdo kërkesë
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()