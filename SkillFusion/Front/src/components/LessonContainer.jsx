import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../services/api.jsx";
import { toast } from "react-toastify";

export default function LessonContainer({ lesson, categoryName }) {

  // Récupération des données utilisateur
  const {user} = useAuth();
  const [favorite, setFavorite] = useState([]);
  const [isProf, setIsProf] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);

    //Vérifie si le cours est en favoris
    useEffect(() => {
      if (user && user.favorite_lessons) {
        const found = user.favorite_lessons.find(
          (less) => less.id === parseInt(lesson.id)
        );
        setFavorite(!!found); // Convertit la valeur en booléen pour forcer la vérification de vérité
      }
      if (user && user.role_id===2) {setIsProf (true)}
      else {setIsProf(false)}

    }, [user, lesson]);

  const handleClick = async () => {
    if (!favorite) {
      await addFavorite();
      setFavorite(true); // ✅ mise à jour immédiate
      toast.success("Ajouté aux favoris !");
    } else {
      await deleteFavorite();
      setFavorite(false); // ✅ mise à jour immédiate
      toast.success("Retiré des favoris !");
    }
  };

  // Mise en favoris
  const addFavorite = async () => {
    try {
      const response = await fetch(`http://localhost:3000/lessons/${lesson.id}/favorite`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ user }),
    });
      if (!response.ok) {
         throw new Error("Erreur lors du chargement des favoris");
      }
    } catch (err) {
     (err.message);
    }
  }
  
    // Supprimer des favoris
    const deleteFavorite = async () => {
     try {
       const response = await fetch(`http://localhost:3000/lessons/${lesson.id}/favorite`,{
         method: "DELETE",
         headers: {
           "Content-Type": "application/json",
           Authorization: `Bearer ${localStorage.getItem("token")}`
         },
         body: JSON.stringify({ user }),
     });
       if (!response.ok) {
          throw new Error("Erreur lors du chargement des favoris");
        }
     } catch (err) {
       (err.message);
     }
   }
console.log(lesson);

  return (
    <>
      <div className="box-lesson">
        <div className="box-lesson__favorites">
          {/* Afficher le nom de la catégorie */}
          <h5 className="category-tag">{lesson.category?.name || categoryName}</h5>
          {/* Affiche les étoiles de favoris si l'utilisateur est connecté*/}
          {(user || !isProf)? 
            (
            <a onClick={handleClick} style={{ cursor: 'pointer' }}>
              <p>{favorite?("\u2605"):("\u2606")}</p>
            </a>
            ):(
            <p> </p>
            )
          }
          {/* Affiche les bontons de CRUD si l'utilisateur a les droits d'admin*/}
          {user ? 
            (
            <a onClick={handleClick} style={{ cursor: 'pointer' }}>
              <h4>{isAdmin ?(" "):("\ud83d\udcdd \ud83d\uddd1")}</h4>
            </a>
            ):(
            <p> </p>
            )
          }

        </div>
        <div className="box-lesson__title">
          <h4>{lesson.name}</h4>
        </div>
        <Link
          to={`/lesson/${lesson.id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div className="box-lesson__img">
            <img
              className="image-lesson"
              src={`/Images/Photos/${lesson.media}`}
              alt="Perceuse"
            />
          </div>
        </Link>
        <p>{lesson.text}</p>
      </div>
    </>
  );
}