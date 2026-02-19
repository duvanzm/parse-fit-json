const express = require("express");
const multer = require("multer");
const { uploadWorkout, getWorkouts } = require("../controllers/workout.controller");

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage()
});

router.post("/upload/:userId", upload.single("fitfile"), uploadWorkout);
router.get("/workouts/:userId", getWorkouts);

module.exports = router;
