import React,{ useState, useEffect } from 'react'
import { Routes, Route} from 'react-router-dom'
import Register from './components/RegisterForm'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import ProductDetails from './components/ProductDetails'
import NotFound from './components/NotFound';
import AddProducts from './components/AddProducts'
import ShoppingCar from './components/ShoppingCar'
import "./App.css";



const App = () => {
  return (
    <div>
      <Routes>
       <Route path="/register" element={<Register/>}></Route>
       <Route path="/" element={<LoginForm />} />
       <Route path="/home" element={<Home/>}></Route>
       <Route path="/product" element={<ProductDetails/>}></Route>
       <Route path="/add-products" element={<AddProducts/>}></Route>
       <Route path="/shopping-car" element={<ShoppingCar/>}></Route>
       <Route path="*" element={<NotFound/>}></Route>
       <Route path="/404" element={<NotFound/>}></Route>

      </Routes>      
    </div>
  )
}

export default App
