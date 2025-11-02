import { useState, useEffect } from "react";

const API_URL = "http://localhost:8080/api/expenses"; // Java endpoint

const initialCategories = [
  "Chirie / Rată apartament",
  "Întreținere bloc",
  "Apă",
  "Electricitate",
  "Încălzire",
  "Internet",
  "Telefon",
  "Domofon",
  "Medicamente esențiale",
  "Transport de bază",
  "Rate lunare (credite)",
];

function EssentialExpenses({ onUpdateTotal }) {
  const [expenses, setExpenses] = useState([]);

  // 📦 Încarcă cheltuielile salvate din backend
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();

        const mapped = initialCategories.map((name) => {
          const saved = data.find((item) => item.name === name);
          return saved ? saved : { name, amount: 0 };
        });

        setExpenses(mapped);
      } catch (err) {
        console.error("❌ Eroare la încărcarea cheltuielilor:", err.message);
        setExpenses(initialCategories.map((name) => ({ name, amount: 0 })));
      }
    };

    fetchExpenses();
  }, []);

  const handleAmountChange = async (index, value) => {
    const updated = [...expenses];
    updated[index].amount = parseFloat(value) || 0;
    setExpenses(updated);

    // try {
    //   await fetch(API_URL, {
    //     method: "PUT", // or POST, depending on backend behavior
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(updated[index]),
    //   });
    // } catch (err) {
    //   console.error("❌ Eroare la salvarea cheltuielii:", err.message);
    // }
  };

  const calculateAndSendTotal = () => {
    const total = expenses.reduce((sum, item) => sum + item.amount, 0);
    onUpdateTotal(total);
    expenses.forEach(el => el.amount = 0);
    setExpenses(expenses);
  };

  return (
    <div style={{ marginBottom: "2rem" }}>
      <h3>🧾 Cheltuieli Obligatorii</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {expenses.map((item, index) => (
          <li key={item.name} style={{ marginBottom: "0.5rem" }}>
            {item.name}:{" "}
            <input
              type="number"
              min="0"
              value={item.amount}
              onChange={(e) => handleAmountChange(index, e.target.value)}
            />{" "}
            lei
          </li>
        ))}
      </ul>

      <button onClick={calculateAndSendTotal}>
        ✅ Salveaza
      </button>
    </div>
  );
}

export default EssentialExpenses;
