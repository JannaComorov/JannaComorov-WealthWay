import { useEffect, useState } from "react";
import { getHistoryByMonth, saveHistory } from "../service/historyService";
import { useFinance } from "../context/FinanceContext";

const getCurrentMonth = () => {
  const today = new Date();
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}`;
};

function IstoricLunar() {
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());
  const [venituri, setVenituri] = useState(0);
  const [cheltuieli, setCheltuieli] = useState(0);
  const [economii, setEconomii] = useState(0);
  const [credite, setCredite] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const {
    totalVenituri,
    totalCheltuieli,
    totalEconomii,
    totalRateCredite,
  } = useFinance();

  useEffect(() => {
    loadHistory(selectedMonth);
  }, [selectedMonth]);

  const loadHistory = async (month) => {
    setLoading(true);
    try {
      const data = await getHistoryByMonth(month);
      setVenituri(data.venituri || 0);
      setCheltuieli(data.cheltuieli || 0);
      setEconomii(data.economii || 0);
      setCredite(data.credite || 0);
      setError(null);
    } catch (err) {
      setVenituri(0);
      setCheltuieli(0);
      setEconomii(0);
      setCredite(0);
      setError("❌ Nu s-a putut încărca istoricul.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (
      totalVenituri === 0 &&
      totalCheltuieli === 0 &&
      totalEconomii === 0 &&
      totalRateCredite === 0
    ) {
      alert("⚠️ Nu există date de salvat.");
      return;
    }

    try {
      await saveHistory({
        month: selectedMonth,
        venituri: totalVenituri,
        cheltuieli: totalCheltuieli,
        economii: totalEconomii,
        credite: totalRateCredite,
      });
      setSuccess("✅ Istoricul a fost salvat!");
      setError(null);
      loadHistory(selectedMonth);
    } catch (err) {
      console.error("❌ Salvare istoric:", err.message);
      setError("❌ Eroare la salvare în baza de date.");
      setSuccess(null);
    } finally {
      setTimeout(() => setSuccess(null), 3000);
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>🗓️ Istoric lunar</h2>
      <label>
        Selectează luna:
        <input
          type="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        />
      </label>

      <button onClick={handleSave} style={{ marginLeft: "1rem" }}>
        💾 Salvează istoric
      </button>

      {loading ? (
        <p>🔄 Se încarcă datele...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <>
          {success && <p style={{ color: "green" }}>{success}</p>}

          <ul style={{ marginTop: "1rem" }}>
            <li>💶 Venituri: {venituri} lei</li>
            <li>🧾 Cheltuieli: {cheltuieli} lei</li>
            <li>💎 Economii: {economii} lei</li>
            <li>💳 Credite: {credite} lei</li>
          </ul>

          <hr />
          <p>
            <strong>
              📈 Suma disponibilă: {venituri - cheltuieli - economii - credite} lei
            </strong>
          </p>
        </>
      )}
    </div>
  );
}

export default IstoricLunar;
