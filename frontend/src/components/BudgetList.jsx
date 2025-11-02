import { useState, useEffect } from "react";
import {
  fetchBudgets,
  addBudget,
  updateBudget,
  deleteBudget
} from "../service/budgetService";
import { getGoals } from "../service/goalService";

function BudgetList() {
  const [budgets, setBudgets] = useState([]);
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState(null);

  // 🔁 Încarcă bugetele și obiectivele la montare
  useEffect(() => {
    loadBudgets();
    loadGoals();
  }, []);

  const loadBudgets = async () => {
    try {
      const data = await fetchBudgets();
      setBudgets(data);
    } catch (err) {
      setError("❌ Eroare la încărcarea bugetelor: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadGoals = async () => {
    try {
      const data = await getGoals();
      setGoals(data.filter((g) => g.type === "lunar"));
    } catch (err) {
      console.error("Eroare la încărcarea obiectivelor:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newBudget = {
      category,
      amount: parseFloat(amount),
      startDate,
      endDate,
    };

    try {
      if (editId) {
        await updateBudget(editId, newBudget);
      } else {
        await addBudget(newBudget);
      }

      resetForm();
      loadBudgets(); // 🔁 Reîncarcă
    } catch (err) {
      setError("❌ Eroare la salvare: " + err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteBudget(id);
      loadBudgets();
    } catch (err) {
      setError("❌ Eroare la ștergere: " + err.message);
    }
  };

  const handleEdit = (budget) => {
    setCategory(budget.category);
    setAmount(budget.amount);
    setStartDate(budget.startDate);
    setEndDate(budget.endDate);
    setEditId(budget.id);
  };

  const resetForm = () => {
    setCategory("");
    setAmount("");
    setStartDate("");
    setEndDate("");
    setEditId(null);
  };

  const totalBudget = budgets.reduce((sum, b) => sum + b.amount, 0);
  const totalGoals = goals.reduce((sum, g) => sum + g.amount, 0);

  return (
    <div>
      <h2>📅 Buget lunar</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Categorie"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Sumă"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="1"
          required
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
        <button type="submit">
          {editId ? "💾 Salvează" : "➕ Adaugă"}
        </button>
        {editId && (
          <button type="button" onClick={resetForm}>
            Anulează
          </button>
        )}
      </form>

      <h3>Total buget: {totalBudget} lei</h3>
      <h3>Total obiective lunare: {totalGoals} lei</h3>

      {totalBudget >= totalGoals ? (
        <p style={{ color: "green" }}>✅ Bugetul acoperă obiectivele lunare.</p>
      ) : (
        <p style={{ color: "red" }}>⚠️ Bugetul este insuficient!</p>
      )}

      <h3>Lista bugetelor:</h3>
      {loading ? (
        <p>⏳ Se încarcă...</p>
      ) : (
        <ul>
          {budgets.map((budget) => (
            <li key={budget.id}>
              <strong>{budget.category}</strong>: {budget.amount} lei
              <br />
              {budget.startDate} → {budget.endDate}
              <br />
              <button onClick={() => handleEdit(budget)}>✏️</button>
              <button onClick={() => handleDelete(budget.id)}>🗑️</button>
            </li>
          ))}
        </ul>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default BudgetList;
