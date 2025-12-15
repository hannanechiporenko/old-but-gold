import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductPage() {

  // Liest die Produkt-ID aus der URL (z. B. /product/5)
  const { id } = useParams();

  // Zustand für Produktdaten
  const [product, setProduct] = useState<any>(null);

  // Zustand für Produktbilder
  const [images, setImages] = useState<string[]>([]);

  // Zustand für Verkäuferinformationen
  const [seller, setSeller] = useState<any>(null);

  // Zustand für das aktuell ausgewählte Hauptbild
  const [mainImage, setMainImage] = useState<string>("");

  // Lädt Produktdaten, Bilder und Verkäuferinformationen beim Laden der Seite
  useEffect(() => {
    axios
      .post("http://localhost/oldbutgold/backend/get_product.php", { id })
      .then(res => {

        // Produktinformationen speichern
        setProduct(res.data.product);

        // Bilder speichern
        setImages(res.data.images);

        // Verkäufer speichern
        setSeller(res.data.seller);

        // Erstes Bild als Hauptbild setzen
        if (res.data.images.length > 0) {
          setMainImage(
            `http://localhost/oldbutgold/${res.data.images[0]}`
          );
        }
      });
  }, [id]);

  // Fügt das Produkt dem Warenkorb im localStorage hinzu
  const addToCart = () => {

    // Aktuellen Warenkorb aus dem localStorage lesen
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    // Neues Warenkorb-Objekt erstellen
    const item = {
      id: product.id,
      title: product.title,
      price: Number(product.price),
      image: images.length
        ? `http://localhost/oldbutgold/${images[0]}`
        : "/no-image.png",
      isGift: false
    };

    // Prüft, ob das Produkt bereits im Warenkorb ist
    const exists = cart.find((c: any) => c.id == product.id);

    if (!exists) {
      cart.push(item);
      localStorage.setItem("cart", JSON.stringify(cart));
      alert("Added to cart!");
    } else {
      alert("This item is already in your cart");
    }
  };

  // Ladeanzeige, solange die Produktdaten noch nicht verfügbar sind
  if (!product) return <p>Loading...</p>;

  return (
    <main className="product-page">

      {/* ---------- OBERER BEREICH: Galerie links, Infos rechts ---------- */}
      <div className="top-section">

        {/* Miniatur-Galerie der Produktbilder */}
        <div className="product-gallery">
          {images.length > 0 ? (
            images.map((img, i) => {
              const imgUrl = `http://localhost/oldbutgold/${img}`;
              return (
                <img
                  key={i}
                  src={imgUrl}
                  alt={`Thumb ${i}`}
                  className={mainImage === imgUrl ? "active" : ""}
                  onClick={() => setMainImage(imgUrl)}
                />
              );
            })
          ) : (
            <img src="/no-image.png" alt="No image" />
          )}
        </div>

        {/* Hauptbild des Produkts */}
        <div className="main-image">
          <img
            src={mainImage || "/no-image.png"}
            alt={product.title}
          />
        </div>

        {/* Zusammenfassung der Produktinformationen */}
        <div className="product-summary">

          <h1>{product.title}</h1>

          {/* Verkäuferinformationen */}
          {seller && (
            <div className="seller-block">
              <h3>Seller</h3>
              <p><b>Name:</b> {seller.username}</p>
              <p>
                <b>Joined:</b>{" "}
                {new Date(seller.created_at).toLocaleDateString()}
              </p>
            </div>
          )}

          {/* Produktdetails */}
          <p><b>Category:</b> {product.category_name}</p>
          <p><b>Condition:</b> {product.condition_name}</p>
          <p className="price">{product.price} €</p>

          {/* Button zum Hinzufügen in den Warenkorb */}
          <button className="add-to-cart" onClick={addToCart}>
            Add to cart
          </button>
        </div>
      </div>

      {/* ---------- PRODUKTBESCHREIBUNG ---------- */}
      <div className="product-description">
        <h2>Description</h2>
        <p>{product.description}</p>
      </div>

    </main>
  );
}
