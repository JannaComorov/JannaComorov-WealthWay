import { useState, useEffect } from "react";
import MainOverview from "./components/MainOverview";
import CheltuieliLunare from "./components/CheltuieliLunare";
import CreditList from "./components/CreditList";
import GoalList from "./components/GoalList";
import IstoricLunar from "./components/IstoricLunar";
import generalIcon from "./assets/situatie_generala.png";
import plannerIcon from "./assets/planner.png";

function App() {
  const [tab, setTab] = useState("main");

  useEffect(() => {
    const storedTab = localStorage.getItem("activeTab");
    if (storedTab) {
      setTab(storedTab);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("activeTab", tab);
    const titluri = {
      main: "Situație Generală",
      cheltuieli: "Cheltuieli lunare",
      credits: "Credite",
      goals: "Obiective",
      istoric: "Istoric",
    };
    document.title = `WealthWay – ${titluri[tab] || "Planner Financiar"}`;
  }, [tab]);

  return (
    <div style={styles.container}>
      {/* Titlu cu imagine planner */}
      <h1 style={styles.title}>
        <img
          src={plannerIcon}
          alt="Planner Logo"
          style={{ height: "36px", verticalAlign: "middle", marginRight: "10px" }}
        />
        WealthWay – Planner Financiar
      </h1>

      {/* Bara de navigare */}
      <div style={styles.navbar}>
        <NavButton
          label={
            <span>
              <img
                src={generalIcon}
                alt="Situație"
                style={{ height: "20px", verticalAlign: "middle", marginRight: "5px" }}
              />
              Situație Generală
            </span>
          }
          active={tab === "main"}
          onClick={() => setTab("main")}
        />
        <NavButton
          label="📊 Cheltuieli lunare"
          active={tab === "cheltuieli"}
          onClick={() => setTab("cheltuieli")}
        />
        <NavButton
          label="💳 Credite"
          active={tab === "credits"}
          onClick={() => setTab("credits")}
        />
        <NavButton
          label="🥅 Obiective"
          active={tab === "goals"}
          onClick={() => setTab("goals")}
        />
        <NavButton
          label="📅 Istoric"
          active={tab === "istoric"}
          onClick={() => setTab("istoric")}
        />
      </div>

      {/* Conținutul activ */}
      <div>
        {tab === "main" && <MainOverview />}
        {tab === "cheltuieli" && <CheltuieliLunare />}
        {tab === "credits" && <CreditList />}
        {tab === "goals" && <GoalList />}
        {tab === "istoric" && <IstoricLunar />}
      </div>
    </div>
  );
}

function NavButton({ label, active, onClick }) {
  return (
    <button onClick={onClick} style={{ ...styles.button, ...(active ? styles.active : {}) }}>
      {label}
    </button>
  );
}

const styles = {
  container: {
    padding: "1rem",
    fontFamily: "Arial, sans-serif",
    maxWidth: "900px",
    margin: "0 auto",
  },
  title: {
    textAlign: "center",
    marginBottom: "2rem",
    fontSize: "1.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
  },
  navbar: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "0.5rem",
    marginBottom: "2rem",
  },
  button: {
    padding: "0.6rem 1rem",
    borderRadius: "10px",
    border: "1px solid #ccc",
    backgroundColor: "#f8f9fa",
    cursor: "pointer",
    fontSize: "1rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  active: {
    backgroundColor: "#e6ccff",
    fontWeight: "bold",
    border: "2px solid #6a0dad",
  },
};

export default App;
