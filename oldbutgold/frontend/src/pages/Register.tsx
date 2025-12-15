import { useState } from "react";
import axios from "axios";
import { RegisterResponse } from "../types/User";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {

  // Zustände für Formularfelder
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeat, setRepeat] = useState("");

  // Zustand für Fehlermeldungen
  const [error, setError] = useState("");

  // Hook für Navigation nach erfolgreicher Registrierung
  const navigate = useNavigate();

  /*
  // (Optional) Passwort-Validierung – aktuell auskommentiert
  // Prüft Groß-/Kleinbuchstaben, Zahlen, Sonderzeichen und Mindestlänge
  const passwordValid = (p: string) => {
    return (
      /[A-Z]/.test(p) &&
      /[a-z]/.test(p) &&
      /[0-9]/.test(p) &&
      /[!@#$%^&*]/.test(p) &&
      p.length >= 8
    );
  };
  */

  // Wird beim Absenden des Registrierungsformulars ausgeführt
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prüft, ob beide Passwörter übereinstimmen
    if (password !== repeat) {
      return setError("Passwords do not match");
    }

    // (Optional) Passwortregeln prüfen
    // if (!passwordValid(password)) {
    //   return setError(
    //     "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character"
    //   );
    // }

    // Registrierungsanfrage an das Backend senden
    const { data } = await axios.post<RegisterResponse>(
      "http://localhost/oldbutgold/backend/register.php",
      { username, email, password }
    );

    // Bei Erfolg zur Login-Seite weiterleiten
    if (data.status === "success") {
      navigate("/login");
    } else {
      setError(data.message || "Registration failed");
    }
  };

  return (
    <main>
      <div className="registration-container">
        <h1>Register</h1>

        {/* Link zur Login-Seite */}
        <p>
          Already have an account?
          <Link to="/login" className="red-color">Login</Link>
        </p>

        {/* Registrierungsformular */}
        <form onSubmit={handleRegister} className="form-login">

          {/* Benutzername */}
          <label htmlFor="username">
            User Name<span className="red-color">*</span>
          </label><br />
          <input
            onChange={(e) => setUsername(e.target.value)}
            placeholder="John Doe"
            type="text"
            id="username"
            name="username"
            required
          /><br />

          {/* E-Mail-Adresse */}
          <label htmlFor="email">
            Email<span className="red-color">*</span>
          </label><br />
          <input
            onChange={(e) => setEmail(e.target.value)}
            placeholder="buyandsell@gmail.com"
            type="email"
            id="email"
            name="email"
            required
          /><br />

          {/* Passwort */}
          <label htmlFor="password">
            Password<span className="red-color">*</span>
          </label><br />
          <input
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            type="password"
            id="password"
            name="password"
            required
          /><br />

          {/* Hinweise zu Passwortanforderungen */}
          <ul className="password-hints">
            <li>Your password must contain:</li>
            <li>at least 8 characters</li>
            <li>at least one uppercase letter</li>
            <li>at least one lowercase letter</li>
            <li>at least one number</li>
            <li>at least one special character (e.g. ! @ # $ %)</li>
          </ul>

          {/* Passwort bestätigen */}
          <label htmlFor="confirm-password">
            Confirm Password<span className="red-color">*</span>
          </label><br />
          <input
            onChange={(e) => setRepeat(e.target.value)}
            placeholder="********"
            type="password"
            id="confirm-password"
            name="password"
            required
          /><br />

          {/* Fehlermeldung anzeigen */}
          {error && <p className="error-mess">{error}</p>}

          {/* Absenden */}
          <button className="register-btn" type="submit">
            Register
          </button>
        </form>
      </div>
    </main>
  );
}
