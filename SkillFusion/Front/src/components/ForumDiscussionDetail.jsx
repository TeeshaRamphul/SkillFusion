import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useAuth } from "../services/api";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function ForumDiscussionDetail() {
  const { id } = useParams(); // récupère l'ID de la question depuis l'URL
  const {user} = useAuth();
  const [question, setQuestion] = useState(null);
  const [responseText, setResponseText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestion = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(`http://localhost:3000/forum/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Erreur réseau ou autorisation");
        }

        const data = await response.json();
        setQuestion(data.forums);
      } catch (error) {
        toast.error("Impossible de charger la question !");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [id, user]);

  if (loading) return <p>Chargement...</p>;
  if (!question) return <p>Aucune donnée trouvée.</p>;

  // FONCTION POUR ENVOYER UNE REPONSE
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!responseText.trim()) return; // éviter les messages vides

    try {
      const res = await fetch(`http://localhost:3000/forum/${id}/responses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text: responseText }),
      });

    if (!res.ok) throw new Error("Erreur lors de l'envoi");

    // Message de succès
    setResponseText(""); // reset le champ
    toast.success("Réponse envoyée !");

    // Re-fetch de la discussion complète avec toutes les réponses à jour
    const updatedRes = await fetch(`http://localhost:3000/forum/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!updatedRes.ok) throw new Error("Erreur lors du rechargement");

    const updatedData = await updatedRes.json();
    setQuestion(updatedData.forums); // on remplace les données par celles à jour

    } catch (error) {
      console.error(error);
      toast.error("Impossible d'envoyer la réponse.");
    }
  };

  return (
    <>
      <Header />
      <main>
        <section className="head-button">
          <Link to="/forum">
            <button className="main-button">
                Retour à la liste des sujets
            </button>
          </Link>
        </section>
        <section className="head-banner">
          <section className="category-box">
            <div className="category-box__title">
              <p className="forum-post__datas">
                Créé par : {question.users?.pseudo || "Utilisateur inconnu"}
              </p>
              <p className="forum-post__datas">
                Le : {new Date(question.created_at).toLocaleDateString()}
              </p>
            </div>
            <div className="category-box__desc">
            <h4>{question.text}</h4>
            </div>
          </section>
        </section>

        <section className="list-category">
          {question.responses.map((response) => (
            <section className="category-box" key={response.id}>
              <div className="category-box__title">
                <p className="forum-post__datas">
                  Posté par : {response.users?.pseudo || "Utilisateur inconnu"}
                </p>
                <p className="forum-post__datas">
                  Le : {new Date(response.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="category-box__desc">
                <p>{response.text}</p>
              </div>
            </section>
          ))}

          {/* FORMULAIRE POUR ENVOYER UNE REPONSE */}
          <section className="forum-post__form">
            <form onSubmit={handleSubmit}>
              <div className="forum-post__textarea">
                <textarea
                  id="response"
                  placeholder="Votre message"
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  required
                />
              </div>
              <div className="forum-post__button">
                <button className="secondary-button" type="submit">
                  Envoyer
                </button>
              </div>
            </form>
          </section>
        </section>
      </main>
      <Footer />
    </>
  );
}
