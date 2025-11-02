import { useState, useEffect } from "react";
import {
  getOtherExpenses,
  saveOtherExpenses,
  deleteOtherExpense, // optional
} from "../service/otherExpenseService";

function OtherExpenses({ onUpdateTotal }) {
  const [entries, setEntries] = useState([]);

  // 📥 Încarcă datele salvate la început
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getOtherExpenses();
        setEntries(data);
      } catch (error) {
        console.error("❌ Eroare la încărcarea cheltuielilor:", error);
      }
    };

    fetchData();
  }, []);

  // 💾 Recalculează și salvează automat
  useEffect(() => {
    const total = entries.reduce((sum, e) => sum + e.amount, 0);
    onUpdateTotal(total);

    const persist = async () => {
      try {
        await saveOtherExpenses(entries);
      } catch (err) {
        console.error("❌ Eroare la salvarea cheltuielilor:", err);
      }
    };

    persist();
  }, [entries, onUpdateTotal]);

  const handleAdd = (label, amount) => {
    const amt = parseFloat(amount);
    if (!label.trim() || isNaN(amt) || amt <= 0) return;

    setEntries((prev) => [
      ...prev,
      { label: label.trim(), amount: amt },
    ]);
  };

  const handleDelete = (index) => {
    const updated = [...entries];
    updated.splice(index, 1);
    setEntries(updated);
  };

  return (
    <div style={{ marginBottom: "2rem" }}>
      <h3>🌈 Alte Cheltuieli</h3>
      <ul>
        {entries.map((e, i) => (
          <li key={i}>
            {e.label} – {e.amount} lei{" "}
            <button onClick={() => handleDelete(i)}>🗑️</button>
          </li>
        ))}
      </ul>
      <AddEntryForm onAdd={handleAdd} />
    </div>
  );
}

function AddEntryForm({ onAdd }) {
  const [label, setLabel] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(label, amount);
    setLabel("");
    setAmount("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="ex: Cadou, Taxi"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Sumă"
        min="0"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <button type="submit">Adaugă</button>
    </form>
  );
}

export default OtherExpenses;
