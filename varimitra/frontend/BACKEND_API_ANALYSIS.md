# Backend contract review

Reviewed from the supplied `demo.zip` before building the frontend. No backend source was changed.

## Stack and configuration

- Spring Boot `3.5.4`, Java `21`, Maven
- Spring Web, Spring Data JPA, PostgreSQL, Spring Security, JJWT dependencies
- PostgreSQL configuration points to `varimitra` on `localhost:5432`
- `SecurityConfig` disables CSRF, permits every request, and enables HTTP Basic.

## Authentication finding

`LoginRequest` (`mobile`, `password`) and `LoginResponse` (`token`) exist, but **no controller maps an authentication/login endpoint and no JWT filter/token service is implemented**. The frontend therefore uses the existing HTTP Basic configuration to verify mobile/password credentials. It keeps the Base64 Basic value in session storage by default (or local storage for Remember Me) and clears it on 401. It deliberately does not pretend that the backend issues a JWT.

## Controllers and frontend usage

| Backend endpoint | Real response fields used | Frontend feature |
| --- | --- | --- |
| `GET /api/health` | status, application, version, time | HTTP Basic credential verification |
| `GET /api/weather` | Temperature, Humidity, Condition, Rain Chance | dashboard weather chip |
| `GET /api/contact` | Email, Phone, Location | footer support contact |
| `GET /users`, `POST /users` | id, name, mobile, email, password, role | registration and Basic-auth profile lookup |
| `GET /users/{id}`, `PUT /users/{id}` | User fields | profile view and edit |
| `GET /routes`, `GET /routes/{id}` | routeName, startLocation, endLocation, totalDistance, stops | dashboard, live map, route timeline, Mukkam |
| `GET /waterpoints`, `GET /waterpoints/stop/{stopId}` | campName, available, contactNumber, openingTime, closingTime, description, routeStop | water facilities |
| `GET /events`, `GET /events/{id}` | title, description, date, location, organizer | events page and dashboard preview |

The frontend does not use the admin CRUD endpoints because they are administrative and not part of the requested pilgrim navigation.

## Entity data models inspected

- `User`: `id`, `name`, `mobile`, `email`, `password`, `role`
- `Route`: `id`, `routeName`, `startLocation`, `endLocation`, `totalDistance`, `stops`
- `RouteStop`: `id`, `stopNumber`, `stopName`, `distanceFromStart`, `latitude`, `longitude`, `district`, `taluka`, `haltPoint`
- `WaterPoint`: `id`, `campName`, `available`, `contactNumber`, `openingTime`, `closingTime`, `description`, `routeStop`
- `Event`: `id`, `title`, `description`, `date`, `location`, `organizer`
- `Location`: `id`, `name`, `latitude`, `longitude`, `district`, `taluka`

## Honest feature boundaries

`Location` has a repository and entity only; there is no `LocationController` or location service/API. There is also no endpoint for GPS updates, route-stop arrival times, route status/progress, hospital/camp data, Mukkam facilities, or event times. The app renders explicit unavailable/empty states for those details while retaining integration-ready layouts. It derives night halts solely from `RouteStop.haltPoint` and map points solely from published stop coordinates.

## Development connection

Vite proxies `/backend/*` to `http://localhost:8080/*`; for example the frontend's `/backend/routes` request reaches the backend's `/routes`. This avoids a development CORS modification. A deployed cross-origin frontend needs a normal Spring CORS policy or a reverse proxy.
