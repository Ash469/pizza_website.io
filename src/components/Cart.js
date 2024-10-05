import React from 'react';
import { useCart } from './CartContext';
import { Link } from 'react-router-dom'; 
import './Cart.css';

const Cart = () => {
    const { cart, setCart } = useCart();


    const incrementQuantity = (pizzaId) => {
        setCart((prevCart) => {
            return prevCart.map((pizza) =>
                pizza.id === pizzaId
                    ? { ...pizza, quantity: (pizza.quantity || 1) + 1 } 
                    : pizza
            );
        });
    };


    const decrementQuantity = (pizzaId) => {
        setCart((prevCart) => {
            const pizzaExists = prevCart.find((pizza) => pizza.id === pizzaId);
            
            if (pizzaExists) {
                if (pizzaExists.quantity > 1) {
                    return prevCart.map((pizza) =>
                        pizza.id === pizzaId
                            ? { ...pizza, quantity: pizza.quantity - 1 } 
                            : pizza
                    );
                } else {
                    return prevCart.filter((pizza) => pizza.id !== pizzaId);
                }
            }
            
            return prevCart; 
        });
    };
    

    const removeFromCart = (pizzaId) => {
        setCart((prevCart) => prevCart.filter((pizza) => pizza.id !== pizzaId));
    };
    
    const calculateTotal = () => {
        return cart.reduce((total, pizza) => {
            return total + pizza.unitPrice * (pizza.quantity || 1); 
        }, 0);
    };

    return (
        <div className="cart-container">
            <h2>Your Cart</h2>
            <Link to="/menu" className="back-to-menu-btn">Continue Shopping</Link>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
                
            ) : (
                <>
                    <ul>
                        {cart.map((pizza) => (
                            <li key={pizza.id} className="cart-item">
                                <img
                                    src={pizza.imageUrl}
                                    alt={pizza.name}
                                    className="cart-pizza-image"
                                />
                                <span>{pizza.name}</span>
                                <span>Price: ${pizza.unitPrice}</span>
                                <div className="quantity-controls">
                                    <button onClick={() => decrementQuantity(pizza.id)}>-</button>
                                    <span>Quantity: {pizza.quantity || 1}</span>
                                    <button onClick={() => incrementQuantity(pizza.id)}>+</button>
                                </div>
                                <span>Total: ${(pizza.unitPrice * (pizza.quantity || 1)).toFixed(2)}</span>
                                <button onClick={() => removeFromCart(pizza.id)} className="remove-btn">
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>

                    <h3>Grand Total: ${calculateTotal().toFixed(2)}</h3>
                </>
            )}
        </div>
    );
};

export default Cart;
