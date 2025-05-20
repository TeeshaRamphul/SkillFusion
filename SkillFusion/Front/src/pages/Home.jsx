import LessonContainer from "../components/LessonContainer.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { useEffect, useState } from "react";


export default function Home() {
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/lessons`)
      .then((response) => response.json())
      .then((data) => {        
        // S'adapte à la structure {lessons: [...]} ou directement [...]
        setLessons(Array.isArray(data) ? data : data.lessons || []);
      })
      .catch((error) => console.error("Erreur API:", error));
  }, []);

  // Tri par date descendante
  const latestLessons = [...lessons]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4);

  return (
    <>
      <Header />
      <main>
        <section className="introduction">
          <p>
            <strong>Bienvenue sur SkillFusion !</strong> Nous sommes une plateforme éducative dédiée à l'apprentissage du bricolage et au Do It Yourself (DIY). Elle a pour objectif de rendre le bricolage accessible à toutes et tous et à distance.
          </p>
          <p>
            Nous nous adressons aux amateurs de bricolage, aux professionnels du bâtiment, aux propriétaires de biens immobiliers, aux locataires, aux apprentis bricoleurs, etc... <strong>Tout le monde est le bienvenu ! </strong>
          </p>
          <p>
            En tant que visiteur, vous aurez accès à des cours de qualité, écrit par nos instructeurs qualifiés et expérimentés. Cependant, si vous vous inscrivez, vous aurez accès à des <strong>fonctionnalités exclusives </strong> telles que notre forum pour poser vos questions, la possibilité de gérer votre progression à l'aide de votre tableau de bord... <strong>A tout de suite !</strong>
          </p>

        </section>

        <section className="home__articles">
          <h2>Cours à la une</h2>
          <article className="lessons">
              <LessonContainer lessons={latestLessons} />
          </article>
        </section>
      </main>

      <Footer />
    </>
  );
}