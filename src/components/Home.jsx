//testing
import React, { useEffect } from "react";
import homepageImage from "../assets/family-dinner.png";
import { useActionData } from "react-router-dom";
import genieLamp from "../assets/genielamp.gif";

function Home() {
  React.useEffect(() => {
    console.log("The Home Page has mounted");
  }, []);

  return (
    <>
      <section
        className="homepage-container"
        data-aos="fade-down"
        data-aos-duration="3000">
        <img
          src={homepageImage}
          alt="family-dinner"
          className="transparent-image"
        />
      </section>

      <div className="homepage-card-text-container">
        <div className="homepage-text">
          <div data-aos="fade-up" data-aos-duration="3000">
            <h1>Meal Genie  <img src={genieLamp} alt="genie lamp" className="genieLamp" /> </h1>
           
            <p>Your perfect dish is just a wish away</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
