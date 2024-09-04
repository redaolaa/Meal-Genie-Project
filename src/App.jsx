// src/App.jsx
import React from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import './App.css'
import Home from './components/Home'
import Navbar from './components/Navbar';
import RandomMeal from './components/randomMeal';
import SearchByName from './components/searchByName';


const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/randommeal" element={<RandomMeal />} />
        <Route path="/searchbyname" element={<SearchByName />} />
        {/* <Route path="/products/:productName" element={<Product />} /> */}
      </Routes>
    </Router>
  )
};

export default App;
