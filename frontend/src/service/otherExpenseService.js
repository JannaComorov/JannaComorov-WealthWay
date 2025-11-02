import axios from "axios";

const BASE_URL = "http://localhost:8080/api/other-expenses";

// 🔐 Autentificare Basic
const username = "admin";
const password = "ek1111";
const basicAuth = "Basic " + btoa(`${username}:${password}`);

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: basicAuth,
  },
});

// 🔹 Obține toate cheltuielile
export const getOtherExpenses = async () => {
  // try {
  //   const res = await axiosInstance.get();
  //   return res.data;
  // } catch (error) {
  //   console.error("❌ Eroare la obținerea cheltuielilor:", error.response?.data || error.message);
  //   throw error;
  // }
  return [];
};

// 🔸 Salvează lista întreagă de cheltuieli
export const saveOtherExpenses = async (entries) => {
  // try {
  //   const res = await axiosInstance.post({ entries });
  //   return res.data;
  // } catch (error) {
  //   console.error("❌ Eroare la salvarea cheltuielilor:", error.response?.data || error.message);
  //   throw error;
  // }
  return [];
};

// 🔻 Șterge o cheltuială după ID
export const deleteOtherExpense = async (id) => {
  // try {
  //   const res = await axiosInstance.delete(`/${id}`);
  //   return res.data;
  // } catch (error) {
  //   console.error("❌ Eroare la ștergerea cheltuielii:", error.response?.data || error.message);
  //   throw error;
  // }
  return [];
};
