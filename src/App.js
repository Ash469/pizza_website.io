
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { CartProvider } from './components/CartContext'; 
import Menu from './components/Menu';
import Cart from './components/Cart';
import Footer from './components/Footer';
import FrontPage from './components/FrontPage'; 
import NotFound from './Error_handling/NotFound'; 
import ServerError from './Error_handling/ServerError';
import './App.css';

const App = () => {
    return (
        <Router>
            <CartProvider>
                <div className="app-container">
                    <Routes>
                        <Route path="/" element={<FrontPage />} />
                        <Route path="/menu" element={
                            <>
                                <Menu />
                                {/* <button className="cart-btn">
                                    <Link to="/cart">Cart</Link>
                                </button> */}
                            </>
                        } />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/server-error" element={<ServerError />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                    <Footer />
                </div>
            </CartProvider>
        </Router>
    );
};

export default App;





