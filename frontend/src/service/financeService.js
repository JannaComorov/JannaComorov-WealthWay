import axios from "axios";

const BASE_URL = "http://localhost:8080/api/finance";

// 🔐 Autentificare Basic
const username = "admin";
const password = "ek1111";
const basicAuth = "Basic " + btoa(`${username}:${password}`);

// 🔄 Configurație comună pentru axios
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: basicAuth,
    "Content-Type": "application/json",
  },
});

// ✅ Obține rezumatul financiar (venituri, cheltuieli, economii, credite)
export async function getFinanceSummary() {
  try {
    const response = await axiosInstance.get("/summary");
    return response.data;
  } catch (error) {
    console.error("❌ Eroare la preluarea rezumatului financiar:", error);
    throw new Error("Eroare la GET /summary");
  }
}

// ✅ Salvează rezumatul financiar
export async function saveFinanceSummary(summary) {
  try {
    console.log("📤 Salvăm rezumatul:", summary);
    const response = await axiosInstance.post("/summary", summary);
    return response.data;
  } catch (error) {
    console.error("❌ Eroare la salvarea rezumatului:", error);
    throw new Error("Eroare la POST /summary");
  }
}
