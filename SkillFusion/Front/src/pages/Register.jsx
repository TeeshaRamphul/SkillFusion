import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [pseudo, setPseudo] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  // Fonction pour l'envoi du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Vérification des champs vides
    if (!pseudo || !mail || !password) {
      toast.error("Tous les champs sont obligatoires");
      return;
    }

    fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pseudo, mail, password }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erreur lors de l'inscription");
        }
        return res.json(); // On parse la réponse JSON
      })
      .then((data) => {
        console.log(data); // Affiche les données retournées par le serveur (succès de l'inscription)

        toast.success("Inscription réussie ! ✅");
        navigate("/login"); // Redirection
      })
      .catch((err) => {
        setErrorMessage(err.message); // Affiche l'erreur provenant de l'API
      });
  };
  return (
    <>
      <Header />
      <main>
        <section className="head-banner">
          <h2>Créer un compte</h2>
        </section>

        <section className="lessons">
          <form method="post" onSubmit={(e) => handleSubmit(e)}>
            <div className="form">
              <label htmlFor="pseudo">Pseudo :</label>
              <input
                className="search-bar input-bar"
                type="text"
                placeholder="Pseudo"
                name="pseudo"
                id="pseudo"
                value={pseudo}
                onChange={(e) => setPseudo(e.target.value)}
              />
            </div>
            <div className="form">
              <label htmlFor="mail">E-mail :</label>
              <input
                className="search-bar input-bar"
                type="email"
                placeholder="E-mail"
                name="mail"
                id="mail"
                value={mail}
                onChange={(e) => setMail(e.target.value)}
              />
            </div>
            <div className="form">
              <label htmlFor="password">Mot de passe :</label>
              <input
                className="search-bar input-bar"
                type="password"
                placeholder="Mot de passe"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}{" "}
            {/* Affiche l'erreur */}
            <section className="see-more">
              <div>
                <button type="submit" className="main-button">
                  S’inscrire
                </button>
              </div>
            </section>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
}

