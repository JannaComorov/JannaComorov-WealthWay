import { createContext, useContext, useState, useEffect } from "react";
import { getFinanceSummary, saveFinanceSummary } from "../service/financeService"; // ✅ API

const FinanceContext = createContext();

export function FinanceProvider({ children }) {
  const [summary, setSummary] = useState({
    totalVenituri: 0,
    totalCheltuieli: 0,
    totalEconomii: 0,
    totalRateCredite: 0,
  });

  // 🔁 La prima montare: încarcă datele din backend
  useEffect(() => {
    async function loadSummary() {
      try {
        const data = await getFinanceSummary();
        setSummary({
          totalVenituri: data.totalVenituri || 0,
          totalCheltuieli: data.totalCheltuieli || 0,
          totalEconomii: data.totalEconomii || 0,
          totalRateCredite: data.totalRateCredite || 0,
        });
      } catch (err) {
        console.error("❌ Eroare la încărcarea din backend:", err);
      }
    }

    loadSummary();
  }, []);

  // 💾 Salvează automat modificările în backend
  useEffect(() => {
    saveFinanceSummary(summary).catch((err) =>
      console.error("❌ Eroare la salvarea în backend:", err)
    );
  }, [summary]);

  // 🎯 Funcții pentru actualizare individuală
  const setTotalVenituri = (val) =>
    setSummary((prev) => ({ ...prev, totalVenituri: val }));
  const setTotalCheltuieli = (val) =>
    setSummary((prev) => ({ ...prev, totalCheltuieli: val }));
  const setTotalEconomii = (val) =>
    setSummary((prev) => ({ ...prev, totalEconomii: val }));
  const setTotalRateCredite = (val) =>
    setSummary((prev) => ({ ...prev, totalRateCredite: val }));

  return (
    <FinanceContext.Provider
      value={{
        ...summary,
        setTotalVenituri,
        setTotalCheltuieli,
        setTotalEconomii,
        setTotalRateCredite,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
}

export const useFinance = () => useContext(FinanceContext);
