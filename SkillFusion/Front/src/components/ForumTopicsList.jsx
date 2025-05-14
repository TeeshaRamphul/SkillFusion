import React, { useState, useEffect} from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Link } from "react-router-dom";

export default function ForumTopicsList() {

  // Récupération des données utilisateur 
const [topics, setTopics] = useState([]);
const [error, setError] = useState(null);

useEffect(() => {
  const fetchTopics = async () => {
    try {
      const response = await fetch("http://localhost:3000/forum",{
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
      });

      if (!response.ok) {
        throw new Error("Impossible de charger les questions.");
      }

      const data = await response.json();
      setTopics(data.forums);
    } catch (err) {
      console.error(" Erreur de récupération :", err);
      setError(err.message);
    }
  };
  
  fetchTopics();
}, []);

  return (
    <>
      <Header />
      <main>
      <section className="head-button">
          <Link to="/forum-new-discussion">
            <button className="main-button">
            Créer un nouveau sujet
            </button>
          </Link>
        </section>
        <section className="forum-banner head-banner">
          <h2>Nos sujets</h2>
        </section>

        <section className="list-category">       
          {topics.map((topic) => (
            <Link
            to={`/forum/${topic.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
            >
            <section className="forum-box category-box" key={topic.id}>
              <div className="category-box__desc">
                <h4>{topic.title}</h4>
                <p>{topic.text}</p>
              </div>
            </section>
            </Link>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}