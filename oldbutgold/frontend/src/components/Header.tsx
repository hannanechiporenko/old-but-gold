// Import von Link und useNavigate für Navigation innerhalb der React-App
import { Link, useNavigate } from "react-router-dom";

// Import von React
import React from "react";

// Import der React Hooks
import { useEffect, useState } from "react";

// Header-Komponente der Anwendung
export default function Header() {

  // Hook für programmatische Navigation
  const navigate = useNavigate();

  // Zustand, der speichert, ob der Benutzer eingeloggt ist
  const [isLogged, setIsLogged] = useState(false);

  // Effekt zur Überprüfung des Login-Status
  useEffect(() => {

    // Funktion prüft, ob eine userId im localStorage existiert
    const checkAuth = () => {
      setIsLogged(!!localStorage.getItem("userId"));
    };

    // Initiale Überprüfung beim Laden der Komponente
    checkAuth();

    // Listener reagiert auf Änderungen im localStorage (Login / Logout)
    window.addEventListener("storage", checkAuth);

    // Cleanup: Entfernt den Listener beim Unmount der Komponente
    return () => window.removeEventListener("storage", checkAuth);

  }, []);

  // Klick-Handler für das Account-Icon
  const handleAccountClick = () => {
    const user = localStorage.getItem("userId");

    // Wenn der Benutzer eingeloggt ist, zur Account-Seite navigieren
    if (user) navigate("/account");
    // Andernfalls zur Login-Seite weiterleiten
    else navigate("/login");
  };

  return (
    // Header-Bereich der Website
    <header>
      <nav>

        {/* Navigationscontainer */}
        <div className="nav-container">

          {/* Linker Bereich: Logo und Katalog-Link */}
          <div className="header-left">
            <Link to="/" className="logo">OLD BUT GOLD</Link>
            <Link to="/catalog">Catalog</Link>
          </div>

          {/* Rechter Bereich: Icons für Favoriten, Account und Warenkorb */}
          <ul className="nav-icons">

            {/* Favoriten-Icon (aktuell ohne Funktion) */}
            <li>
              <a>
                <span className="material-symbols-outlined">favorite</span>
              </a>
            </li>

            {/* Account-Button */}
            <li>
              <button className="nav-btns" onClick={handleAccountClick}>
                <span className="material-symbols-outlined">
                  account_circle
                </span>
              </button>
            </li>

            {/* Warenkorb-Link */}
            <li>
              <Link to="/cart" className="nav-btns">
                <span className="material-symbols-outlined">
                  shopping_cart
                </span>
              </Link>
            </li>

          </ul>
        </div>
      </nav>
    </header>
  );
}
