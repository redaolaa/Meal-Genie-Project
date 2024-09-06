


# Meal Genie 
## Overview
Meal Genie is a simple web app designed to help users discover and save their favorite meals. Whether you're looking for a random meal suggestion, searching by name, or saving a recipe to your favorites, Meal Genie makes it easy to find recipes. 
The app uses TheMealDB API to fetch meal data, and user preferences are stored in localStorage.

### How to Use
Install Dependencies:
Run npm install to install the required dependencies:

- react-router-dom
- bulma
- aos

### Features

#### Imports:
- React Hooks: useEffect, useState — useEffect allows you to run side effects (like fetching data or interacting with local storage), and useState manages the state of your components.
- React Router: BrowserRouter, Routes, Route are used for navigating between different pages or components.
#### Random Meal Generator:
- Get a random meal suggestion from a wide range of recipes.

#### Search By Name: 
- Search for meals by name and get detailed information on ingredients, instructions, and categories.

#### Favorites: 
- Save and manage your favorite meals. Your favorites are stored in local storage and persist across sessions.

#### Responsive Design:
- Built with Bulma CSS for a clean, responsive design.

#### Animations:
- Integrated with AOS (Animate on Scroll) to add smooth scrolling animations.

### Key Components
#### App.jsx: 
- The main app component that manages the routing and state for favorites.
#### Home.jsx: 
- The landing page with an animated intro and image.
#### RandomMeal.jsx: 
- Fetches and displays a random meal along with ingredients, instructions, and a video tutorial.
#### SearchByName.jsx:
 - Allows users to search meals by name and view details.
#### Favorites.jsx: 
- Displays a list of user-saved favorite meals.

### API

The app integrates with TheMealDB API to fetch meal data. This was used from https://www.themealdb.com/api.php?ref=apilist.fun

 The APIs used include:

https://www.themealdb.com/api/json/v1/1/random.php - Fetches a random meal.
https://www.themealdb.com/api/json/v1/1/search.php?s=<meal_name> - Searches for meals by name.


### LocalStorage
The app uses localStorage to persist user favorites across sessions. Favorites are stored in JSON format and automatically loaded when the app is opened.







- Saving to Local Storage: The useEffect hook runs whenever the favourites state changes, saving the updated list of favorites to localStorage.
- Retrieving from Local Storage: On initial load, getSavedFavourites fetches the list from localStorage.

### Animation
AOS (Animate on Scroll) is used to create scroll-based animations for meal cards and images.

