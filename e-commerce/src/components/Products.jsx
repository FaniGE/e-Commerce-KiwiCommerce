import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './Products.css';
import { Card, Col, Row, Nav, Form} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Products = () => {
	const [list, setList] = useState([]);
     
	const [isLoading, setLoading] = useState(true); // Loading state
  
	useEffect(() => {
		Axios({
			url: 'https://ecomerce-master.herokuapp.com/api/v1/item',
		})
			.then((response) => {
				setList(response.data);
				setLoading(false); 
			})
			.catch((error) => {
				console.log(error);
			});
	}, [setList]);

	const filterPosts = (posts, query) => {
		if (!query) {
			return posts;
		}

		return posts.filter((post) => {
			const postName = post.product_name.toLowerCase();
			return postName.includes(query.toLowerCase());
		});
	};

	const { search } = window.location;
	const query = new URLSearchParams(search).get('s');
	const [searchQuery, setSearchQuery] = useState(query || '');
	const filteredPosts = filterPosts(list, searchQuery);
  
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
    
	const rol = JSON.parse(localStorage.getItem('role'));
	const [roleUser, setRoleUser] = useState(rol || '');

  
	if (isLoading) {
		return (
			<div className="DivLInicial">  
				<center>
					<div className="div2"><img className="initialImg" src="public/cargando.gif"/></div>
				</center>
			</div>);
       
	}
    

	return (
      

		<div className="productCards">

			<h2 style={{color:'white'}}><b> {filteredPosts.length} Product(s) </b> </h2>
     
   
			<Row xl={5} md={3} xs={1} className="g-4">
				{filteredPosts.map((item) => (
					<Col key={`/product?id=${item._id}`}>
						<Card style={{width:'100%', height:'100%',}}>
							{item.image != null && item.image.trim().length > 5 ? (
								<Card.Img variant="top" src={item.image} width={250} height={230}/> 
							) : (
								<Card.Img variant="top" src="./public/not-found.jpg" alt="Not found" width={250} height={230}/> 
							)}
							<Card.Body>
								<Card.Title>{item.product_name}</Card.Title>
								{item.description != null ? (
									<Card.Text>

										{item.description.slice(0,30)}...
									</Card.Text>
								) : (
									<Card.Text>

                Description not available
									</Card.Text>
								)}
								<Card.Text>
									<b>Price: {item.price} USD</b>
								</Card.Text>
								<div className="containerTo">
									<a href={`/product?id=${item._id}`}>
										<button className="goTo">More details</button>
									</a>
								</div>
							</Card.Body>
						</Card>
					</Col>
				))}

				{filteredPosts.length === 0 ? (
					<div className="espacio">
      &nbsp;
					</div>
				) : (
					<></>
				)}
			</Row>
		</div>
     
  
	);
};


export default Products;