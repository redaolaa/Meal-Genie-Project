// src/components/SearchByName.jsx
//testing

import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
      <form onSubmit={handleSearch} className="search-form">
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
          <div key={meal.idMeal} className="random-meal-card">
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
            <button className="button is-primary" onClick={() => handleFavouriteClick(meal)}>
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

//  creating a MealData component which accepts props that we can pass through when mapping
// instead of repeating code, we write once let that component render what we need
// we can still reuse a lot od the code, we jsut need to :
// 1) create component to be reusable by passing props that we need
// 2) we will still use eg meal.strCategory when mapping, but instead we will pass it to the new component with whatever prop we need it
/// so for meal.strCategory we map through and get meal.strCategory like we done before but this time, we
// pass meal.strCategory into our new component, and we jsut pass it to catergory instead and make sure we use it like this inside
// our MealData component, as its waiting for prop called category and we just pass it along:
//COMPONENT USAGE
// {/* <MealData
// catergory={ meal.catergory}
// image={ meal.image}
// /> */}

// JSX EXAMPLEE
//             <strong>Category:</strong> {catergory}
//COMPONENT
// const MealData = ({catergory, area, image, imageAlt, ingredients}) => {

//   return (
//     <div key={meal.idMeal}>
//           <h2>{meal.strMeal}</h2>
//           <img src={image} alt={imageAlt} width="200" />
//           <p>
//             <strong>Category:</strong> {meal.strCategory}
//           </p>
//           <p>
//             <strong>Area:</strong> {meal.strArea}
//           </p>
//           <h3>Ingredients</h3>
//           <ul>{renderIngredients(meal)}</ul>
//           <p>
//             <strong>Instructions:</strong> {meal.strInstructions}
//           </p>
//           <a href={meal.strYoutube} target="_blank" rel="noopener noreferrer">
//             Watch Recipe Video
//           </a>
//           <button onClick={() => handleFavouriteClick(meal)}>
//             {" "}
//             Add Favourite{" "}
//           </button>
//         </div>
//   )

// }
