# backend/Dockerfile
FROM eclipse-temurin:21-jdk-alpine
WORKDIR /app
COPY .mvn/ .mvn
COPY mvnw pom.xml ./
# Baixa as dependências (cache layer)
RUN ./mvnw dependency:go-offline
COPY src ./src
# Comando para rodar o app
CMD ["./mvnw", "spring-boot:run"]