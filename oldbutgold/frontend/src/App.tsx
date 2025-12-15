// Import der Routing-Komponenten für die Navigation
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import der Seiten des Projekts
import Home from "./pages/Home.tsx";
import Catalog from "./pages/Catalog.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import Account from "./pages/Account.tsx";
import ProductPage from "./pages/ProductPage.tsx";
import CartPage from "./pages/CartPage.tsx";

// Import der gemeinsamen Layout-Komponenten
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";

// Hauptkomponente der React-Anwendung
export default function App() {
  return (
    // BrowserRouter ermöglicht clientseitiges Routing ohne Seiten-Reload
    <BrowserRouter>

      {/* Wrapper für das gesamte Layout der Anwendung */}
      <div className="wrapper">

        {/* Kopfbereich der Website (auf allen Seiten sichtbar) */}
        <Header />

        {/* Definition aller Routen der Anwendung */}
        <Routes>

          {/* Startseite */}
          <Route path="/" element={<Home />} />

          {/* Katalogseite mit allen Produkten */}
          <Route path="/catalog" element={<Catalog />} />

          {/* Login-Seite */}
          <Route path="/login" element={<Login />} />

          {/* Registrierungsseite */}
          <Route path="/register" element={<Register />} />

          {/* Benutzerkonto-Seite */}
          <Route path="/account" element={<Account />} />

          {/* Produktdetailseite mit dynamischer Produkt-ID */}
          <Route path="/product/:id" element={<ProductPage />} />

          {/* Warenkorb-Seite */}
          <Route path="/cart" element={<CartPage />} />

        </Routes>

        {/* Fußbereich der Website (auf allen Seiten sichtbar) */}
        <Footer />

      </div>
    </BrowserRouter>
  );
}
