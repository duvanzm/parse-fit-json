const { Pool } = require("pg");

// Conexión a PostgreSQL (sin especificar base aún)
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  password: "TU_PASSWORD",
  port: 5432,
  database: "postgres", // Nos conectamos primero a la base principal
});

// Función para inicializar DB y tabla
const initDB = async () => {
  try {
    // 1️⃣ Crear base de datos si no existe
    await pool.query(`
      SELECT 'CREATE DATABASE fitnessdb'
      WHERE NOT EXISTS (
        SELECT FROM pg_database WHERE datname = 'fitnessdb'
      )
    `);

    console.log("Base de datos verificada o creada");

  } catch (error) {
    console.log("La base de datos ya existe");
  }
};

module.exports = {
  pool,
  initDB,
};
