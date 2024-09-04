import { useState } from "react";
import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";

function Favourites({ favourites }) {
  const navigate = useNavigate();

  const handleBackButton = () => {
    navigate("/searchbyname");
  };

  return (
    <div>
      <h1>My Favourites</h1>
      <button onClick={() => handleBackButton()}> Return to Find Recipes </button>
      {/* <Link to="/searchbyname" className="navbar-item">Back to Recipe Search</Link> */}

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
