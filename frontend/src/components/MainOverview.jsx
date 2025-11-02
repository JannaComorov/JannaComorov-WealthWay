import { useState, useEffect } from "react";
import { saveIncome, getAllIncomes, deleteIncome } from "../service/incomeService";
import { useFinance } from "../context/FinanceContext";
import mainIcon from '../assets/situatie_generala.png';

function MainOverview() {
  const [incomes, setIncomes] = useState([]);
  const [form, setForm] = useState({ description: "", amount: "" });
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  // 🔄 Sincronizare cu context global
  const { totalCheltuieli, totalEconomii } = useFinance();

  // ✅ 1. Preluare venituri din backend
  useEffect(() => {
    async function fetchIncomes() {
      try {
        const data = await getAllIncomes();
        setIncomes(data);
      } catch (error) {
        console.error("❌ Eroare la încărcarea veniturilor:", error);
      }
    }

    fetchIncomes();
  }, []);

  // ✅ 2. PWA install prompt
  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User response to the install prompt: ${outcome}`);
      setDeferredPrompt(null);
    }
  };

  // ✅ 3. Form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ 4. Submit și salvare în backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    const amount = parseFloat(form.amount);
    if (!form.description.trim() || isNaN(amount) || amount <= 0) return;

    const newIncome = { source: form.description.trim(), amount };

    try {
      const saved = await saveIncome(newIncome);
      setIncomes((prev) => [...prev, saved]);
      setForm({ description: "", amount: "" });
    } catch (error) {
      console.error("❌ Salvare eșuată:", error);
    }
  };

  // ✅ 5. Ștergere persistentă
  const handleDelete = async (id) => {
    try {
      await deleteIncome(id);
      setIncomes((prev) => prev.filter((i) => i.id !== id));
    } catch (error) {
      console.error("❌ Eroare la ștergere:", error);
    }
  };

  const totalIncome = incomes.reduce((sum, i) => sum + i.amount, 0);
  const remaining = totalIncome - totalCheltuieli - totalEconomii;

  return (
    <div style={{ padding: "1rem" }}>
      <h2>
        <img
          src={mainIcon}
          alt="Situație Generală"
          style={{ height: "28px", verticalAlign: "middle", marginRight: "8px" }}
        />
        Situație Generală
      </h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
        <input
          name="description"
          placeholder="Sursă venit (ex: Salariu)"
          value={form.description}
          onChange={handleChange}
          required
        />
        <input
          name="amount"
          type="number"
          placeholder="Sumă"
          value={form.amount}
          onChange={handleChange}
          min="0"
          required
        />
        <button type="submit">➕ Adaugă venit</button>
      </form>

      <h3>✅ Venituri</h3>
      <ul>
        {incomes.map((i) => (
          <li key={i.id}>
            {i.source || i.description}: {i.amount} lei{" "}
            <button onClick={() => handleDelete(i.id)}>🗑️</button>
          </li>
        ))}
      </ul>

      <hr />
      <p><strong>Total venituri:</strong> {totalIncome} lei</p>
      <p><strong>Total cheltuieli:</strong> {totalCheltuieli} lei</p>
      <p><strong>Total economii:</strong> {totalEconomii} lei</p>

      <h3>
        💵 Suma disponibilă:{" "}
        <span style={{ color: remaining >= 0 ? "green" : "red" }}>
          {remaining} lei
        </span>
      </h3>

      {deferredPrompt && (
        <button
          onClick={handleInstall}
          style={{
            marginTop: "1rem",
            backgroundColor: "#6A1B9A",
            color: "white",
            border: "none",
            padding: "0.5rem 1rem",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          📲 Instalează WealthWay
        </button>
      )}
    </div>
  );
}

export default MainOverview;
