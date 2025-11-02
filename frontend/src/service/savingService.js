// savingService.js
import axios from "axios";

const BASE_URL = "http://localhost:8080/api/savings";

// 🔹 Obține toate economiile
export const getAllSavings = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("❌ Eroare la obținerea economiilor:", error);
    throw error;
  }
};

// 🔸 Salvează o nouă economie
export const saveSaving = async (saving) => {
  try {
    const response = await axios.post(BASE_URL, saving);
    return response.data;
  } catch (error) {
    console.error("❌ Eroare la salvarea economiei:", error);
    throw error;
  }
};

// 🔻 Șterge o economie după ID
export const deleteSaving = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
  } catch (error) {
    console.error("❌ Eroare la ștergerea economiei:", error);
    throw error;
  }
};
