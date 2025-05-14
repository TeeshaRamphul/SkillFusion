import { useEffect, useState } from "react";
import { useAuth } from "../services/api";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LessonContainer from "../components/LessonContainer.jsx";
import { Link } from "react-router-dom";


export default function Board() {
  const [userData, setUserData] = useState(null);
  const [usersData, setUsersData] = useState([]);

  const {user} = useAuth();
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetchAccount();
  }, []);
  
  useEffect(() => {
      fetchAllUsers();
  }, [userData]);
  

  //Fetch de l'utilisateur connecté
  const fetchAccount = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:3000/me`, { 
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error("Erreur réseau ou autorisation");
      }
      const data = await response.json();
      setUserData(data);
    } catch (err) {
      setError(err.message);
    }
  };

  //Fetch de tous les utilisateurs
  const fetchAllUsers = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:3000/user`, { 
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des utilisateurs");
      }
      const data = await response.json();
      setUsersData(data.allUsers);
    } catch (err) {
      setError(err.message);
      }
    };

  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!user) return <div>Chargement...</div>;
    //console.log(userData.favorite_lessons)
    console.log(usersData)

  return (
       <>
      <Header />
      <main>
        
        <h4>Mon apprentissage</h4>
        
        {userData?.role?.description === "Instructeur" && (
          <>
            <section className="head-button">
              <Link to="#">
                <button className="main-button">
                  Créer un nouveau cours
                </button>
              </Link>
            </section>
          </>
        )}
            <section>
              <h4>Favoris</h4>
              {userData.favorite_lessons?.length > 0 ? (
                userData.favorite_lessons.map((lesson) => (
                  <LessonContainer key={lesson.id} lesson={lesson} />
                ))
              ) : (
                <p>Vous n'avez pas encore de leçons favorites.</p>
              )}
            </section> 
        

        {userData?.role?.description === "Administrateur" && (
          <>
            <section>
              <h4>Liste des utilisateurs</h4>
              {usersData.length > 0 ? (
                <ul>

                  {usersData.map((user) => (
                    <li key={user.id}>
                      {user.pseudo}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Aucun utilisateur trouvé.</p>
              )}
            </section>
          </>
        )}

      </main>
      <Footer />
    </>
  );
}