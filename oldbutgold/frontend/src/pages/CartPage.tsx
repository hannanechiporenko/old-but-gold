import { useEffect, useState } from "react";

export default function CartPage() {

  // Zustand für den Warenkorb (Daten werden aus dem localStorage geladen)
  const [cart, setCart] = useState<any[]>([]);

  // Lädt den Warenkorb einmal beim ersten Rendern aus dem localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(saved);
  }, []);

  // Aktiviert oder deaktiviert die Geschenkverpackung für ein Produkt
  const toggleGift = (id: number) => {
    const updated = cart.map(item =>
      item.id === id ? { ...item, isGift: !item.isGift } : item
    );

    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  // Entfernt ein Produkt aus dem Warenkorb
  const removeFromCart = (id: number) => {
    const updated = cart.filter(item => item.id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  // Berechnet den Gesamtpreis (inkl. Geschenkverpackung +4 €)
  const total = cart.reduce((sum, item) => {
    return sum + item.price + (item.isGift ? 4 : 0);
  }, 0);

  return (
    <main className="cart-page">
      <h1>Your Cart</h1>

      <div className="cart-wrapper">

        {/* LINKE SEITE — Liste der Warenkorbprodukte */}
        <div className="cart-items">
          {cart.map(item => (
            <div key={item.id} className="cart-item">

              {/* Produktbild */}
              <img src={item.image} width={80} />

              <div className="info">
                <p><b>{item.title}</b></p>
                <p>{item.price} €</p>

                {/* Checkbox für Geschenkoption */}
                <label>
                  <input
                    type="checkbox"
                    checked={item.isGift}
                    onChange={() => toggleGift(item.id)}
                  />
                  Als Geschenk markieren (+4 €)
                </label>

                {/* Hinweis, wenn Geschenkverpackung aktiv ist */}
                {item.isGift && (
                  <p className="gift-label">Geschenkverpackung hinzugefügt</p>
                )}
              </div>

              {/* ❌ Button zum Entfernen des Produkts */}
              <button
                className="delete-btn"
                onClick={() => removeFromCart(item.id)}
              >
                <span className="material-symbols-outlined">
                  close
                </span>
              </button>

            </div>
          ))}
        </div>

        {/* RECHTE SEITE — Bestellübersicht */}
        <div className="cart-summary">

          <h2>Order Summary</h2>

          {/* Übersicht über alle Produkte mit Einzelpreisen */}
          {cart.map(item => (
            <div key={item.id} className="summary-item">
              <p>{item.title}</p>
              <span>{item.price + (item.isGift ? 4 : 0)} €</span>
            </div>
          ))}

          <hr />

          {/* Gesamtbetrag */}
          <div className="total">
            <h3>Total:</h3>
            <p>{total} €</p>
          </div>

          {/* Weiter zur Kasse */}
          <button className="register-btn">
            Proceed to checkout
          </button>
        </div>

      </div>
    </main>
  );
}
