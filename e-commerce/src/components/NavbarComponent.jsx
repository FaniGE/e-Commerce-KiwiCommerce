import React ,{ useState, useEffect } from 'react';
import './Navbar.css';
import {Button, Container, Form, Nav, Navbar, Dropdown } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';

import Swal from 'sweetalert2';


const NavbarComponent = ({ searchQuery, setSearchQuery }) => {
	const user = JSON.parse(localStorage.getItem('user'));
	const [dataUser, setDataUser] = useState(user || '');
	const history = useNavigate();
	const onSubmit = (e) => {
		history.push(`/home?s=${searchQuery}`);
		e.preventDefault();
	};

  
	const doUserLogOut = function () {
		Swal.fire({
			title: 'Are you sure you want to log out?',
			showCancelButton: true,
			confirmButtonText: 'Yes',
			denyButtonText: 'No',
			customClass: {
				actions: 'my-actions',
				cancelButton: 'order-1 right-gap',
				confirmButton: 'order-2',
			}
		}).then((result) => {
			if (result.isConfirmed) {
        
				Swal.fire('Come back soon!', '', 'success');
				localStorage.clear();
				history('/');
			}
		});
	};
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
		});
	};
	const goToShopping = function () {
		
				history('/shopping-car');
	};

	const [totalPieces, setTotalPieces] = useState(localStorage.getItem('total_products_cart'));

	let rol;
	if(dataUser.length === 0){
	    rol = '';
	}else{
		rol = dataUser.user.role;
	}
	return (
		<>
			<Navbar className="navbar" expand="lg">
				<Container fluid>
					<Navbar.Brand href="/home">
						<img src="./public/KiwiCommerce.png" className="logo" alt="KiwiCommerce logo"/>
						<img src="./public/logo-responsive.png" className="logo-responsive" alt="KiwiCommerce logo responsive"/>
					</Navbar.Brand>
					{dataUser.length !==0 ? (
						<Button variant=""><img src="./public/carrito.png" onClick={() => goToShopping()} className="carrito" alt="carrito de compras"/> ({totalPieces})</Button>
					):(
            
						<Button variant="" style={{ disabled: 'disabled'}} onClick={() => goToLogin()}><img src="./public/carrito.png" className="carrito" alt="carrito de compras"/></Button>
					)}
            
					<Form className="d-flex search-bar" action="/home"
						method="get"
						autoComplete="off"
						onSubmit={onSubmit}>
						<Form.Control
							value={searchQuery}
							onInput={(e) => setSearchQuery(e.target.value)}
							type="search"
							placeholder="Search"
							className="me-2 searchLabel"
							aria-label="Search"
							id="header-search"
							name="s"
						/>
						<Button variant="outline-dark" type="submit">
							<img src="./public/pawSearch.png" className="pawSearch" alt="paw-search"/>
						</Button>
					</Form>
					<Navbar.Toggle aria-controls="navbarScroll" className="mx-1"/>
					<Navbar.Collapse id="navbarScroll">
						<Nav
							className="me-auto my-0 my-lg-0"
							navbarScroll
						>
							<Nav.Link className="option" href="/home">&nbsp;Home&nbsp;</Nav.Link>
							
							{rol === 'ADMIN' && rol !== undefined ? (
								<Nav.Link className="option" href="/add-products">&nbsp;Add products&nbsp;</Nav.Link>
                        		 
                     			):(
									<></>
               				 )}

							{dataUser.length !==0 ? (
								<Dropdown>
									<Dropdown.Toggle variant="" id="dropdown-basic" className="mx-2">
										<img src="./public/user.png" alt=""/>
                						&nbsp; {dataUser.user.first_name + ' '+dataUser.user.last_name} ({dataUser.user.role})
									</Dropdown.Toggle>
									<Dropdown.Menu>
										<Dropdown.Item href="#"  onClick={() => doUserLogOut()}>Log out</Dropdown.Item>
										<Dropdown.Item href="#/action-2">My profile</Dropdown.Item>
									</Dropdown.Menu>
								</Dropdown>
							):(
								<Nav.Link className="option" href="/">&nbsp;Login&nbsp;</Nav.Link>
			                       
							)}   

                            {dataUser.length !==0 ? (
                        		 <></>
                     			):(
							 <Nav.Link className="option" href="/register">&nbsp;Sign up&nbsp;</Nav.Link> 
               				 )}
                             
						

						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	);
};
export default NavbarComponent;