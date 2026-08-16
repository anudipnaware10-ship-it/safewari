# VariMitra Full-Stack Project

Open this folder in VS Code. It contains the original Spring Boot backend and the connected React frontend.

```text
vari-mitra-fullstack/
├── backend/   # Spring Boot Maven project (unchanged Java source)
└── frontend/  # React + Vite application
```

## Run locally

Open two VS Code terminals.

### Terminal 1: backend

```powershell
cd backend
mvn spring-boot:run
```

### Terminal 2: frontend

```powershell
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`. The Vite proxy forwards every `/backend/*` request to the Spring Boot server at `http://localhost:8080/*`; for example, the frontend route request `/backend/routes` reaches backend endpoint `/routes`.

Before starting Spring Boot, ensure PostgreSQL is running and that the database configuration in `backend/src/main/resources/application.yaml` is valid for your machine.
# Varimitra
# safevari
