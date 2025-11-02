import { useState, useEffect } from "react";
import { useFinance } from "../context/FinanceContext";

const API_URL = "http://localhost:8080/api/credits";

// 🔐 Autentificare Basic
const username = "admin";
const password = "ek1111";
const basicAuth = "Basic " + btoa(`${username}:${password}`);
const headers = {
  "Content-Type": "application/json",
  Authorization: basicAuth,
};

function CreditList() {
  const [credits, setCredits] = useState([]);
  const [form, setForm] = useState({
    description: "",
    totalAmount: "",
    months: "",
    startDate: "",
    paidMonths: "",
  });

  const { setTotalRateCredite } = useFinance();

  // 🔁 Încarcă creditele salvate din backend
  useEffect(() => {
    async function fetchCredits() {
      try {
        const response = await fetch(API_URL, { headers });
        if (!response.ok) throw new Error("Eroare la încărcare credite");
        const data = await response.json();
        setCredits(data);
      } catch (err) {
        console.error("❌ fetchCredits:", err.message);
      }
    }

    fetchCredits();
  }, []);

  // 🔄 Calculează și setează ratele active în context
  useEffect(() => {
    const totalRate = credits.reduce((sum, credit) => {
      const remaining = credit.months - credit.paidMonths;
      return remaining > 0 ? sum + credit.monthlyRate : sum;
    }, 0);
    setTotalRateCredite(totalRate);
  }, [credits]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const total = parseFloat(form.totalAmount);
    const months = parseInt(form.months);
    const paid = parseInt(form.paidMonths);

    if (!form.description || isNaN(total) || isNaN(months) || isNaN(paid)) {
      alert("Completează toate câmpurile corect.");
      return;
    }

    const newCredit = {
      description: form.description.trim(),
      totalAmount: total,
      months,
      startDate: form.startDate,
      paidMonths: paid,
      monthlyRate: parseFloat((total / months).toFixed(2)),
    };

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers,
        body: JSON.stringify(newCredit),
      });

      if (!res.ok) throw new Error("Eroare la salvarea creditului");

      const saved = await res.json();
      setCredits((prev) => [...prev, saved]);
      setForm({
        description: "",
        totalAmount: "",
        months: "",
        startDate: "",
        paidMonths: "",
      });
    } catch (err) {
      console.error("❌ handleSubmit:", err.message);
    }
  };

  return (
    <div>
      <h2>💳 Credite active</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="description"
          placeholder="Ex: Credit auto"
          value={form.description}
          onChange={handleChange}
          required
        />
        <input
          name="totalAmount"
          type="number"
          placeholder="Suma totală"
          value={form.totalAmount}
          onChange={handleChange}
          required
        />
        <input
          name="months"
          type="number"
          placeholder="Perioadă totală (luni)"
          value={form.months}
          onChange={handleChange}
          required
        />
        <input
          name="paidMonths"
          type="number"
          placeholder="Luni deja achitate"
          value={form.paidMonths}
          onChange={handleChange}
          required
        />
        <input
          name="startDate"
          type="date"
          value={form.startDate}
          onChange={handleChange}
          required
        />
        <button type="submit">➕ Adaugă credit</button>
      </form>

      <ul style={{ marginTop: "1rem" }}>
        {credits.map((credit) => {
          const remaining = credit.months - credit.paidMonths;
          const sumaRamasa = remaining * credit.monthlyRate;

          return (
            <li key={credit.id} style={{ marginBottom: "1rem" }}>
              <strong>{credit.description}</strong> – {credit.totalAmount} lei
              <br />
              🧾 Rată lunară: {credit.monthlyRate} lei
              <br />
              📅 Început: {credit.startDate}
              <br />
              ✅ Achitate: {credit.paidMonths} luni
              <br />
              {remaining <= 0 ? (
                <span style={{ color: "green" }}>✔️ Credit achitat integral</span>
              ) : (
                <>
                  ⏳ Rămase: {remaining} luni
                  <br />
                  💰 De achitat: {sumaRamasa.toFixed(2)} lei
                </>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default CreditList;
