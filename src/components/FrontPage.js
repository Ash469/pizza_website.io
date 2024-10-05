import React from 'react';
import { Link } from 'react-router-dom';
import './FrontPage.css';

const FrontPage = () => {
    return (
        <div className="front-page-container">
            <h1>Welcome to Pizza Delight!</h1>
            <p>Your favorite place to order delicious pizza.</p>
            <Link to="/menu">
                <button className="menu-button">Explore Our Menu</button>
            </Link>
        </div>
    );
};

export default FrontPage;
