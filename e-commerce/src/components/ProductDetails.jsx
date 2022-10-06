import React,{ useState, useEffect } from "react";
import NavbarComponent from './NavbarComponent';
import './ProductDetails.css'
import axios from "axios";
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from "sweetalert2"

  
const ProductDetails = () => {
 

  const { search } = window.location;
  const query = new URLSearchParams(search).get('id');
  const [searchProduct, setSearchProduct] = useState(query || ''); 
  const [product, setProduct] = useState({
  })
  const history = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));
  const [dataUser, setDataUser] = useState(user || '');
 
  
  useEffect(() => {
    axios
      .get(`https://ecomerce-master.herokuapp.com/api/v1/item/${searchProduct}`)
      .then(({ data }) => { setProduct(data) })
      .catch((error) => console.log("error "+error.message));
  }, []);

  const goToLogin = function () {

    Swal.fire({
     title: 'To buy products you must log in, do you want to log in?',
     showCancelButton: true,
     confirmButtonText: 'Yes',
     denyButtonText: 'No',
     customClass: {
       actions: 'my-actions',
       confirmButton: 'order-2',
       cancelButton: 'order-1 right-gap',
     }
   }).then((result) => {
     if (result.isConfirmed) {
       history('/');
     }
   })
  };


  const [value, setValue] = useState(1);
  const increment = function (total) {
      setValue(total);
  };
  const [totalt, setTotalt] = useState();

 // const [products, setProducts] = useState({});
  const addProducts = function (id) {
    if(id !== undefined){
    var cart = localStorage.getItem("cart");
    var pcart = JSON.parse(cart) != null ? JSON.parse(cart) : [];
    const total_products_cart = parseInt((localStorage.getItem('total_products_cart')),10);
    const order = parseInt((localStorage.getItem('order')),10);
    let products_add = {
       order : (Number(order)+1),
       product_id : product._id,
       product_name : product.product_name,
       quantity : value,
       price : product.price,
       image : product.image,
       description : product.description,
       final_price : Number(product.price)* Number(value)
    };

    let total_products_pieces = Number(total_products_cart) + Number(value);
    let total_order = (Number(order)+1);
    pcart.push(products_add);
    localStorage.setItem("cart", JSON.stringify(pcart));
    localStorage.setItem("total_products_cart", total_products_pieces);
    localStorage.setItem("order", total_order);
    setTotalt(total_products_pieces);
    window.location.reload();
  }else{

    Swal.fire({
      title: 'This product does not exist, do you want to return to home page?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: 'No',
      customClass: {
        actions: 'my-actions',
        confirmButton: 'order-2',
        cancelButton: 'order-1 right-gap',
      }
    }).then((result) => {
      if (result.isConfirmed) {
        history('/home');
      }
    })

  }
    
};
  
  return (
    <>
    <div>
    <NavbarComponent/>
    </div>
    <>
    <section id="productDetails">
    <div className="container">
      <div className="row">
        <div className="col-md-12 col-lg-4 product-cover mb-3">
          
       
        {product.image != null && product.image.trim().length > 5 ? (
            <img src={product.image} alt=""/> 
            ) : (
              <img src="./public/not-found.jpg" alt=""/>
            )}
        
          </div>
          <div className="col productName">
            <div className="contentReturn">
              <a href="/home" className="btn return" role="button">Return</a>
            </div>
          
          <h2 id="productName">{product.product_name}</h2>
          
          <div class="data">
            <p className="price"><b>{product.price} USD</b></p>
            <p className="category"> Category: {product.category} </p>
            <p className="brand"> Brand: {product.brand} </p>
          </div>
          <div className="row information">
            <h5 className="descriptionProduct">Description</h5>
            {product.description != null ? (
               <p className="description">{product.description} </p>
              ) : (
                <p className="description">Description not available </p>
                )}
           
          </div>
          

          <div className="Buy">
            
          <span class="control-label">Cantidad</span>
          <div className="product-quantity bootstrap-touchspin">
              
            <div className="qyt">
              <div className="input-group">
              <span className="input-group-addon bootstrap-touchspin-prefix"></span>
              <input type="number" name="qty" id="quantity_wanted"  value={value} min="1" onChange={e  => increment(e.target.value)}  className="input-group form-control"  style={{display: "block"}}/>

              <div className="add">

              {dataUser.length !==0 ? (
             <button type="button" className="toBuy" onClick={() => addProducts(product._id)}>
             <img src="./public/carrito.png" className="carritoAdd" alt=""/>
             COMPRAR
           </button>

           
          ):(
            <button type="button" className="toBuy" style={{ disabled: 'disabled'}} onClick={() => goToLogin()}>
                <img src="./public/carrito.png" className="carritoAdd" alt=""/>
                COMPRAR
              </button>
            )}
            </div>
            </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
    </section>
    <footer>
      <div className="container">
        <div className="row">
            <p>© 2022 - Create e-Commerce: "KiwiCommerce" by E.G.E.</p>
        </div>
      </div>
    </footer>
    </>
    </>
    
  )
}

export default ProductDetails