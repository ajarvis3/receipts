# HSA Receipts

Initial scaffold for an HSA receipts application with:

- Docker Compose
- MySQL persistence
- Keycloak authentication
- Spring Boot backend
- React + Vite + TypeScript frontend

## Services

- Backend: http://localhost:8080
- Frontend: http://localhost:3000
- Keycloak: http://localhost:8081

## Demo access

- Realm: `receipts`
- Client: `receipts-web`
- Demo user: `demo`
- Demo password: `demo1234`

## Persistence

- MySQL data is stored in the `mysql_data` Docker volume.
- Keycloak data is stored in the `keycloak_data` Docker volume.

## Next steps

- Wire the frontend to the backend API and Keycloak realm import.
- Add receipt attachment storage.
- Add CSV import/export flows.

# Building / Destroying

`docker compose up -d`  
`docker compose down -v --rmi all`
