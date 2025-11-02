const API_URL = "http://localhost:8080/api/budgets";

// 🔐 Autentificare hardcodata
const username = "admin";
const password = "ek1111";
const basicAuth = "Basic " + btoa(username + ":" + password);

/**
 * 🔄 Funcție generală pentru request-uri cu gestionare completă a erorilor
 */
async function request(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      Authorization: basicAuth,
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("❌ Eroare de la backend:", errorText);
    throw new Error(`Eroare (${response.status}): ${errorText}`);
  }

  const contentType = response.headers.get("Content-Type");
  if (contentType && contentType.includes("application/json")) {
    return await response.json();
  } else {
    throw new Error("❌ Răspuns invalid: nu este JSON");
  }
}

// ✅ Obține toate bugetele
export function fetchBudgets() {
  return request(API_URL);
}

// ✅ Adaugă un buget nou
export function addBudget(budget) {
  console.log("📤 Trimitem către backend:", budget);
  return request(API_URL, {
    method: "POST",
    body: JSON.stringify(budget),
  });
}

// ✅ Actualizează un buget existent
export function updateBudget(id, budget) {
  return request(`${API_URL}/${id}`, {
    method: "PUT",
    body: JSON.stringify(budget),
  });
}

// ✅ Șterge un buget
export function deleteBudget(id) {
  return request(`${API_URL}/${id}`, {
    method: "DELETE",
  });
}
