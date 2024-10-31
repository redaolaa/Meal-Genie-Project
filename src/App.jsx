// src/App.jsx
//testing
import React, { useEffect } from "react";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bulma/css/bulma.min.css";

import AOS from "aos"; // Import AOS for global animation initialisation
import "aos/dist/aos.css";

import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import RandomMeal from "./components/RandomMeal";
import SearchByName from "./components/SearchByName";
import Favourites from "./components/Favourites";

const getSavedFavourites = () => {
  const getFavourites = JSON.parse(localStorage.getItem("favourites"));

  // we are using LocalStorage.getItem to GET favourites from local storage that we set in the code below- see useEffect
  //we have put this outside the function because we are using a function to set state directly otherwise it will override back to [] in useState that we initially set.
  // we changed   const [favourites, setFavourites] = useState([]) ----> useState(getSavedFavourites);

  return getFavourites || []; // Return an empty array if no favourites are found
};

const App = () => {
  const [favourites, setFavourites] = useState(getSavedFavourites);

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
      const updatedFavourites = prevFavourites.filter(
        (meal) => meal.idMeal !== mealId
      );
      // console.log("debugging:", updatedFavourites)
      return updatedFavourites;
    });
  };

  // useEffect(() => {
  //   const getFavourites = JSON.parse(localStorage.getItem("favourites"));
  //   console.log("getFavourites", getFavourites);
  //   if (getFavourites) {
  //     setFavourites(getFavourites);
  //   }

  // }, []);

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));

    // localStorage.setItem requires a (key, value ) --> ("favourites", favourites)
    // the browser only accepts strings so we add JSON.stringify so that the browser can understand it.
    // the above function will run  everytime favourites is changed.
    //we have done this by adding favourites into the [] dependency.
    // this is now saved in local storage but we need to get it and we can't because when the code runs again
    //   const [favourites, setFavourites] = useState([]);---- this state is empty so it use that and sets an empty array.
    // local storage has TWO syntax: 1) setItem 2) getItem
  }, [favourites]);

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <Router>
      <Navbar />
      <br />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/randommeal" element={<RandomMeal addFav={addFav} />} />
        <Route
          path="/searchbyname"
          element={<SearchByName addFav={addFav} />}
        />
        <Route
          path="/favourites"
          element={<Favourites favourites={favourites} removeFav={removeFav} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
