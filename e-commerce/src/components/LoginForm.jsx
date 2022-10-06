import React, { useState } from "react"
import { Form, Button } from 'react-bootstrap'
import "./LoginForm.css"
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";

async function loginUser(credentials) {
  return fetch('https://ecomerce-master.herokuapp.com/api/v1/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }

 async function getLoggedUser(token){
  return fetch('https://ecomerce-master.herokuapp.com/api/v1/user/me', {
    method: 'GET', // or GET
    headers:{
      'Authorization': 'JWT '+token,
      'Content-Type': 'application/json'
    },
  })
    .then(data => data.json())
 }

const LoginForm = ({ userLogged }) => {
  const [email, setUserName] = useState();
  const [password, setPassword] = useState();
  
  const credentials = {
    email,
    password
  };
  const navigate = useNavigate();
  const handleSubmit = async e => {
    e.preventDefault();
    const response = await loginUser(credentials);
    if ('token' in response) {
        localStorage.setItem('accessToken', response['token']);
        localStorage.setItem('role', JSON.stringify(response['role']));
        //get User dails
        const loggedUser = await getLoggedUser(response['token']);
        console.log(loggedUser);
        localStorage.setItem('user',JSON.stringify(loggedUser));
        localStorage.setItem("total_products_cart", 0);
        localStorage.setItem("order", 0);
        navigate('/home');
     
    } else {
     // alert("Failed"+response.message+"error");

    Swal.fire({  
      icon: 'error',  
      title: 'Oops...',  
      text: response.message,  
      footer: '<a href>Why do I have this issue?</a>'  
    }); 
    }
  }

  return (
  <>
  <Form className="loginForm position-absolute top-50 start-50 translate-middle" onSubmit={handleSubmit}>
    <img src="./public/KiwiCommerce.png" className="loginLogo" alt="KiwiCommerce logo" />
    <h1 className="text-white title-SignIn">Log In</h1>
    <Form.Group className="mb-2 p-2" controlId="formBasicUser">
      <Form.Label className="iconLogin"><i className="bi bi-person-fill"></i> Email</Form.Label>
      <Form.Control 
        type="text"
        placeholder="User"
        onChange={e => setUserName(e.target.value)}
        />
    </Form.Group>
    <Form.Group className="mb-2 p-2" controlId="formBasicPassword">
    <Form.Label className="iconLogin"><i className="bi bi-shield-lock-fill"></i> Password</Form.Label>
      <Form.Control 
        type="password" 
        placeholder="Password" 
        onChange={e => setPassword(e.target.value)}
        />
      </Form.Group>
      <Button id="logIn"  type="submit">LOGIN</Button>
      <a href="/register" className="askLogin white">Are you already registered?</a>

      <a href="/home" className="askLogin white">View products</a>
  </Form>
  </>
  );
};

export default LoginForm;