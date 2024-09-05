import React from "react"

function Home() {
  React.useEffect(() => {
    console.log("The Home Page has mounted")
  }, [])

  return (
    <section className="hero is-link is-fullheight-with-navbar is-link">
      <div className="homepage-card">
        <div className="container">
          <h4 className="title">Home Page</h4>
           
        </div>
      </div>
    </section>
  )
}

export default Home
