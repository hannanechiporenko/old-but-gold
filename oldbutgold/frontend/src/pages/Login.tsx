import { useState } from "react";
import axios from "axios";
import { LoginResponse } from "../types/User";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {

  // Zustand für Benutzername und Passwort
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Zustand zum Ein- und Ausblenden des Passworts
  const [showPass, setShowPass] = useState(false);

  // Zustand für Fehlermeldungen
  const [error, setError] = useState("");

  // Hook zur Navigation nach erfolgreichem Login
  const navigate = useNavigate();

  // Behandelt das Absenden des Login-Formulars
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Senden der Login-Daten an das Backend
      const { data } = await axios.post<LoginResponse>(
        "http://localhost/oldbutgold/backend/login.php",
        {
          username,
          password,
        }
      );

      // Erfolgreicher Login
      if (data.status === "success") {

        // Benutzer-ID im localStorage speichern
        localStorage.setItem("userId", String(data.userId));

        // Informiert andere Komponenten über den Login-Status
        window.dispatchEvent(new Event("storage"));

        // Weiterleitung zur Account-Seite
        navigate("/account");
      } 
      // Fehlermeldung vom Backend anzeigen
      else {
        setError(data.message || "Login failed");
      }
    } 
    // Allgemeiner Fehler (z. B. Netzwerkproblem)
    catch {
      setError("An error occurred during login");
    }
  };

  return (
    <main>
      <div className="registration-container">

        {/* ---------- LOGIN-BEREICH ---------- */}
        <h1>Login</h1>

        {/* Link zur Registrierungsseite */}
        <p>
          Don't have an account yet?
          <Link to="/register" className="red-color">Register</Link>
        </p>

        {/* ---------- LOGIN-FORMULAR ---------- */}
        <form onSubmit={handleLogin} className="form-login">

          {/* Benutzername */}
          <label htmlFor="userName">User Name</label><br />
          <input
            placeholder="SofiiaYesakova2004"
            type="text"
            id="userName"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            name="email"
            required
          /><br />

          {/* Passwort */}
          <label htmlFor="password">Password</label><br />
          <input
            type={showPass ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            id="password"
            name="password"
            required
          /><br />

          {/* Button zum Anzeigen / Verbergen des Passworts */}
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            className="visibility"
          >
            {showPass ? (
              <span className="material-symbols-outlined">visibility</span>
            ) : (
              <span className="material-symbols-outlined">visibility_off</span>
            )}
            {showPass ? "Hide Password" : "Show Password"}
          </button>

          {/* Anzeige von Fehlermeldungen */}
          {error && <p className="error-mess">{error}</p>}

          {/* Login-Button */}
          <button className="register-btn" type="submit">
            Log In
          </button>

        </form>
      </div>
    </main>
  );
}
