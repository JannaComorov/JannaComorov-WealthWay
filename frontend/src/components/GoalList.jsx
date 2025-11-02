import { useState, useEffect } from "react";
import {
  getGoals,
  createGoal,
  updateGoal,
  deleteGoal,
} from "../service/goalService";

function GoalList() {
  const [goals, setGoals] = useState([]);
  const [form, setForm] = useState({ description: "", amount: "", type: "lunar" });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [total, setTotal] = useState(0);
  const [lunarGoals, setLunarGoals] = useState([]);
  const [longTermGoals, setLongTermGoals] = useState([]);

  const fetchGoals = async () => {
    try {
      const data = await getGoals();
      setGoals(data);
      const total$ = data.reduce((sum, g) => sum + g.amount, 0);
      const lunarGoals$ = data.filter((g) => g.type === "lunar".toUpperCase()).sort((a, b) => a.amount - b.amount);
      const longTermGoals$ = data.filter((g) => g.type === "long_term".toUpperCase()).sort((a, b) => a.amount - b.amount);
      setTotal(total$);
      setLunarGoals(lunarGoals$);
      setLongTermGoals(longTermGoals$);
    } catch (err) {
      console.error("❌ getGoals:", err.message);
      setError("⚠️ Eroare la încărcarea obiectivelor.");
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const amount = parseFloat(form.amount);
    if (!form.description.trim() || isNaN(amount) || amount <= 0) {
      setError("❗ Completează corect toate câmpurile.");
      return;
    }

    const goal = {
      description: form.description.trim(),
      amount,
      type: form.type.toUpperCase(),
    };

    try {
      if (editId) {
        await updateGoal(editId, goal);
        setSuccess("✔️ Obiectiv actualizat!");
      } else {
        await createGoal(goal);
        setSuccess("✅ Obiectiv adăugat!");
      }

      setForm({ description: "", amount: "", type: "lunar" });
      setEditId(null);
      fetchGoals();
    } catch (err) {
      console.error("❌ Salvare obiectiv:", err.message);
      setError("⚠️ Eroare la salvarea obiectivului.");
    } finally {
      setTimeout(() => setSuccess(null), 3000);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Ești sigur că vrei să ștergi acest obiectiv?")) return;

    try {
      await deleteGoal(id);
      fetchGoals();
    } catch (err) {
      console.error("❌ deleteGoal:", err.message);
      setError("❌ Eroare la ștergere.");
    }
  };

  const handleEdit = (goal) => {
    setForm({ description: goal.description, amount: goal.amount, type: goal.type });
    setEditId(goal.id);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>🥅 Obiective financiare</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
        <input
          name="description"
          placeholder="Ex: Laptop nou"
          value={form.description}
          onChange={handleChange}
          required
        />
        <input
          name="amount"
          type="number"
          min="1"
          placeholder="Sumă"
          value={form.amount}
          onChange={handleChange}
          required
        />
        <select name="type" value={form.type} onChange={handleChange}>
          <option value="lunar">Obiectiv lunar</option>
          <option value="long_term">Pe termen lung</option>
        </select>
        <button type="submit">
          {editId ? "💾 Salvează" : "✚ Adaugă"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <h3>💹 Total obiective: {total} lei</h3>

      <div>
        <h4>📅 Obiective lunare</h4>
        {lunarGoals.length === 0 ? (
          <p>Niciun obiectiv lunar.</p>
        ) : (
          <ul>
            {lunarGoals.map((g) => (
              <li key={g.id}>
                <div>
                  {g.description} – {g.amount} lei{" "}
                  <button onClick={() => handleEdit(g)}>🛠</button>
                  <button onClick={() => handleDelete(g.id)}>❌</button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <h4>⏳ Obiective pe termen lung</h4>
        {longTermGoals.length === 0 ? (
          <p>Niciun obiectiv pe termen lung.</p>
        ) : (
          <ul>
            {longTermGoals.map((g) => (
              <li key={g.id}>
                <div>
                  {g.description} – {g.amount} lei{" "}
                  <button onClick={() => handleEdit(g)}>🛠</button>
                  <button onClick={() => handleDelete(g.id)}>❌</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default GoalList;
