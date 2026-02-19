const express = require("express");
const cors = require("cors");

const workoutRoutes = require("./routes/workout.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", workoutRoutes);

module.exports = app;
