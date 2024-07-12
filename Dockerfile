FROM node:20.14.0-buster-slim as node-build

WORKDIR /build

COPY /src/frontend/package.json .
COPY /src/frontend/package-lock.json .

RUN npm config set registry https://registry.npmjs.org/
RUN npm install

COPY /src/frontend .

RUN npm run build

#FROM eclipse-temurin:21
#FROM eclipse-temurin:21-jdk-alpine as BUILDER
#
#WORKDIR build
#
#COPY src src
#COPY pom.xml pom.xml
#RUN mvn clean package

#------------------
FROM maven:3.9.6-eclipse-temurin-21-jammy AS build

WORKDIR /backend/app

COPY pom.xml pom.xml
COPY src src
COPY --from=node-build /build/dist ./src/main/resources/static

RUN mvn clean package -DskipTests

#--------------------------

#FROM eclipse-temurin:21-jdk-
FROM bellsoft/liberica-openjdk-alpine:21.0.3

WORKDIR /app

COPY --from=build /backend/app/target/*.jar app.jar

CMD ["java","-jar","app.jar"]
