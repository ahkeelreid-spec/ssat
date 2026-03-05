SSAT Project
Windows-native setup with Docker Compose (frontend + backend + optional db)

Usage


Start services
cd C:\Users\cjcsadmin\workspace\SSAT\project-root
docker-compose up -d



Access
Frontend: http://localhost:5173
Backend API docs: http://localhost:8000/docs
DB: localhost:5432 (user: ssat, pass: ssat, db: ssatdb)



Stop services
docker-compose down
Replace the placeholder Git URL with your real repo URL (already baked in here as https://github.com/ahkeelreid-spec/ssat).

Docker Desktop must be allowed to access the project path.
