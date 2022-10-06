import React,{ useState, useEffect } from "react";
import NavbarComponent from './NavbarComponent';
import './ShoppingCar.css'
import axios from "axios";
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from "sweetalert2"

  
const ShoppingCar = () => {
 
  const user = JSON.parse(localStorage.getItem('user'));
  const [dataUser, setDataUser] = useState(user || '');


  const [value, setValue] = useState(1);
  const increment = function (total) {
      setValue(total);
  };
  const [totalt, setTotalt] = useState();
  const history = useNavigate();
  
  var cart = localStorage.getItem("cart");
  var pcart = JSON.parse(cart) != null ? JSON.parse(cart) : [];
 // console.log(cart);
  const total_products_cart = parseInt((localStorage.getItem('total_products_cart')),10);
 
  let total_sum = 0;
  for(let x = 0; x < pcart.length; x ++){
     total_sum+= Number(pcart[x].final_price);
  }

const deleteShop = function (element) {
    let another = pcart.filter(pro => pro.order != element);
    let another2=[];
    let new_quantity = 0;
   for(let i = 0; i < another.length; i ++){
     another2.push(another[i]);
      new_quantity+= Number(another[i].quantity);
   }
   localStorage.setItem('total_products_cart', Number(new_quantity));
    localStorage.setItem("cart",JSON.stringify(another2)); 
    window.location.reload();
    
    
};

useEffect(() => {
  if(dataUser.length === 0){
    history('/home');
}
}, []);


  
  return (
    <>
    <div>
    <NavbarComponent/>
    </div>
    <>
    <div className="container">
    <section className="h-100 h-custom" >
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col">
        <div className="card">
          <div className="card-body p-4">

            <div className="row">

              <div className="col-lg-7">
                <h5 className="mb-3"><a href="/home" className="text-body"><i
                      className="fas fa-long-arrow-alt-left me-2"></i>Continue shopping</a></h5>
                <hr/>

                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <p className="mb-1">Shopping cart</p>
                    <p className="mb-0">You have {total_products_cart} items in your cart</p>
                  </div>
                  <div>
                    <p className="mb-0"><span className="text-muted">Sort by:</span> <a href="#!"
                        className="text-body">price <i className="fas fa-angle-down mt-1"></i></a></p>
                  </div>
                </div>
                {pcart.length > 0 ? (
                 pcart.map((item) => (
                <div className="card mb-3">
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <div className="d-flex flex-row align-items-center">
                        <div>
                          <img
                            src={item.image}
                            className="img-fluid rounded-3" alt="Shopping item" style={{width: "65px"}}/>
                        </div>
                        <div className="ms-3">
                          <h5>{item.product_name} </h5>
                          <p className="small mb-0">{item.description}</p>
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center">
                        <div style={{width: "50px"}}>
                          <h5 className="fw-normal mb-0">{item.quantity}</h5>
                        </div>
                        <div style={{width: "80px"}}>
                          <h8 className="mb-0">{item.final_price} USD</h8>
                        </div>
                        <a href="#!" style={{color: "#cecece"}}><i className="bi bi-trash" onClick={() => deleteShop(item.order)}></i></a>
                      </div>
                    </div>
                  </div>
                </div>
                 ))
                 ) : (
                   <p>No items in your cart</p>
                    )}

                 
              

              </div>
              <div className="col-lg-5">

                <div className="card details-car text-white rounded-3">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h5 className="mb-0">Card details</h5>
                      <img src="./public/user.png"
                        className="img-fluid rounded-3" style={{width: "45px"}} alt="Avatar"/>
                    </div>

                    <p className="small mb-2">Card type</p>
                    <a href="#!" type="submit" className="text-white"><i
                        className="fab fa-cc-mastercard fa-2x me-2"></i></a>
                    <a href="#!" type="submit" className="text-white"><i
                        className="fab fa-cc-visa fa-2x me-2"></i></a>
                    <a href="#!" type="submit" className="text-white"><i
                        className="fab fa-cc-amex fa-2x me-2"></i></a>
                    <a href="#!" type="submit" className="text-white"><i className="fab fa-cc-paypal fa-2x"></i></a>

                    <form className="mt-4">
                      <div className="form-outline form-white mb-4">
                        <input type="text" id="typeName" className="form-control form-control-lg" siez="17"
                          placeholder="Cardholder's Name" />
                        <label className="form-label" for="typeName">Cardholder's Name</label>
                      </div>

                      <div className="form-outline form-white mb-4">
                        <input type="text" id="typeText" className="form-control form-control-lg" siez="17"
                          placeholder="1234 5678 9012 3457" minlength="19" maxlength="19" />
                        <label className="form-label" for="typeText">Card Number</label>
                      </div>

                      <div className="row mb-4">
                        <div className="col-md-6">
                          <div className="form-outline form-white">
                            <input type="text" id="typeExp" className="form-control form-control-lg"
                              placeholder="MM/YYYY" size="7" id="exp" minlength="7" maxlength="7" />
                            <label className="form-label" for="typeExp">Expiration</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-outline form-white">
                            <input type="password" id="typeText" className="form-control form-control-lg"
                              placeholder="&#9679;&#9679;&#9679;" size="1" minlength="3" maxlength="3" />
                            <label className="form-label" for="typeText">CVV</label>
                          </div>
                        </div>
                      </div>

                    </form>

                    <hr className="my-4"/>


                    <div className="d-flex justify-content-between mb-4">
                      <p className="mb-2">Total(Incl. taxes)</p>
                      
                      <p className="mb-2">{Number(total_sum,10)} USD</p>
                    </div>

                    <button type="button" className="btn btn-info btn-block btn-lg">
                      <div className="d-flex justify-content-between">
                        <span>{Number(total_sum,10)} USD</span> 
                        <span>  Checkout <i className="fas fa-long-arrow-alt-right ms-2"></i></span>
                      </div>
                    </button>

                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</div>
    </>
    
    </>
    
  )
}

export default ShoppingCar