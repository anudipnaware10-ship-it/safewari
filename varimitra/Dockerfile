# --- Stage 1: Build the React frontend ---
FROM node:20-alpine AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# --- Stage 2: Build the Spring Boot backend (with frontend baked in) ---
FROM maven:3.9-eclipse-temurin-21 AS backend-build
WORKDIR /app/backend
COPY backend/pom.xml ./
COPY backend/.mvn .mvn
COPY backend/mvnw ./
RUN mvn dependency:go-offline
COPY backend/src ./src
# Copy the built frontend into Spring Boot's static resources folder
COPY --from=frontend-build /app/frontend/dist ./src/main/resources/static
RUN mvn clean package -DskipTests

# --- Stage 3: Run the final jar ---
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=backend-build /app/backend/target/demo-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]