// Antwort vom Login-Endpunkt
export interface LoginResponse {
  // Status der Anfrage (z. B. "success" oder "error")
  status: string;

  // Optionale Fehlermeldung vom Server
  message?: string;

  // Benutzer-ID bei erfolgreichem Login
  userId?: number;
}

// Antwort vom Registrierungs-Endpunkt
export interface RegisterResponse {
  // Status der Registrierung
  status: string;

  // Optionale Meldung oder Fehlermeldung
  message?: string;
}

// Repräsentiert einen Benutzer
export interface User {
  // Eindeutige Benutzer-ID
  id: number;

  // Benutzername
  username: string;

  // Registrierungsdatum (als String vom Backend)
  created_at: string;
}

// Kategorie eines Produkts
export interface Category {
  // Kategorie-ID
  id: number;

  // Name der Kategorie
  name: string;
}

// Zustand / Zustand des Produkts (z. B. neu, gebraucht)
export interface Condition {
  // Zustands-ID
  id: number;

  // Bezeichnung des Zustands
  name: string;
}

// Produktmodell für den Katalog und Produktseiten
export interface Product {
  // Produkt-ID
  id: number;

  // Titel des Produkts
  title: string;

  // Beschreibung des Produkts
  description: string;

  // Preis des Produkts
  price: number;

  // ID der zugehörigen Kategorie
  category_id: number;

  // Name der Kategorie (optional, z. B. bei JOIN-Abfragen)
  category_name?: string;

  // ID des Produktzustands
  condition_id: number;

  // Name des Zustands (optional, z. B. bei JOIN-Abfragen)
  condition_name?: string;

  // Liste der Bildpfade des Produkts
  images: string[];
}
