// Definimos una función asíncrona para manejar la carga del archivo
async function uploadFile() {
  // Buscamos el elemento input de tipo file en el HTML por su ID
  const fileInput = document.getElementById("fileInput");
  
  // Obtenemos el primer archivo seleccionado por el usuario
  const file = fileInput.files[0];

  // Validamos si el usuario realmente seleccionó algo
  if (!file) {
    alert("Selecciona un archivo .fit");
    return; // Detenemos la ejecución si no hay archivo
  }

  // Creamos un objeto FormData, que es necesario para enviar archivos vía HTTP
  const formData = new FormData();
  
  // Agregamos el archivo al formulario con la clave "fitfile" 
  // (esta es la clave que el servidor esperará leer)
  formData.append("fitfile", file);

  try {
    // Realizamos la petición POST al servidor local
    const response = await fetch("http://localhost:3000/upload", {
      method: "POST",   // Especificamos el método de envío
      body: formData    // Enviamos el objeto FormData que contiene el archivo
    });

    // Convertimos la respuesta del servidor a un objeto JSON
    const data = await response.json();

    // Mostramos el JSON resultante en un elemento del HTML (formateado para que sea legible)
    document.getElementById("output").textContent =
      JSON.stringify(data, null, 2);
      
  } catch (error) {
    // Manejo básico de errores por si el servidor no responde
    console.error("Error al subir el archivo:", error);
    document.getElementById("output").textContent = "Error en la conexión con el servidor.";
  }
}

// Buscamos el botón de subir y le asignamos el evento "click" para ejecutar la función
document.getElementById("uploadBtn").addEventListener("click", uploadFile);