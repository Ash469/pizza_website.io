import React from 'react';
import { Link } from 'react-router-dom';
import './ErrorPages.css';

const NotFound = () => {
    return (
        <div className="error-page">
            <h1>404 - Page Not Found</h1>
            <p>Oops! The page you are looking for does not exist.</p>
            <Link to="/menu" className="btn">Go to Menu</Link>
        </div>
    );
};

export default NotFound;
