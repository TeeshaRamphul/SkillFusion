import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LessonContainer from "../components/LessonContainer";


export default function CategoryPage() {
  const { id } = useParams();   // Récupère l'ID de la catégorie
  const [lessons, setLessons] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryLessons = async () => {
      try {
        const res = await fetch(`http://localhost:3000/categories/${id}/lessons`);
        const data = await res.json();
        
        if (data.lessons) {
          setLessons(data.lessons);
          setCategoryName(data.categoryName || "Nom de la catégorie");
        }
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors du chargement des cours de la catégorie :", error);
        setLoading(false);
      }
    };

    fetchCategoryLessons();
  }, [id]);

  return (
    <>
      <Header />
      <main>
        <section className="home__articles">
          <h2>{loading ? "Chargement..." : categoryName}</h2>
          <article className="lessons">
            {loading && <p>Chargement des cours...</p>}
            {lessons.length > 0 ? (
              lessons.map((lesson) => <LessonContainer key={lesson.id} lesson={lesson} categoryName={categoryName} />)
            ) : (
              <p>Aucun cours disponible pour cette catégorie.</p>
            )}
          </article>
        </section>
      </main>
      <Footer />
    </>
  );
}