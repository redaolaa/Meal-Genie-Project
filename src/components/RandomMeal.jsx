// src/components/RandomMeal.jsx
//testing

import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function RandomMeal({ addFav }) {
  const [meal, setMeal] = useState(null);
  const navigate = useNavigate();

  const fetchRandomMeal = async () => {
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/random.php"
    );
    const data = await response.json();

    if (data.meals) {
      const fetchedMeal = data.meals[0];
      setMeal(fetchedMeal);
      localStorage.setItem("randomMeal", JSON.stringify(fetchedMeal));
    }
  };

  useEffect(() => {
    const storedMeal = localStorage.getItem("randomMeal"); // store the random meal to prevent refresh
    if (storedMeal) {
      setMeal(JSON.parse(storedMeal));
    } else {
      fetchRandomMeal();
    }
  }, []);

  const handleFavouriteClick = (meal) => {
    addFav(meal);
    navigate("/favourites");
  };

  const renderIngredients = () => {
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
    <>
      <div className="random-button">
        <button className="button is-primary" onClick={fetchRandomMeal}> Randomise </button>
      </div>
      {meal ? (
        <div
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
              <ul>{renderIngredients()}</ul>
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
          <br />
          <br />
          <button className="button is-primary"  onClick={() => handleFavouriteClick(meal)}>
            {" "}
            Add Favourite{" "}
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default RandomMeal;
