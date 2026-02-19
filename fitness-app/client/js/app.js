const API_URL = "http://localhost:3000/api";

async function uploadFile() {
  const fileInput = document.getElementById("fileInput");
  const userId = document.getElementById("userId").value;
  const file = fileInput.files[0];

  if (!userId) {
    alert("Ingresa un userId");
    return;
  }

  if (!file) {
    alert("Selecciona un archivo .fit");
    return;
  }

  const formData = new FormData();
  formData.append("fitfile", file);

  try {
    const response = await fetch(`${API_URL}/upload/${userId}`, {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    document.getElementById("output").textContent =
      JSON.stringify(data, null, 2);

  } catch (error) {
    console.error(error);
    alert("Error subiendo archivo");
  }
}

async function loadWorkouts() {
  const userId = document.getElementById("userId").value;

  if (!userId) {
    alert("Ingresa un userId");
    return;
  }

  try {
    const response = await fetch(`${API_URL}/workouts/${userId}`);
    const data = await response.json();

    document.getElementById("history").textContent =
      JSON.stringify(data, null, 2);

  } catch (error) {
    console.error(error);
    alert("Error cargando historial");
  }
}
