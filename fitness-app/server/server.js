const app = require("./src/app");
const setupDatabase = require("./src/config/setup");

const PORT = 3000;

const startServer = async () => {
  await setupDatabase();

  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
};

startServer();
