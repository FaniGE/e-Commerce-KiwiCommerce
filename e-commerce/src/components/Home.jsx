import React from 'react'
import NavbarComponent from './NavbarComponent'
import Products from './Products'
const Home = () => {

  return (
    <>
    <div>
    <NavbarComponent/>
    <Products/>
    </div>
    <footer>
      <div className="container">
        <div className="row">
            <p>© 2022 - Create e-Commerce: "KiwiCommerce" by E.G.E.</p>
        </div>
      </div>
    </footer>
    </>
  )
  
}

export default Home
