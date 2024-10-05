import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { CartProvider } from './components/CartContext';// Ensure the path is correct

ReactDOM.render(
    <CartProvider>
        <App />
    </CartProvider>,
    document.getElementById('root')
);
