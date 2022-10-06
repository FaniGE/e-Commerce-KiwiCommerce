import React, { useState } from "react"
import { Form, Button } from 'react-bootstrap'
import "./RegisterForm.css"
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";

async function createUser(newUser) {
  return fetch('https://ecomerce-master.herokuapp.com/api/v1/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newUser)
  })
    .then(data => data.json())
 }

const RegisterForm = () => {
  const [first_name, setUserFirstName] = useState();
  const [last_name, setUserLastName] = useState();
  const [birth_date, setUserBirthDate] = useState();
  const [gender, setUserGender] = useState();
  const [email, setUserName] = useState();
  const [password, setPassword] = useState();
  //const role = 'ADMIN';
  const newUser = {
    first_name,
    last_name,
    birth_date,
    gender,
    email,
    password,
   // role
  };
  const navigate = useNavigate();
  const handleSubmit = async e => {
    e.preventDefault();
    const response = await createUser(newUser);
    if (response['isActive'] === true) {
        Swal.fire({  
            title: 'Success',  
            type: 'success',  
            text: 'Now you must log in.',  
          });  
        navigate('/');
        console.log(response);
     
    } else {

    Swal.fire({  
      icon: 'error',  
      title: 'Oops...',  
      text: response.message, 
    }); 
    }
  }

  return (
  <>
  <div className="formularioRegister">
    <Form className="RegisterForm" onSubmit={handleSubmit}>
      <img src="./public/KiwiCommerce.png" className="RegisterLogo" alt="KiwiCommerce logo" />
      <h1 className="text-white title-SignIn">Sign Up</h1>
      <Form.Group className="mb-2 p-2" controlId="formBasicUser">
        <Form.Label className="iconRegister"><i className="bi bi-person-fill"></i>First Name</Form.Label>
        <Form.Control 
          type="text"
          placeholder="Your First Name"
          onChange={e => setUserFirstName(e.target.value)}
          />
      </Form.Group>
      <Form.Group className="mb-2 p-2" controlId="formBasicUser">
        <Form.Label className="iconRegister"><i className="bi bi-person-fill"></i>Last Name</Form.Label>
        <Form.Control 
          type="text"
          placeholder="Your Last Name"
          onChange={e => setUserLastName(e.target.value)}
          />
      </Form.Group>

      <Form.Group className="mb-2 p-2" controlId="formBasicUser">
        <Form.Label className="iconRegister"><i className="bi bi-person-fill"></i>Birth Date</Form.Label>
        <Form.Control 
          type="date"
          placeholder=""
          onChange={e => setUserBirthDate(e.target.value)}
          />
      </Form.Group>

      <Form.Group className="mb-2 p-2" controlId="formBasicUser">
        <Form.Label className="iconRegister"><i className="bi bi-person-fill"></i>Gender</Form.Label>
        <Form.Select aria-label="Default select example" onChange={e => setUserGender(e.target.value)}>
        <option>Select your gender</option>
        <option value="M">M</option>
        <option value="F">F</option>
        <option value="X">X</option>
      </Form.Select>
      </Form.Group>

      <Form.Group className="mb-2 p-2" controlId="formBasicUser">
        <Form.Label className="iconRegister"><i className="bi bi-person-fill"></i> Email</Form.Label>
        <Form.Control 
          type="text"
          placeholder="User"
          onChange={e => setUserName(e.target.value)}
          />
      </Form.Group>
      <Form.Group className="mb-2 p-2" controlId="formBasicPassword">
      <Form.Label className="iconRegister"><i className="bi bi-shield-lock-fill"></i> Password</Form.Label>
        <Form.Control 
          type="password" 
          placeholder="Password" 
          onChange={e => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button id="Register"  type="submit">SIGN UP</Button>
        <a href="/" className="askLogin2 white">Log In</a>
        <a href="/home" className="askLogin2 white">View products</a>
    </Form>
      </div>
    </>
    );
};

export default RegisterForm;