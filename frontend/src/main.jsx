import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { FinanceProvider } from "./context/FinanceContext";

// ✅ Înregistrare PWA
import { registerSW } from "virtual:pwa-register";

registerSW({
  onNeedRefresh() {
    if (confirm("Există o actualizare disponibilă. Reîncarcă?")) {
      window.location.reload();
    }
  },
  onOfflineReady() {
    console.log("🔌 Aplicația este disponibilă offline!");
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <FinanceProvider>
      <App />
    </FinanceProvider>
  </StrictMode>
);

