import { useEffect, useState } from "react";
import { useAuth } from "../services/api";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LessonContainer from "../components/LessonContainer.jsx";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Board() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [usersData, setUsersData] = useState([]);
  const { user } = useAuth();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchAccount();
        await fetchAllUsers();
      } catch (err) {
        setError(err.message);
      //} finally {
      //  setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const fetchAccount = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!response.ok) throw new Error("Erreur réseau ou autorisation");
      setUserData(await response.json());
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchAllUsers = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/user`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!response.ok) throw new Error("Erreur lors de la récupération des utilisateurs");
      setUsersData((await response.json()).allUsers || []);
    } catch (err) {
      setError(err.message);
    }
  };

  //if (isLoading) return <div>Chargement...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!user) return <div>Chargement...</div>;


    /// Modifier un rôle
  function handleClickUpdate() {
    navigate(`/erreurMaintenance`);
  }

  return (
    <>
      <Header />
      <main>
        
        {userData?.role?.description === "Administrateur" && (
          <>
            <section className="head-button">
              <Link to="#">
                <button className="main-button">Créer un nouveau cours</button>
              </Link>
            </section>
            <section className="head-button">
              <Link to="/profilchanges">
                <button className="main-button">Modifier mon profil</button>
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
            <section className="accountList">
              <h4>Liste des utilisateurs</h4>
              {usersData.length > 0 ? (
                <ul>
                  {usersData.map((user) => (
                    <li key={user.id}>
                      <div className="accountList__detail">
                        <div className="accountList__detail__name">{user.pseudo.replace(/^./, (match) => match.toUpperCase())}</div>
                        <div className="accountList__detail__role">{user.role.description.replace(/^./, (match) => match.toUpperCase())}</div>
                        <div className="crud">
                          <Link
                          to={`/roleChange/${user.id}`}
                          style={{ textDecoration: "none", color: "inherit" }}
                          >
                          {/* Affiche le bouton 'modifier'*/}
                            <h4>{`\ud83d\udcdd`}</h4>
                          </Link>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Aucun utilisateur trouvé.</p>
              )}
            </section>
          </>
/*

        <section>
          <h4>Mes Favoris</h4>
          {userData.favorite_lessons?.length > 0 ? (
            userData.favorite_lessons.map((lesson) => (
              <LessonContainer key={lesson.id} lesson={lesson} />
            ))
          ) : (
            <p>Vous n'avez pas encore de leçons favorites.</p>
          )}
        </section>

        {userData?.role?.description === "Administrateur" && (
          <section className="accountList">
            <h4>Liste des utilisateurs</h4>
            {usersData.length > 0 ? (
              <ul>
                {usersData.map((user) => (
                  <li key={user.id}>
                    <div className="accountList__detail">
                      <div className="accountList__detail__name">
                        {user.pseudo?.replace(/^./, (match) => match.toUpperCase())}
                      </div>
                      <div className="accountList__detail__role">
                        {user.role?.description?.replace(/^./, (match) => match.toUpperCase())}
                      </div>
                      <div >
                      <a onClick={handleClickUpdate(user.id)} style={{ cursor: 'pointer' }}>
                          <h4>✍️</h4>
                        </a>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Aucun utilisateur trouvé.</p>
            )}
          </section>
*/
        )}
      </main>
      <Footer />
    </>
  );
}