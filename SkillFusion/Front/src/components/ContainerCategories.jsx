import React from "react";
import { Link } from "react-router-dom";

export default function ContainerCategories({ categories }) {
  categories = categories?.categories || categories || [];
  
  if (!categories.length) {
    return <div>Aucune catégorie trouvée.</div>;
  }
  
  return (
    <section className="list-category" aria-label="Liste des catégories">
      {categories.map((category) => (

        <Link
        to={`/categories/${category.id}/lessons` }
        style={{ textDecoration: "none", color: "inherit" }}
        key={category.id}
        >
          <section className="category-box" key={category.name}>
              <div className="category-box__desc">
                <h4>{category.name}</h4>
              </div>
          </section>
        </Link>
      ))}
    </section>
  );
}