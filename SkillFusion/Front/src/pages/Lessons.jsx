import LessonContainer from "../components/LessonContainer.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { useEffect, useState } from "react";

export default function Lessons() {
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/lessons")
      .then((response) => response.json())
      .then((data) => setLessons(data))
      .catch((error) => console.error("Erreur API:", error));
  }, []);

  return (
    <>
      <Header />
      <main>
        <section className="home__articles">
          
          <h2>Nos cours</h2>

          <article className="lessons">
            {lessons.map((lesson) => (
              <LessonContainer key={lesson.id} lesson={lesson} />
            ))}
          </article>
        </section>
      </main>

      <Footer />
    </>
  );
}
