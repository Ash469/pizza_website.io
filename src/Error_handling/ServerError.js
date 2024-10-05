import React from 'react';
import { Link } from 'react-router-dom';
import './ErrorPages.css'; 

const ServerError = () => {
    return (
        <div className="error-page">
            <h1>500 - Server Error</h1>
            <p>Something went wrong on our end. Please try again later.</p>
            <Link to="/menu" className="btn">Go to Menu</Link>
        </div>
    );
};

export default ServerError;
