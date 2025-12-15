import React, { useState } from "react";
import aboutImg from "../assets/about.jpg";
import Developer from "../assets/cat-2.jpg";
import { useNavigate, Link } from "react-router-dom";

export default function HomePage() {
  // Zustand für das Kontaktformular (Name, E-Mail, Nachricht)
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Zustand zum Öffnen/Schließen der FAQ-Elemente
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  // Aktualisiert die Formularfelder bei Benutzereingabe
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Behandelt das Absenden des Kontaktformulars
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Your message has been sent!");
    setForm({ name: "", email: "", message: "" });
  };

  // Öffnet oder schließt ein FAQ-Element
  const toggleFAQ = (index: number) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

  return (
    <main className="homepage">

      {/* ---------- HERO-BANNER ---------- */}
      <section className="hero">
        <h1>Welcome to OldButGold</h1>
        <p>Your trusted platform for buying and selling unique vintage items.</p>
        <Link to="/catalog">
          <button className="hero-btn">Start Exploring</button>
        </Link>
      </section>

      {/* ---------- ÜBER UNS ---------- */}
      <section className="about-section">
        <h2 className="title">About Our Project</h2>

        <div className="about-info">
          {/* Bild und Beschreibung des Projekts */}
          <img src={aboutImg} alt="About" />
          <p>
            <b>OldButGold</b> ist ein Marktplatz für Vintage-, Second-Hand- und
            seltene Artikel. Unser Ziel ist es, Dingen ein zweites Leben zu
            geben und Nutzern zu helfen, etwas Besonderes zu finden.
            Wir setzen auf moderne Technologien, sauberes Design und hohe
            Benutzerfreundlichkeit.
          </p>

          {/* Erklärung, wie die Plattform funktioniert */}
          <section className="how-it-works">
            <h2>How It Works</h2>

            <div className="steps">
              <div className="step">
                <h3>1. Create an Account</h3>
                <p>Registriere dich in wenigen Klicks.</p>
              </div>

              <div className="step">
                <h3>2. Upload Your Items</h3>
                <p>Füge Fotos hinzu, setze einen Preis und beschreibe dein Produkt.</p>
              </div>

              <div className="step">
                <h3>3. Buy & Sell Safely</h3>
                <p>Sichere Kommunikation und zuverlässige Transaktionen.</p>
              </div>
            </div>
          </section>
        </div>
      </section>

      {/* ---------- VORTEILE ---------- */}
      <section className="benefits">
        <h2 className="title">Why Choose Us?</h2>

        <div className="benefit-list">
          <div className="benefit">
            <h3>Verified Sellers</h3>
            <p>Überprüfte Nutzer für sichere Kommunikation.</p>
          </div>

          <div className="benefit">
            <h3>Eco-Friendly</h3>
            <p>Second-Hand-Käufe reduzieren Abfall und schonen die Umwelt.</p>
          </div>

          <div className="benefit">
            <h3>Large Item Variety</h3>
            <p>Große Auswahl von Kleidung bis zu Antiquitäten.</p>
          </div>

          <div className="benefit">
            <h3>Advanced Search</h3>
            <p>Filter helfen, schnell passende Produkte zu finden.</p>
          </div>
        </div>
      </section>

      {/* ---------- SICHERHEIT ---------- */}
      <section className="security">
        <h2 className="title">Safety & Protection</h2>
        <p>
          Deine Sicherheit hat für uns höchste Priorität. Unsere Systeme erkennen
          Betrug und schützen deine Daten mit moderner Verschlüsselung.
        </p>
        <p>
          Bitte kommuniziere ausschließlich über unsere Plattform.
        </p>
      </section>

      {/* ---------- BEWERTUNGEN ---------- */}
      <section className="reviews">
        <h2 className="title">User Reviews</h2>

        <div className="review-list">
          <div className="review">
            <p>“Great platform! Found a vintage camera in perfect condition.”</p>
            <span>— Alex</span>
          </div>

          <div className="review">
            <p>“Easy to use and safe. I sold 5 items in one week!”</p>
            <span>— Maria</span>
          </div>

          <div className="review">
            <p>“Amazing atmosphere and friendly sellers.”</p>
            <span>— Daniel</span>
          </div>
        </div>
      </section>

      {/* ---------- UNSER TEAM ---------- */}
      <section className="team-section">
        <h2 className="title">Our Developers</h2>

        <div className="team-list">
          {/* Entwicklerkarte */}
          <div className="team-card">
            <img src={Developer} alt="Developer 1" />
            <h3>Anna Nechiporenko</h3>
            <p>Frontend Developer — React, UI/UX, TypeScript</p>
          </div>

          <div className="team-card">
            <img src={Developer} alt="Developer 2" />
            <h3>Ihor Stoiko</h3>
            <p>Backend Developer — PHP, MySQL, API Architecture</p>
          </div>

          <div className="team-card">
            <img src={Developer} alt="Developer 3" />
            <h3>Sofiia Yesakova</h3>
            <p>Frontend Developer — React, UI/UX, TypeScript</p>
          </div>
        </div>
      </section>

      {/* ---------- KONTAKTFORMULAR ---------- */}
      <section className="feedback-section">
        <h2 className="title">Contact Us</h2>

        <form onSubmit={handleSubmit} className="feedback-form">
          {/* Namensfeld */}
          <label>
            Name:
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              required
            />
          </label>

          {/* E-Mail-Feld */}
          <label>
            Email:
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>

          {/* Nachrichtenfeld */}
          <label>
            Message:
            <textarea
              name="message"
              rows={4}
              value={form.message}
              onChange={handleChange}
              required
            />
          </label>

          <button type="submit">Send</button>
        </form>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="faq-section">
        <h2 className="title">FAQ</h2>

        {/* FAQ-Eintrag */}
        <div className="faq-item">
          <h3 onClick={() => toggleFAQ(0)}>How to register?</h3>
          {faqOpen === 0 && (
            <p>You can sign up by clicking “Create account“ in the header.</p>
          )}
        </div>

        <div className="faq-item">
          <h3 onClick={() => toggleFAQ(1)}>How do I add a product?</h3>
          {faqOpen === 1 && <p>Go to your profile and click “Add product”.</p>}
        </div>

        <div className="faq-item">
          <h3 onClick={() => toggleFAQ(2)}>How do I contact the seller?</h3>
          {faqOpen === 2 && (
            <p>You can message sellers directly from the product page.</p>
          )}
        </div>
      </section>
    </main>
  );
}
