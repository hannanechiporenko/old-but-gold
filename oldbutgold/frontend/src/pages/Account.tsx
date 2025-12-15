import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";
import { User, Category, Condition, Product } from "../types/User.ts";
import axios from "axios";

export default function Account() {

  // Zustand für den aktuell eingeloggten Benutzer
  const [user, setUser] = useState<User | null>(null);

  // Zustände für Kategorien, Zustände (Condition) und Produkte des Benutzers
  const [categories, setCategories] = useState<Category[]>([]);
  const [conditions, setConditions] = useState<Condition[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  // Zustände für das Produktformular
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [conditionId, setConditionId] = useState("");
  const [images, setImages] = useState<FileList | null>(null);

  // ID des Produkts, das aktuell bearbeitet wird (Edit-Modus)
  const [editId, setEditId] = useState<number | null>(null);

  // Benutzer-ID aus dem localStorage
  const userId = localStorage.getItem("userId");

  // Navigation zwischen Seiten
  const navigate = useNavigate();

  // Wird beim ersten Rendern ausgeführt
  useEffect(() => {

    // Wenn kein Benutzer eingeloggt ist → Weiterleitung zur Login-Seite
    if (!userId) navigate("/login");

    // Benutzerdaten laden
    axios
      .post("http://localhost/oldbutgold/backend/get_user.php", { userId })
      .then(res => setUser(res.data));

    // Kategorien laden
    axios
      .get("http://localhost/oldbutgold/backend/get_categories.php")
      .then(res => setCategories(res.data));

    // Produktzustände (Condition) laden
    axios
      .get("http://localhost/oldbutgold/backend/get_condition.php")
      .then(res => setConditions(res.data));

    // Produkte des Benutzers laden
    loadProducts();
  }, []);

  // Lädt alle Produkte des eingeloggten Benutzers
  const loadProducts = () => {
    axios
      .post("http://localhost/oldbutgold/backend/get_user_products.php", { userId })
      .then(res => setProducts(res.data));
  };

  // Behandelt das Absenden des Formulars (Produkt hinzufügen oder bearbeiten)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // FormData für Datei-Upload (Bilder)
    const fd = new FormData();
    fd.append("userId", String(userId));
    fd.append("title", title);
    fd.append("description", desc);
    fd.append("price", price);
    fd.append("category_id", categoryId);
    fd.append("condition_id", conditionId);

    // Mehrere Bilder anhängen
    if (images) {
      Array.from(images).forEach(file => fd.append("images[]", file));
    }

    // Wenn editId existiert → Produkt aktualisieren
    if (editId) {
      fd.append("product_id", String(editId));
      await axios.post(
        "http://localhost/oldbutgold/backend/update_product.php",
        fd,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
    } 
    // Andernfalls neues Produkt hochladen
    else {
      await axios.post(
        "http://localhost/oldbutgold/backend/upload_product.php",
        fd,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
    }

    // Formular zurücksetzen
    setTitle("");
    setDesc("");
    setPrice("");
    setCategoryId("");
    setConditionId("");
    setImages(null);
    setEditId(null);

    // Produktliste neu laden
    loadProducts();
  };

  // Setzt das Formular in den Bearbeitungsmodus
  const handleEdit = (p: Product) => {
    setEditId(p.id);
    setTitle(p.title);
    setDesc(p.description);
    setPrice(String(p.price));
    setCategoryId(String(p.category_id));
    setConditionId(String(p.condition_id));
  };

  // Löscht ein Produkt
  const handleDelete = async (id: number) => {
    await axios.post(
      "http://localhost/oldbutgold/backend/delete_product.php",
      { id }
    );
    loadProducts();
  };

  // Logout-Funktion
  const logout = () => {
    localStorage.removeItem("userId");

    // Informiert andere Komponenten über den Logout
    window.dispatchEvent(new Event("storage"));

    navigate("/");
  };

  return (
    <main className="main-acc">
      <h1>My Account</h1>

      {/* ---------- BENUTZERINFORMATIONEN ---------- */}
      <div className="account-info-container">
        <div className="account-info">
          <div className="info">

            {/* Anzeige der Benutzerdaten */}
            {user && (
              <div className="info-left">
                <p className="name">
                  <b>{user.username}</b>
                </p>

                {/* Beispielhafte Sternebewertung */}
                <div className="stars">
                  <span className="material-symbols-outlined">kid_star</span>
                  <span className="material-symbols-outlined">kid_star</span>
                  <span className="material-symbols-outlined">kid_star</span>
                  <span className="material-symbols-outlined">kid_star</span>
                  <span className="material-symbols-outlined">kid_star</span>
                  <p>(234)</p>
                </div>

                {/* Registrierungsdatum */}
                <p>{new Date(user.created_at).toLocaleDateString()}</p>
              </div>
            )}

            {/* Logout-Button */}
            <div className="info-right">
              <button onClick={logout}>Log Out</button>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- PRODUKT HINZUFÜGEN / BEARBEITEN ---------- */}
      <div className="additem-container">
        <h2>{editId ? "Edit Item" : "Add New Item"}</h2>

        <form onSubmit={handleSubmit} className="additem-form" method="post">

          {/* Produktname */}
          <label htmlFor="product-name">Product Name:</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            id="product-name"
            required
            placeholder="Enter product name"
          />

          {/* Beschreibung */}
          <label htmlFor="product-description">Description:</label>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            id="product-description"
            required
            placeholder="Enter detailed description"
          />

          {/* Zustand */}
          <label htmlFor="product-condition">Condition:</label>
          <select
            value={conditionId}
            onChange={(e) => setConditionId(e.target.value)}
            id="product-condition"
            required
          >
            <option value="" disabled>Select condition</option>
            {conditions.map(c => (
              <option value={c.id} key={c.id}>{c.name}</option>
            ))}
          </select>

          {/* Kategorie */}
          <label htmlFor="product-category">Category:</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            id="product-category"
            required
          >
            <option value="" disabled>Select category</option>
            {categories.map(c => (
              <option value={c.id} key={c.id}>{c.name}</option>
            ))}
          </select>

          {/* Preis */}
          <label htmlFor="product-price">Price (Euro):</label>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
            min="0"
            step="0.01"
            required
            placeholder="Enter price"
          />

          {/* Bilder-Upload */}
          <label htmlFor="product-photos">Upload Photos (max 5):</label>
          <input
            onChange={(e) => setImages(e.target.files)}
            type="file"
            id="product-photos"
            accept="image/*"
            multiple
            required
          />
          <p>You can select up to 5 images.</p>

          <button type="submit">
            {editId ? "Update Item" : "Submit Product"}
          </button>
        </form>
      </div>

      {/* ---------- PRODUKTLISTE ---------- */}
      <div className="items-list">
        {products.map(p => (
          <div className="item" key={p.id}>

            {/* Erstes Produktbild */}
            {p.images.length > 0 && (
              <img
                src={`http://localhost/oldbutgold${p.images[0]}`}
                width={120}
              />
            )}

            {/* Produktinformationen */}
            <div className="item-info">
              <p><b>{p.title}</b></p>
              <p>{p.description}</p>
              <p><b>Condition:</b> {p.condition_name}</p>
              <p><b>Category:</b> {p.category_name}</p>
            </div>

            {/* Aktionen: Bearbeiten / Löschen */}
            <div className="item-info-right">
              <p>{p.price}</p>
              <div className="buttons">
                <button onClick={() => handleEdit(p)}>
                  <span className="material-symbols-outlined">edit</span>
                </button>
                <button onClick={() => handleDelete(p.id)}>
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
