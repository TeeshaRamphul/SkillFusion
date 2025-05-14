import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function NewLesson() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/categories")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors du chargement des catégories");
        }
        return response.json();
      })
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const cat = categories?.categories || categories || [];
  
  return (
    <>
      <Header />
      <main>
        <section className="head-banner">
          <h2>Créer un cours</h2>
        </section>
        <section className="lessons">
          <form>
            <div className="form">
              <label htmlFor="category">Catégorie :</label>
              {error && <div style={{ color: "red" }}>Erreur : {error}</div>}
              <select className="search-bar input-bar" id="category" disabled={loading || !!error}>
                <option value="">--Choisissez votre catégorie--</option>
                {!loading && !error && cat.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form">
              <label htmlFor="title">Titre :</label>
              <input className="search-bar input-bar" type="text" id="title" placeholder="Titre du cours" />
            </div>
            <div className="form">
              <label htmlFor="resul_img">Image du résultat :</label>
              <input className="search-bar input-bar" type="text" id="resul_img" placeholder="URL de l'image" />
            </div>
            <div className="form">
              <label htmlFor="lesson-desc">Description :</label>
              <textarea id="lesson-desc" placeholder="Description du cours"></textarea>
            </div>
            <div className="form">
              <label htmlFor="material">Matériel :</label>
              <input className="search-bar input-bar" type="text" id="material" placeholder="Outil, matériaux, etc." />
              <div className="add-button">
                <button className="mini-button" type="button">Ajouter un matériel</button>
              </div>
            </div>
            <div className="form">
              <label htmlFor="step-title">Etape 1 :</label>
              <input className="search-bar input-bar" type="text" id="step-title" placeholder="Titre de l'étape" />
            </div>
            <div className="form">
              <label htmlFor="step-desc">Description :</label>
              <textarea id="step-desc" placeholder="Description de l'étape"></textarea>
            </div>
            <div className="form">
              <label htmlFor="step-media">Média éventuel :</label>
              <input className="search-bar input-bar" type="text" id="step-media" placeholder="URL de l'image ou de la vidéo" />
              <div className="add-button">
                <button className="mini-button" type="button">Ajouter une étape</button>
              </div>
            </div>
            <section className="see-more">
              <button type="submit" className="main-button">Envoyer</button>
            </section>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
}