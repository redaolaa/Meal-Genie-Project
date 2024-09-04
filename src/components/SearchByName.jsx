// src/components/SearchByName.jsx

import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Favourites from "./Favourites";

function SearchByName({ addFav }) {
  const [searchMeal, setSearchMeal] = useState("");
  const [mealData, setMealData] = useState([]); // stores the fetched meal data from API
  const navigate = useNavigate();

  const fetchMeals = async () => {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchMeal}`
    );
    const data = await response.json();

    if (data.meals) {
      setMealData(data.meals);
    } else {
      setMealData([]); // clear if no meal found
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    fetchMeals();
    setSearchMeal("");
  };

  const handleFavouriteClick = (meal) => {
    addFav(meal);
    navigate("/favourites");
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
    <>
      <h4> Search By Name Page</h4>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter meal name"
          value={searchMeal}
          onChange={(e) => setSearchMeal(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <div>
        {mealData.map((meal) => (
          <div key={meal.idMeal}>
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
            <button onClick={() => handleFavouriteClick(meal)}>
              {" "}
              Add Favourite{" "}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default SearchByName;
