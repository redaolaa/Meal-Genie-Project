import React from "react"

function Home() {
  React.useEffect(() => {
    console.log("The Home Page has mounted")
  }, [])

  return (
    <section className="hero is-link is-fullheight-with-navbar is-link">
      <div className="homepage-card">
        <div className="container">
          <h4 className="title">Welcome to Meal Genie App</h4>
           <div>
            <p>Find meal with Recipes</p>
           </div>
        </div>
      </div>
    </section>
  )
}

export default Home
