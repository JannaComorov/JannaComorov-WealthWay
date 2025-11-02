import { useState, useEffect, useRef } from "react";
import EssentialExpenses from "./EssentialExpenses";
import RecurringExpenses from "./RecurringExpenses";
import OtherExpenses from "./OtherExpenses";
import { useFinance } from "../context/FinanceContext";

const API_URL = "http://localhost:8080/api/expenses";
const username = "admin";
const password = "ek1111";
const basicAuth = "Basic " + btoa(`${username}:${password}`);
const headers = {
  "Content-Type": "application/json",
  Authorization: basicAuth,
};

function CheltuieliLunare() {
  const [obligatorii, setObligatorii] = useState(0);
  const [permanente, setPermanente] = useState(0);
  const [alte, setAlte] = useState(0);

  const { setTotalCheltuieli, totalRateCredite } = useFinance();


  // 🔁 Încarcă din backend la prima montare
  useEffect(() => {
    async function fetchSavedExpenses() {
      try {
        const res = await fetch(API_URL, { headers });
        if (!res.ok) throw new Error("Eroare la încărcare cheltuieli");

        const data = await res.json();
        const total = data.reduce(
          (acc, el) => {
            acc.required += el.required || 0;
            acc.permanent += el.permanent || 0;
            acc.other += el.other || 0;
            return acc;
          },
          { required: 0, permanent: 0, other: 0 }
        );

        setObligatorii(total.required);
        setPermanente(total.permanent);
        setAlte(total.other);

      } catch (err) {
        console.error("❌ fetchSavedExpenses:", err.message);
      }
    }

    fetchSavedExpenses();
  }, []);

  // 💾 Salvează automat cheltuielile în backend + actualizează contextul global
  useEffect(() => {

    const totalLocal = obligatorii + permanente + alte;
    const totalFinal = totalLocal + totalRateCredite;
    setTotalCheltuieli(totalFinal);

    async function saveExpenses() {
      const payload = { obligatorii, permanente, alte };
      try {
        var res = await fetch(API_URL, {
          method: "POST",
          headers,
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
      } catch (err) {
        console.error("❌ Eroare la salvare cheltuieli:", err.message);
      }
    }

    saveExpenses();
  }, [obligatorii, permanente, alte]);

  return (
    <div>
      <h2>🔵 Cheltuieli lunare</h2>

      <EssentialExpenses onUpdateTotal={setObligatorii} />
      <RecurringExpenses onUpdateTotal={setPermanente} />
      {/* <OtherExpenses onUpdateTotal={setAlte} /> */}

      <hr />
      <p>
        Total local: {obligatorii + permanente + alte} lei <br />
        ➕ Rate credite: {totalRateCredite} lei <br />
        <strong>Total general: {obligatorii + permanente + alte + totalRateCredite} lei</strong>
      </p>
    </div>
  );
}

export default CheltuieliLunare;
