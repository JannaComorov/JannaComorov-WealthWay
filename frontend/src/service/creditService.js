const BASE_URL = "http://localhost:8080/api/credits";

// 🔐 Autentificare Basic
const username = "admin";
const password = "ek1111";
const basicAuth = "Basic " + btoa(`${username}:${password}`);

const headers = {
  "Content-Type": "application/json",
  Authorization: basicAuth,
};

// 🔹 Obține toate creditele
export async function getAllCredits() {
  try {
    const response = await fetch(BASE_URL, { headers });
    if (!response.ok) {
      const text = await response.text();
      throw new Error("❌ Eroare la obținerea creditelor: " + text);
    }
    return await response.json();
  } catch (err) {
    console.error("❌ getAllCredits:", err.message);
    throw err;
  }
}

// 🔸 Adaugă un credit nou
export async function saveCredit(credit) {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers,
      body: JSON.stringify(credit),
    });
    if (!response.ok) {
      const text = await response.text();
      throw new Error("❌ Eroare la salvarea creditului: " + text);
    }
    return await response.json();
  } catch (err) {
    console.error("❌ saveCredit:", err.message);
    throw err;
  }
}

// 🔻 Șterge un credit după ID
export async function deleteCredit(id) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
      headers,
    });
    if (!response.ok) {
      const text = await response.text();
      throw new Error("❌ Eroare la ștergerea creditului: " + text);
    }
  } catch (err) {
    console.error("❌ deleteCredit:", err.message);
    throw err;
  }
}
