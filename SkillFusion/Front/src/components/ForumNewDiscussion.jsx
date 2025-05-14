import React from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function ForumNewDiscussion() {
  return (
    <>
      <Header />
      <main>
  <section className="head-banner">
    <h2>Nouveau sujet</h2>
  </section>
  <section className="lessons">
    <form action="#" method="#">
      <div className="form">
        <label htmlFor="title">Sujet :</label>
        <input
          className="search-bar input-bar"
          type="text"
          id="title"
          placeholder="Titre du sujet"
        />
      </div>

      <div className="form">
        <label htmlFor="new-discussion">Message :</label>
        <textarea
          name="new-discussion"
          id="new-discussion"
          placeholder="Message"
        ></textarea>
      </div>

      <div className="see-more">
        <button type="submit" className="main-button">
          Envoyer
        </button>
      </div>
    </form>
  </section>
</main>
      <Footer />
    </>
  );
}