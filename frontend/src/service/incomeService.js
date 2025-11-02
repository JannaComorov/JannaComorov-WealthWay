const BASE_URL = "http://localhost:8080/api/income";

// 🔐 Autentificare Basic
const username = "admin";
const password = "ek1111";
const basicAuth = "Basic " + btoa(`${username}:${password}`);

const headers = {
  "Content-Type": "application/json",
  Authorization: basicAuth,
};

// 🔹 Obține toate veniturile
export async function getAllIncomes() {
  try {
    const response = await fetch(BASE_URL, {
      headers: { Authorization: basicAuth },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Eroare backend:", errorText);
      throw new Error("Eroare la obținerea veniturilor: " + errorText);
    }

    return await response.json();
  } catch (err) {
    console.error("❌ getAllIncomes:", err);
    throw err;
  }
}

// 🔸 Adaugă un venit nou
export async function saveIncome(income) {
  try {
    console.log("📤 Salvează venit:", income);
    var local = JSON.parse(JSON.stringify(income));
    local.budget = 0;
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers,
      body: JSON.stringify(local),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Backend a returnat eroare:", errorText);
      throw new Error("Eroare la salvarea venitului: " + errorText);
    }

    return await response.json();
  } catch (err) {
    console.error("❌ saveIncome:", err);
    throw err;
  }
}

// 🔻 Șterge un venit după ID
export async function deleteIncome(id) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
      headers: { Authorization: basicAuth },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Eroare backend:", errorText);
      throw new Error("Eroare la ștergerea venitului: " + errorText);
    }
  } catch (err) {
    console.error("❌ deleteIncome:", err);
    throw err;
  }
}
