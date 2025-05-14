import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import DetailContainer from "../components/DetailContainer.jsx";
import LessonContainer from "../components/LessonContainer.jsx";

export default function LessonDetail() {
  const { id } = useParams(); // récupère l'ID dans l'URL
  const [lesson, setLesson] = useState(null);
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/lesson/${id}`)
      .then((response) => response.json())
      .then((data) => setLesson(data))
      .catch((error) => console.error("Erreur API:", error));

    // Récupère tous les cours
    fetch("http://localhost:3000/lessons")
      .then((res) => res.json())
      .then((data) => setLessons(data));

      window.scrollTo(0, 0); // revient en haut quand on change de leçon
  }, [id]);

  if (!lesson) {
    return <p>Chargement...</p>;
  }

  // Filtrer les suggestions

  const suggestions = lessons
    .filter((l) => l.category?.name === lesson.category?.name && l.name !== lesson.name)
    .slice(0, 2);

  return (
    <>
      <Header />
      <main>
        <DetailContainer lesson={lesson} key={lesson.id} />
        <section>
          <h2>Suggestion de cours :</h2>
          <article className="lessons">
            {suggestions.map((suggestion) => (
              <LessonContainer key={suggestion.id} lesson={suggestion} />
            ))}
          </article>
        </section>
      </main>
      <Footer />
    </>
  );
}
