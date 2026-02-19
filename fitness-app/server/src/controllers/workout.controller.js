const pool = require("../config/db");
const { parseFit } = require("../services/fit.service");

exports.uploadWorkout = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!req.file) {
      return res.status(400).json({ error: "No se subió archivo" });
    }

    const data = await parseFit(req.file.buffer);
    const session = data?.activity?.sessions?.[0];

    if (!session) {
      return res.status(400).json({ error: "Archivo FIT inválido" });
    }

    const distance = session.total_distance || 0;
    const avgSpeed = session.avg_speed || 0;

    const result = await pool.query(
      `INSERT INTO workouts (user_id, distance, avg_speed, raw_json)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [userId, distance, avgSpeed, data]
    );

    res.status(201).json({
      message: "Entrenamiento guardado",
      workout: result.rows[0]
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

exports.getWorkouts = async (req, res) => {
  try {
    const { userId } = req.params;

    const result = await pool.query(
      "SELECT * FROM workouts WHERE user_id = $1 ORDER BY created_at DESC",
      [userId]
    );

    res.json(result.rows);

  } catch (error) {
    res.status(500).json({ error: "Error obteniendo workouts" });
  }
};
