// Import der React-Bibliothek
import React from "react";

// Import der globalen CSS-Datei für die Anwendung
import "./App.css";

// Import von ReactDOM für das Rendern der React-App im Browser
import ReactDOM from "react-dom/client";

// Import der Hauptkomponente der Anwendung
import App from "./App.tsx";

// Zugriff auf das HTML-Element mit der ID "root"
const container = document.getElementById("root");

// Überprüfung, ob das Root-Element existiert
// Falls nicht, wird ein Fehler geworfen
if (!container) {
  throw new Error("Root-Element wurde nicht gefunden");
}

// Erstellung der React-Root (neue React 18 API)
const root = ReactDOM.createRoot(container);

// Rendern der Anwendung im StrictMode
// StrictMode hilft, potenzielle Probleme im Code frühzeitig zu erkennen
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
