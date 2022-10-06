import React,{ useState, useEffect } from 'react';
import NavbarComponent from './NavbarComponent';
import './AddProducts.css';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Card, Col, Row, Nav, Form, Container} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';



async function createProduct(newProduct, token) {
	return fetch('https://ecomerce-master.herokuapp.com/api/v1/item', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'JWT '+token,
		},
		body: JSON.stringify(newProduct)
	})
		.then(data => data.json());
}

  
const AddProducts = () => {
 

	const user = JSON.parse(localStorage.getItem('user'));
	const [dataUser, setDataUser] = useState(user || '');
	const history = useNavigate();

	useEffect(() => {
		if(dataUser.role !== 'ADMIN' || dataUser.role === undefined){
			history('/home');
		}
	}, []);
 
  
	const [isActive, setIsActive] = useState();
	const [product_name, setProductName] = useState();
	const [description, setDescription] = useState();
	const [price, setPrice] = useState();
	const [category, setCategory] = useState();
	const [brand, setBrand] = useState();
	const [sku, setSku] = useState();
	const [image, setImage] = useState();
	//const role = 'ADMIN';

  
	const token_user = localStorage.getItem('accessToken');
	const [token, setToken] = useState(token_user || '');
	const newProduct = {
		isActive,
		product_name,
		description,
		price,
		category,
		brand,
		sku,
		image

	};

	const handleChange = event => {
		if (event.target.checked) {
			setIsActive(true);
		} else {
			setIsActive(false);
		}
	};

	const handleSubmit = async e => {
		e.preventDefault();
		const response = await createProduct(newProduct, token);
		console.log(response);
		if (response._id !== undefined) {
			Swal.fire({  
				title: 'Success',  
				type: 'success',  
				text: 'Produt created',  
			});  
			history('/product?id='+response._id);
			//console.log(response);
     
		} else {

			Swal.fire({  
				icon: 'error',  
				title: 'Oops...',  
				text:  response.message.message, 
			}); 
		}
	};

	let categories = [
		'Books',
		'Movies',
		'Music',
		'Games',
		'Electronics',
		'Computers',
		'Home',
		'Garden',
		'Tools',
		'Grocery',
		'Health',
		'Beauty',
		'Toys',
		'Kids',
		'Baby',
		'Clothing',
		'Shoes',
		'Jewelery',
		'Sports',
		'Outdoors',
		'Automotive',
		'Industrial'
	];
  
	return (
		<>
			<div>
				<NavbarComponent/>
			</div>
			<>
				<br/><br/>  
				<Container className="containerAdd">
					<div className="p-3 add2">
      
						<Form onSubmit={handleSubmit}>
							<h2> Add new product</h2>

							<Form.Group className="mb-3">
								<Form.Label>Product Name</Form.Label>
								<Form.Control type="text" placeholder="Enter product name"  onChange={e => setProductName(e.target.value)} />
							</Form.Group>

							<Form.Group className="mb-3">
								<Form.Label>Description</Form.Label>
								<Form.Control type="text" placeholder="Enter product description" onChange={e => setDescription(e.target.value)} />
							</Form.Group>

							<Form.Group className="mb-3">
								<Form.Label>Price</Form.Label>
								<Form.Control type="number" placeholder="Enter product price" onChange={e => setPrice(e.target.value)} />
							</Form.Group>

							<Form.Group className="mb-3">
								<Form.Label>Category</Form.Label>
								{  /*<Form.Control type="text" placeholder="Enter product category" onChange={e => setCategory(e.target.value)} />*/}
								<Form.Select aria-label="Default select example" onChange={e => setCategory(e.target.value)}>
									<option value ="">Select category</option>
									{categories.map((item) => (
										<option key={item} value ={item}>{item}</option>
									))}
								</Form.Select>
							</Form.Group>

							<Form.Group className="mb-3">
								<Form.Label>Brand</Form.Label>
								<Form.Control type="text" placeholder="Enter product brand" onChange={e => setBrand(e.target.value)}  />
							</Form.Group>

							<Form.Group className="mb-3">
								<Form.Label>Sku</Form.Label>
								<Form.Control type="text" placeholder="Enter product sku" onChange={e => setSku(e.target.value)} />
							</Form.Group>

							<Form.Group className="mb-3">
								<Form.Label>Url image</Form.Label>
								<Form.Control type="text" placeholder="Enter product url image" onChange={e => setImage(e.target.value)} />
							</Form.Group>

							<Form.Group className="mb-3" controlId="formBasicCheckbox">
								<Form.Check type="checkbox" label="Product is active"  onChange={handleChange}/>
							</Form.Group>

							<Button variant="primary" type="submit">
        Submit
							</Button>
						</Form>
					</div>
				</Container>
    
			</>
    
		</>
    
	);
};

export default AddProducts;