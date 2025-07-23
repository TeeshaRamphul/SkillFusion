import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

export default function MentionsLegales() {
  return (
    <>
      <Header />
      <main style={{ maxWidth: "900px", margin: "2rem auto", padding: "1rem" }}>
        <h2>Mentions légales</h2>
        <section>
          <h3>Éditeur du site</h3>
          <p>
            Le site <strong>SkillFusion</strong> est un projet pédagogique réalisé par&nbsp;:<br />
            Hugo, Marjorie, Rémi, Séverine, Teesha<br />
            Apprenants de l’École O’Clock – Promo Sushi<br />
            Contact&nbsp;: <a href="mailto:lorem@ipsum.fr">lorem@ipsum.fr</a>
          </p>
        </section>
        <section>
          <h3>Hébergement</h3>
          <p>
            Le site est hébergé par&nbsp;:<br />
            <em>[Nom de l’hébergeur]</em><br />
            Adresse&nbsp;: [Adresse de l’hébergeur]<br />
            Téléphone&nbsp;: [Numéro de l’hébergeur]<br />
            Site web&nbsp;: [URL de l’hébergeur]
          </p>
        </section>
        <section>
          <h3>Propriété intellectuelle</h3>
          <p>
            L’ensemble des contenus (textes, images, vidéos, logos, etc.) présents sur le site SkillFusion sont la propriété de leurs auteurs respectifs.<br />
            Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable.
          </p>
        </section>
        <section>
          <h3>Données personnelles</h3>
          <p>
            Les informations recueillies lors de l’inscription ou de l’utilisation du site sont destinées uniquement à un usage pédagogique et interne à SkillFusion.<br />
            Aucune donnée personnelle n’est cédée à des tiers.<br />
            Conformément à la loi « Informatique et Libertés » et au RGPD, vous disposez d’un droit d’accès, de rectification et de suppression de vos données.<br />
            Pour exercer ce droit, contactez-nous à l’adresse&nbsp;: <a href="mailto:lorem@ipsum.fr">lorem@ipsum.fr</a>
          </p>
        </section>
        <section>
          <h3>Cookies</h3>
          <p>
            Le site SkillFusion peut utiliser des cookies pour améliorer l’expérience utilisateur.<br />
            Vous pouvez configurer votre navigateur pour refuser les cookies.
          </p>
        </section>
        <section>
          <h3>Limitation de responsabilité</h3>
          <p>
            SkillFusion est un projet pédagogique.<br />
            Les informations et conseils proposés sur le site sont donnés à titre indicatif.<br />
            L’équipe ne saurait être tenue responsable des dommages directs ou indirects liés à l’utilisation du site ou à la mise en œuvre des tutoriels proposés.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
} 