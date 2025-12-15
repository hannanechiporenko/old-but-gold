import React, { useEffect, useState } from "react";
import { Product, Category, Condition } from "../types/User";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Catalog() {

  // Basis-URL für alle Backend-API-Endpunkte
  const API_URL = "http://localhost/oldbutgold/backend";

  // Zustände für Produkte, Kategorien und Zustände (Condition)
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [conditions, setConditions] = useState<Condition[]>([]);

  // Zustände für Such- und Filterparameter
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedConditions, setSelectedConditions] = useState<number[]>([]);
  const [sort, setSort] = useState("newest");

  // Hook zur Navigation auf andere Seiten
  const navigate = useNavigate();

  // Lädt Kategorien und Zustände einmal beim ersten Rendern
  useEffect(() => {
    axios.get(`${API_URL}/get_categories.php`).then(res => {
      if (Array.isArray(res.data)) setCategories(res.data);
    });

    axios.get(`${API_URL}/get_condition.php`).then(res => {
      if (Array.isArray(res.data)) setConditions(res.data);
    });
  }, []);

  // Lädt Produkte unter Berücksichtigung aller Filter- und Suchparameter
  const loadProducts = () => {

    // FormData wird verwendet, um Filterdaten an das Backend zu senden
    const fd = new FormData();
    fd.append("search", search);
    fd.append("minPrice", minPrice);
    fd.append("maxPrice", maxPrice);

    // Mehrfachauswahl für Kategorien
    selectedCategories.forEach(cat =>
      fd.append("categories[]", cat.toString())
    );

    // Mehrfachauswahl für Zustände
    selectedConditions.forEach(cond =>
      fd.append("conditions[]", cond.toString())
    );

    // Sortieroption
    fd.append("sort", sort);

    axios
      .post(`${API_URL}/get_products.php`, fd)
      .then(res => {
        if (Array.isArray(res.data)) setProducts(res.data);
        else setProducts([]);
      })
      .catch(err => {
        console.error("Products fetch error:", err);
        setProducts([]);
      });
  };

  // Lädt beim ersten Seitenaufruf alle Produkte ohne Filter
  useEffect(() => {
    loadProducts();
  }, []);

  // Fügt eine Kategorie zum Filter hinzu oder entfernt sie
  const toggleCategory = (id: number) => {
    setSelectedCategories(prev =>
      prev.includes(id)
        ? prev.filter(c => c !== id)
        : [...prev, id]
    );
  };

  // Fügt einen Zustand (Condition) zum Filter hinzu oder entfernt ihn
  const toggleCondition = (id: number) => {
    setSelectedConditions(prev =>
      prev.includes(id)
        ? prev.filter(c => c !== id)
        : [...prev, id]
    );
  };

  // Navigation zur Detailseite eines Produkts
  const openProduct = (id: number) => {
    navigate(`/product/${id}`);
  };

  // Setzt alle Filter auf die Standardwerte zurück
  const resetFilters = () => {
    setSearch("");
    setMinPrice("");
    setMaxPrice("");
    setSelectedCategories([]);
    setSelectedConditions([]);
    setSort("newest");
  };

  return (
    <main className="home-page">

      {/* ---------- SUCHLEISTE ---------- */}
      <div className="search-form">
        <input
          className="search-input"
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        {/* Startet die Produktsuche */}
        <button className="search-button" onClick={loadProducts}>
          <span className="material-symbols-outlined">search</span>
        </button>
      </div>

      <div className="content">

        {/* ---------- FILTERBEREICH ---------- */}
        <aside className="filters">

          {/* Preisfilter */}
          <div className="filter">
            <h3>Price</h3>
            <label>Min:</label>
            <input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={e => setMinPrice(e.target.value)}
            />

            <label>Max:</label>
            <input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={e => setMaxPrice(e.target.value)}
            />
          </div>

          {/* Kategorienfilter */}
          <div className="filter">
            <h3>Category</h3>
            {categories.map(cat => (
              <label key={cat.id}>
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat.id)}
                  onChange={() => toggleCategory(cat.id)}
                />
                {cat.name}
              </label>
            ))}
          </div>

          {/* Zustandsfilter */}
          <div className="filter">
            <h3>Condition</h3>
            {conditions.map(cond => (
              <label key={cond.id}>
                <input
                  type="checkbox"
                  checked={selectedConditions.includes(cond.id)}
                  onChange={() => toggleCondition(cond.id)}
                />
                {cond.name}
              </label>
            ))}
          </div>

          {/* Sortieroptionen */}
          <div className="filter">
            <h3>Sort</h3>
            <select value={sort} onChange={e => setSort(e.target.value)}>
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="az">A–Z</option>
              <option value="za">Z–A</option>
            </select>
          </div>

          {/* Filter anwenden */}
          <button className="filters-btn" onClick={loadProducts}>
            Apply Filters
          </button>

          {/* Filter zurücksetzen */}
          <button className="reset-btn" onClick={resetFilters}>
            Reset filters
          </button>
        </aside>

        {/* ---------- PRODUKTLISTE ---------- */}
        <section className="product-list">
          {products.length === 0 ? (
            <p>No products found.</p>
          ) : (
            products.map(p => (
              <div
                key={p.id}
                className="product-card"
                onClick={() => openProduct(p.id)}
              >

                {/* Favoriten-Button (nur UI, ohne Backend) */}
                <button
                  className="favorite-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.currentTarget.classList.toggle("active");
                  }}
                >
                  <span className="material-symbols-outlined">favorite</span>
                </button>

                {/* Produktbild */}
                {p.images.length > 0 ? (
                  <img
                    src={`http://localhost/oldbutgold/${p.images[0]}`}
                    alt={p.title}
                  />
                ) : (
                  <img src="/no-image.png" alt="No image" />
                )}

                {/* Produktinformationen */}
                <h2>{p.title}</h2>
                <p className="desc">{p.description}</p>
                <p><b>Category:</b> {p.category_name}</p>
                <p><b>Condition:</b> {p.condition_name}</p>
                <p className="price">{p.price} €</p>
              </div>
            ))
          )}
        </section>

      </div>
    </main>
  );
}
