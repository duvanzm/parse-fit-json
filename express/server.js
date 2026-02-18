// IMPORTACIONES

// Framework para crear el servidor
const express = require("express");

// Permite que el frontend pueda hacer peticiones al backend
const cors = require("cors");

// Middleware para manejar subida de archivos
const multer = require("multer");

// Librería para parsear archivos .fit a JSON
const FitParser = require("fit-file-parser").default;


// CONFIGURACIÓN BÁSICA DEL SERVIDOR

// Creamos la aplicación Express
const app = express();

// Definimos el puerto donde correrá el servidor
const PORT = 3000;


// MIDDLEWARES GLOBALES

// Habilita CORS (permite peticiones desde otros dominios o puertos) Sin esto, el navegador bloquearía la petición.
app.use(cors());

// Permite recibir datos en formato JSON en el body
app.use(express.json());


// CONFIGURACIÓN DE MULTER

// Configuramos cómo se almacenarán los archivos subidos
const upload = multer({
  // Guardamos el archivo en memoria (RAM) en lugar de disco
  // Esto es útil si solo queremos procesarlo y no almacenarlo
  storage: multer.memoryStorage()
});


// RUTA PARA SUBIR ARCHIVO .FIT

// Creamos un endpoint POST en /upload
// upload.single("fitfile") significa:
//   - Espera un solo archivo
//   - El nombre del campo debe ser "fitfile"
app.post("/upload", upload.single("fitfile"), (req, res) => {


  // VALIDACIÓN


  // Si no se envió ningún archivo
  if (!req.file) {
    return res.status(400).json({
      error: "No se subió archivo"
    });
  }



  // CONFIGURACIÓN DEL PARSER


  // Creamos una instancia del parser con opciones personalizadas
  const fitParser = new FitParser({
    force: true,               // Intenta parsear aunque haya pequeños errores
    speedUnit: "km/h",         // Convierte velocidad a km/h
    lengthUnit: "km",          // Convierte distancia a kilómetros
    temperatureUnit: "celsius",// Temperatura en Celsius
    elapsedRecordField: true,  // Agrega campo elapsed_time
    mode: "cascade"            // Devuelve estructura jerárquica
  });



  // PARSEAR EL ARCHIVO


  // req.file.buffer contiene el archivo en formato binario
  fitParser.parse(req.file.buffer, (error, data) => {

    // Si ocurre un error durante el parseo
    if (error) {
      return res.status(500).json({
        error: error.message
      });
    }

    // Si todo sale bien, enviamos el JSON al cliente
    res.json(data);
  });
});


// INICIAR SERVIDOR

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
