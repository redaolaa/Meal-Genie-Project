import React from "react"

function Home() {
  React.useEffect(() => {
    console.log("The Home Page has mounted")
  }, [])

  return (
    <section className="homepage-container">
      <img src="./images/Family-dinner.jpg" className="transparent-image"/>
      <div className="homepage-card">
        <div className="container">
           <div>
            <p>Welcome to Meal Genie App</p>
            <p>Find meal with Recipes</p>
           </div>
        </div>
      </div>
    </section>
  )
}

export default Home
