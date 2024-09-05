// src/components/Favorites.jsx

import {useNavigate } from "react-router-dom";

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

  return (
    <div>
      <h1>My Favourites</h1>
      <button onClick={() => handleBackButton()}> Return to Find Recipes </button>

      {favourites.length > 0 ? (
        favourites.map((meal, index) => (
          <div key={index} className="favorite-meal-card">
            <h2>{meal.strMeal}</h2>
            <img src={meal.strMealThumb} alt={meal.strMeal} width="200" />
            <p>
              <strong>Category:</strong> {meal.strCategory}
            </p>
            <p>
              <strong>Area:</strong> {meal.strArea}
            </p>
            <h3>Ingredients</h3>
            <ul>{renderIngredients(meal)}</ul>
            <p>
              <strong>Instructions:</strong> {meal.strInstructions}
            </p>
            <a href={meal.strYoutube} target="_blank" rel="noopener noreferrer">
              Watch Recipe Video
            </a>
            <button onClick={() => removeFav(meal.idMeal)}>Remove</button>
          </div>
        ))
      ) : (
        <p>No favourites added yet.</p>
      )}
    </div>
  );
}

export default Favourites;
