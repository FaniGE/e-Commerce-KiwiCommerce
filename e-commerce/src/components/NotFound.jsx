import React from 'react';
import './NotFound.css';
import './NotFound.css';
import NavbarComponent from './NavbarComponent';

const NotFound = () => {
	return (
		<>
			<div>
				<NavbarComponent/>
			</div>
    
			<>
				<div className="notFound404">
					<img src="./public/error404.png" alt="Not Found" className="error404"/>
				</div>
			</>
			<footer>
				<div className="container">
					<div className="row">
						<p>© 2022 - Create e-Commerce: "KiwiCommerce" by E.G.E.</p>
					</div>
				</div>
			</footer>
    
		</>
   
	);
};

export default NotFound;