const { Pool } = require("pg");

const setupDatabase = async () => {
  const pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "TU_PASSWORD",
    port: 5432,
    database: "fitnessdb",
  });

  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS workouts (
        id SERIAL PRIMARY KEY,
        user_id INTEGER,
        distance NUMERIC,
        avg_speed NUMERIC,
        raw_json JSONB,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    console.log("Tabla workouts creada o verificada");
  } catch (error) {
    console.error("Error creando tabla:", error);
  } finally {
    pool.end();
  }
};

module.exports = setupDatabase;
