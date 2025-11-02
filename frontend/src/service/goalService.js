const BASE_URL = "http://localhost:8080/api/goals";

// 🔐 Autentificare Basic
const username = "admin";
const password = "ek1111";
const basicAuth = "Basic " + btoa(`${username}:${password}`);

const headers = {
  "Content-Type": "application/json",
  Authorization: basicAuth,
};

// 🔁 Funcție generală de request
async function request(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      ...headers,
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    const errText = await response.text();
    console.error(`❌ Eroare [${response.status}]: ${errText}`);
    throw new Error(errText || "Eroare necunoscută");
  }

  if (response.status !== 204) {
    // 204 = No Content
    return await response.json();
  }
}

// ✅ Obține toate obiectivele
export function getGoals() {
  return request(BASE_URL);
}

// ✅ Creează un obiectiv nou
export function createGoal(goal) {
  return request(BASE_URL, {
    method: "POST",
    body: JSON.stringify(goal),
  });
}

// ✅ Actualizează un obiectiv existent
export function updateGoal(id, goal) {
  return request(`${BASE_URL}/${id}`, {
    method: "PUT",
    body: JSON.stringify(goal),
  });
}

// ✅ Șterge un obiectiv după ID
export function deleteGoal(id) {
  return request(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
}
