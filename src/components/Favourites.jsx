// src/components/Favorites.jsx
//testing

import { useNavigate } from "react-router-dom";

function Favourites({ favourites, removeFav }) {
  const navigate = useNavigate();

  const handleBackButton = () => {
    navigate("/searchbyname");
  };

  const renderIngredients = (meal) => {
    if (!meal) return null;

    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim() !== "") {
        ingredients.push(
          <li key={i}>
            {measure && measure.trim() !== "" ? `${measure} ` : ""}
            {ingredient}
          </li>
        );
      }
    }
    return ingredients;
  };

  const youtubeEmbedLink = (youtubeUrl) => {
    if (!youtubeUrl) return "";
    const urlParts = youtubeUrl.split("v=");
    const videoId = urlParts[1]?.split("&")[0];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  const embedUrl = ({ meal }) => {
    meal.strYoutube ? youtubeEmbedLink(meal.strYoutube) : "";
  };

  return (
    <div>
      <div className="random-button">
        <button className="button is-primary" onClick={() => handleBackButton()}>
          {" "}
          Return to Find Recipes{" "}
        </button>
      </div>
      {favourites.length > 0 ? (
        favourites.map((meal, index) => (
          <div
            key={index}
            className="random-meal-card"
            data-aos="flip-left"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="500">
            <h2>{meal.strMeal}</h2>
            <div className="meal-card-intro">
              <section className="meal-image">
                <img src={meal.strMealThumb} alt={meal.strMeal} width="200" />
                <p>
                  <strong>Category:</strong> {meal.strCategory}
                </p>
                <p>
                  <strong>Area:</strong> {meal.strArea}
                </p>
              </section>
              <section className="meal-ingridients">
                <h3>Ingredients</h3>
                <ul>{renderIngredients(meal)}</ul>
              </section>
            </div>
            <section className="meal-instruction">
              <p>
                <strong>Instructions:</strong> {meal.strInstructions}
              </p>
            </section>
            {meal.strYoutube && (
              <iframe
                src={youtubeEmbedLink(meal.strYoutube)}
                title={`${meal.strMeal} YouTube video`}
                width={560}
                height={315}></iframe>
            )}
            <br /> <br />
            <button className="button is-danger" onClick={() => removeFav(meal.idMeal)}>Remove</button>
          </div>
        ))
      ) : (
        <p>No favourites added yet.</p>
      )}
    </div>
  );
}

export default Favourites;
