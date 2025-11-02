import { useState, useEffect } from "react";
import { addBudget } from "../service/budgetService";
import { useFinance } from "../context/FinanceContext";

function AddBudgetForm({ onAdd }) {
  const [formData, setFormData] = useState({
    category: "",
    amount: "",
    startDate: "",
    endDate: "",
    type: "lunar",
  });

  const [budgets, setBudgets] = useState([]);
  const { setTotalCheltuieli } = useFinance(); // ✅ actualizează contextul global

  useEffect(() => {
    const total = budgets.reduce((sum, b) => sum + (parseFloat(b.amount) || 0), 0);
    setTotalCheltuieli(total);
  }, [budgets, setTotalCheltuieli]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const amount = parseFloat(formData.amount);
    if (isNaN(amount) || amount <= 0) {
      alert("❗ Suma trebuie să fie mai mare decât 0");
      return;
    }

    if (formData.endDate < formData.startDate) {
      alert("❗ Data de sfârșit nu poate fi înaintea datei de început");
      return;
    }

    const newBudget = {
      category: formData.category.trim(),
      amount,
      startDate: formData.startDate,
      endDate: formData.endDate,
      type: formData.type,
    };

    try {
      const created = await addBudget(newBudget);
      onAdd(created); // ✅ Trimite în componenta părinte (dacă e nevoie)
      setBudgets((prev) => [...prev, created]);
      setFormData({
        category: "",
        amount: "",
        startDate: "",
        endDate: "",
        type: "lunar",
      });
    } catch (err) {
      console.error("❌ Eroare:", err);
      alert("❌ Eroare la trimiterea bugetului: " + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      <input
        name="category"
        value={formData.category}
        onChange={handleChange}
        placeholder="Categorie buget"
        required
      />
      <input
        name="amount"
        value={formData.amount}
        onChange={handleChange}
        placeholder="Sumă"
        type="number"
        min="1"
        required
      />
      <input
        name="startDate"
        value={formData.startDate}
        onChange={handleChange}
        type="date"
        required
      />
      <input
        name="endDate"
        value={formData.endDate}
        onChange={handleChange}
        type="date"
        required
      />
      <select
        name="type"
        value={formData.type}
        onChange={handleChange}
        required
      >
        <option value="lunar">Lunar</option>
        <option value="long_term">Pe termen lung</option>
      </select>
      <button type="submit">➕ Adaugă buget</button>
    </form>
  );
}

export default AddBudgetForm;
