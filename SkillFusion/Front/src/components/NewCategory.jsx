import React from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function NewCategory() {
  return (
    <>
      <Header />
      <main>
        <section className="head-banner">
          <h2>Nouvelle catégorie</h2>
        </section>
        <section className="lessons">
          <form action="#" method="#">
            <div className="form">
              <label htmlFor="name">Nom de la catégorie :</label>
              <input
                className="search-bar input-bar"
                type="text"
                id="name"
                placeholder="Catégorie"
              />
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