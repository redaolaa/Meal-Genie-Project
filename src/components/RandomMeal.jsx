// src/components/RandomMeal.jsx

import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function RandomMeal({ addFav }) {
  const [meal, setMeal] = useState(null);
  const navigate = useNavigate()

  const fetchRandomMeal = async () => {
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/random.php"
    );
    const data = await response.json();

    if (data.meals) {
      const fetchedMeal = data.meals[0]
      setMeal(fetchedMeal)
      localStorage.setItem("randomMeal", JSON.stringify(fetchedMeal))
    }
  };

  useEffect(() => {
    const storedMeal = localStorage.getItem("randomMeal") // store the random meal to prevent refresh
    if (storedMeal) {
      setMeal(JSON.parse(storedMeal))
    } else {
      fetchRandomMeal()
    };
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

  return (
    <>
      <h4>Random Meal Page</h4>
      <button onClick={fetchRandomMeal}> Randomise </button>
      {meal ? (
        <div className="random-meal-card">
          <h2>{meal.strMeal}</h2>
          <img src={meal.strMealThumb} alt={meal.strMeal} width="200" />
          <p>
            <strong>Category:</strong> {meal.strCategory}
          </p>
          <p>
            <strong>Area:</strong> {meal.strArea}
          </p>
          <h3>Ingredients</h3>
          <ul>{renderIngredients()}</ul>
          <p>
            <strong>Instructions:</strong> {meal.strInstructions}
          </p>
          <a href={meal.strYoutube} target="_blank" rel="noopener noreferrer">
            Watch Recipe Video
          </a>
          <button onClick={() => handleFavouriteClick(meal)}>
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
