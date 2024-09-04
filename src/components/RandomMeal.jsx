// src/components/RandomMeal.jsx

import React, { useEffect } from "react"
import { useState } from "react"

function RandomMeal() {

  const [meal, setMeal] = useState(null)

  const fetchRandomMeal = async () => {
    const response = await fetch ("https://www.themealdb.com/api/json/v1/1/random.php")
    const data = await response.json ()

    if (data.meals) {
      setMeal(data.meals[0]) // set fetched meal data
    }
  }

  useEffect(() => {
    fetchRandomMeal()
  }, [])

  const renderIngredients = () => {
    if (!meal) return null

    const ingredients = []
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`]
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
    return ingredients
  }


  return (
    <>
      <h4>Random Meal Page</h4>

      {meal ? (
        <div>
          <h2>{meal.strMeal}</h2>
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            width="200"
          />
          <p>
            <strong>Category:</strong> {meal.strCategory}
          </p>
          <p>
            <strong>Area:</strong> {meal.strArea}
          </p>
          <p>
            <strong>Instructions:</strong> {meal.strInstructions}
          </p>
          <a
            href={meal.strYoutube}
            target="_blank"
            rel="noopener noreferrer"
          >
            Watch Recipe Video
          </a>
          <h3>Ingredients</h3>
          <ul>
            {renderIngredients()}
          </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
 

export default RandomMeal

