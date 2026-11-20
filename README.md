# 🏊‍♂️ SwimTrack Pro – Smart Swimming Ecosystem

> Platformë e avancuar Full-Stack për menaxhimin, gjurmimin live dhe analizën biomekanike të performancës në not dhe fitnes.

[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?style=flat&logo=fastapi)](https://fastapi.tiangolo.com/)
[![Next.js](https://img.shields.io/badge/Frontend-Next.js%2016-black?style=flat&logo=next.js)](https://nextjs.org/)
[![SQLite](https://img.shields.io/badge/Database-SQLite%20%2F%20SQLAlchemy-blue?style=flat&logo=sqlite)](https://www.sqlite.org/)
[![TailwindCSS](https://img.shields.io/badge/Styling-Tailwind%20CSS-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Docker](https://img.shields.io/badge/DevOps-Docker%20Ready-2496ED?style=flat&logo=docker)](https://www.docker.com/)

---

## 🌟 Modulet & Veçoritë Kryesore

1. **User Management & Security:** Regjistrim dhe hyrje me role (*Notar / Trajner*) duke përdorur kriptim `bcrypt`.
2. **Live Pool Stopwatch & Weekly Challenges:** Kronometër digjital në kohë reale me xhiro (*Lap Splits*), sfidë javore 5,000m dhe rekorde personale (*Personal Bests*).
3. **Smart Swim Planner:** Gjenerues i automatizuar i planeve stërvitore sipas nivelit, objektivit dhe madhësisë së pishinës.
4. **Adaptive Training System & TSS:** Llogaritja e ritmit (*Pace/100m*) dhe stresit fiziologjik (*Training Stress Score*), me përshtatje automatike të ngarkesës.
5. **Biometric Lab (SWOLF & Heart Rate Zones):** Analizë hidrodinamike SWOLF dhe klasifikim i zonave kardiake `Z1–Z5` sipas formulës Haskell & Fox.
6. **Interactive Multi-Sport AI Coach:** Asistent bisedash i stilit WhatsApp me këshilla njerëzore për notin, palestrën, vrapin, dëmtimet dhe nutricionin, plus adoptim të planit me 1 klikim.
7. **Analytics, Badges & CSV Export:** Grafikë vizualë, trofe arritjesh dhe eksportim në Excel/CSV.
8. **Bilingual Support (i18n):** Ndërfaqe në gjuhën Shqipe 🇦🇱 dhe Angleze 🇬🇧 në kohë reale.

---

## 🏗️ Arkitektura e Projektit

```text
SwimTrack-Pro/
├── backend/
│   ├── main.py              # REST API Endpoints & Business Logic
│   ├── models.py            # SQLAlchemy Relational Models
│   ├── database.py          # DB Engine & Session Setup
│   ├── requirements.txt     # Python Dependencies
│   └── Dockerfile           # Backend Container Spec
├── frontend/web/
│   ├── app/page.tsx         # Full-Stack Reactive Dashboard
│   ├── app/layout.tsx       # Root Layout
│   └── Dockerfile           # Frontend Container Spec
├── docker-compose.yml       # Multi-Container Orchestration
└── README.md                # Documentation