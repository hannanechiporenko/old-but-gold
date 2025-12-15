// Import von Link und useNavigate aus React Router (Navigation innerhalb der App)
import { Link, useNavigate } from "react-router-dom";

// Import von React
import React from "react";

// Import der React Hooks (werden hier aktuell nicht verwendet)
import { useEffect, useState } from "react";

// Footer-Komponente der Anwendung
export default function Footer() {
  return (
    // Footer-Bereich der Website
    <footer>

      {/* Hauptcontainer des Footers */}
      <div className="footer-container">

        {/* Navigationslinks im Footer */}
        <ul className="footer-nav">
          <li><a>Home</a></li>
          <li><a>About Us</a></li>
          <li><a>Contact Us</a></li>
          <li><a>My Account</a></li>
          <li><a>Favorites</a></li>
        </ul>

        {/* Newsletter-Abonnement-Formular */}
        <div className="footer-subscribe-form">
          <form>

            {/* Beschriftung für das E-Mail-Eingabefeld */}
            <label htmlFor="subscribe-email">
              Subscribe to receive updates and special offers
            </label><br />

            {/* Eingabefeld für die E-Mail-Adresse */}
            <input
              id="subscribe-email"
              type="email"
              placeholder="Enter your email"
              required
            />

            {/* Button zum Absenden des Formulars */}
            <button type="submit">Subscribe</button>
          </form>
        </div>

        {/* Social-Media-Links */}
        <ul className="footer-socials">
          <li><a>Facebook</a></li>
          <li><a>Instagram</a></li>
          <li><a>Twitter (X)</a></li>
          <li><a>YouTube</a></li>
          <li><a>TikTok</a></li>
        </ul>
      </div>

      {/* Impressum- und Datenschutz-Bereich */}
      <div className="impressum">
        <div>
          <a href="#">Impressum</a> | <a href="#">Datenschutz</a>
        </div>

        {/* Trennlinie */}
        <span className="line"></span>

        {/* Copyright-Hinweis */}
        <p>© 2025 Buy & Sell. All rights reserved.</p>
      </div>

    </footer>
  );
}
