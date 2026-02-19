🗄 BASE DE DATOS

En PostgreSQL:

CREATE DATABASE fitnessdb;

\c fitnessdb

CREATE TABLE workouts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
  distance NUMERIC,
  avg_speed NUMERIC,
  raw_json JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);


▶️ Cómo ejecutar
cd server
node server.js


Luego abre:

client/index.html
