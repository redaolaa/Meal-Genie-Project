import { useState } from "react";

function Favourites({ favourites }) {
    return (
        <div>
          <h1>My Favourites</h1>
          {favourites.length > 0 ? (
            favourites.map((meal, index) => (
              <div key={index}>
                <h2>{meal.strMeal}</h2>
                <img src={meal.strMealThumb} alt={meal.strMeal} width="200" />
                <p>
                  <strong>Category:</strong> {meal.strCategory}
                </p>
                <p>
                  <strong>Area:</strong> {meal.strArea}
                </p>
              </div>
            ))
          ) : (
            <p>No favourites added yet.</p>
          )}
        </div>
      );
}

export default Favourites;
