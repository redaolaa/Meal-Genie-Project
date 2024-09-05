// src/App.jsx
import React from "react";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import RandomMeal from "./components/RandomMeal";
import SearchByName from "./components/SearchByName";
import Favourites from "./components/Favourites";

const App = () => {
  const [favourites, setFavourites] = useState([]);

  const addFav = (meal) => {
    setFavourites((prevFavourites) => {
      const clonedFavourites = structuredClone(prevFavourites);
      if (!clonedFavourites.some((fav) => fav.idMeal === meal.idMeal)) {
        clonedFavourites.push(meal);
      }
      return clonedFavourites;
    });
  };

  const removeFav = (mealId) => {
    setFavourites((prevFavourites) => {
      const updatedFavourites = prevFavourites.filter((meal) => meal.idMeal !== mealId);
      // console.log("debugging:", updatedFavourites)
      return updatedFavourites;
    })
  }

  return (
    <Router>
      <Navbar />
      <br/>
      <hr/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/randommeal" element={<RandomMeal addFav={addFav} />} />
        <Route
          path="/searchbyname"
          element={<SearchByName addFav={addFav} />}
        />
        <Route
          path="/favourites"
          element={<Favourites favourites={favourites} removeFav = {removeFav}/>}
        />
      </Routes>
    </Router>
  );
};

export default App;
