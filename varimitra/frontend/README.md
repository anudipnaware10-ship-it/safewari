# VariMitra Frontend

React + Vite frontend for the uploaded Spring Boot VariMitra backend.

## Start

```powershell
npm install
npm run dev
```

`pnpm install && pnpm dev` is also supported for pnpm users.

The development server proxies `/backend/*` to `http://localhost:8080/*`, avoiding a CORS change in the supplied backend.

## Backend API contract used

- `GET /api/health`, `GET /api/weather`, `GET /api/contact`
- `GET|POST /users`, `GET|PUT /users/{id}`
- `GET /routes`, `GET /routes/{id}`
- `GET /waterpoints`, `GET /waterpoints/stop/{stopId}`
- `GET /events`, `GET /events/{id}`

Spring Security in the supplied backend allows all routes and enables HTTP Basic. The sign-in screen verifies the supplied mobile/password using that configured Basic authentication flow. The backend does not expose a JWT or a dedicated `/auth/login` endpoint, so the frontend intentionally stores the Basic credential in browser storage only for the chosen session duration and clears it on 401.

## Important backend limitations represented honestly in the UI

There is no exposed controller for `Location`, no live location feed, no medical-facility API, and no timestamps/facility metadata for route stops. The frontend derives the route timeline, halt cards, map markers, and water-point associations only from the real data returned by `/routes` and `/waterpoints`; when details are absent it renders an explicit empty or unavailable state rather than inventing data.

## Production note

For deployment, serve this SPA behind the same origin as Spring Boot or configure a reverse proxy for the API. If serving from a separate origin, add the appropriate backend CORS policy before deployment.
