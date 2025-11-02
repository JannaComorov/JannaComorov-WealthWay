// src/services/expenseService.js

const BASE_URL = "http://localhost:8080/api/expenses";

/**
 * Obține cheltuielile (obligatorii, permanente, alte) salvate anterior.
 * Returnează un obiect de forma:
 * {
 *   obligatorii: number,
 *   permanente: number,
 *   alte: number
 * }
 */
export async function fetchExpenses() {
  const response = await fetch(BASE_URL);

  if (!response.ok) {
    throw new Error("❌ Eroare la obținerea cheltuielilor");
  }

  return await response.json();
}

/**
 * Salvează cheltuielile actualizate în backend.
 * @param {object} expense - Obiect de forma { obligatorii, permanente, alte }
 */
export async function saveExpenses(expense) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(expense),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error("❌ Eroare la salvarea cheltuielilor: " + errText);
  }

  return await response.json();
}
// src/services/expenseService.js

const BASE_URL = "http://localhost:8080/api/expenses";

/**
 * Obține cheltuielile (obligatorii, permanente, alte) salvate anterior.
 * Returnează un obiect de forma:
 * {
 *   obligatorii: number,
 *   permanente: number,
 *   alte: number
 * }
 */
export async function fetchExpenses() {
  const response = await fetch(BASE_URL);

  if (!response.ok) {
    throw new Error("❌ Eroare la obținerea cheltuielilor");
  }

  return await response.json();
}

/**
 * Salvează cheltuielile actualizate în backend.
 * @param {object} expense - Obiect de forma { obligatorii, permanente, alte }
 */
export async function saveExpenses(expense) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(expense),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error("❌ Eroare la salvarea cheltuielilor: " + errText);
  }

  return await response.json();
}
