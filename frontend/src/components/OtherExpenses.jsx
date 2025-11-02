import { useState, useEffect } from "react";
import {
  getOtherExpenses,
  saveOtherExpenses,
  deleteOtherExpense
} from "../service/otherExpenseService";

function OtherExpenses({ onUpdateTotal }) {
  const [items, setItems] = useState([]);

  // 📥 Încarcă din backend la început
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getOtherExpenses();
        setItems(data);
      } catch (error) {
        console.error("❌ Eroare la încărcarea cheltuielilor:", error);
      }
    }
    fetchData();
  }, []);

  // 🔄 Trimite la backend ori de câte ori `items` se schimbă
  useEffect(() => {
    const total = items.reduce(
      (sum, cat) => sum + cat.entries.reduce((s, e) => s + e.amount, 0),
      0
    );
    onUpdateTotal(total);
    saveOtherExpenses(items); // salvează automat la modificări
  }, [items]);

  const handleAddEntry = (categoryIndex, label, amount) => {
    if (!label || isNaN(parseFloat(amount))) return;
    const newItems = [...items];
    newItems[categoryIndex].entries.push({
      label: label.trim(),
      amount: parseFloat(amount),
    });
    setItems(newItems);
  };

  const handleDeleteEntry = (categoryIndex, entryIndex) => {
    const entryId = items[categoryIndex].entries[entryIndex]?.id;
    const newItems = [...items];
    newItems[categoryIndex].entries.splice(entryIndex, 1);
    setItems(newItems);
    if (entryId) deleteOtherExpense(entryId); // opțional: ștergere din backend
  };

  return (
    <div>
      <h3>💸 Alte Cheltuieli</h3>

      {items.map((cat, i) => (
        <div key={cat.category} style={{ marginBottom: "1rem" }}>
          <h4>{cat.category}</h4>
          <ul>
            {cat.entries.map((entry, j) => (
              <li key={j}>
                {entry.label} – {entry.amount} lei{" "}
                <button onClick={() => handleDeleteEntry(i, j)}>🗑️</button>
              </li>
            ))}
          </ul>

          <AddEntryForm onAdd={(label, amount) => handleAddEntry(i, label, amount)} />
        </div>
      ))}
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
    <form onSubmit={handleSubmit} style={{ marginTop: "0.5rem" }}>
      <input
        placeholder="ex: Flori"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Sumă"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        min="0"
        required
      />
      <button type="submit">Adaugă</button>
    </form>
  );
}

export default OtherExpenses;
