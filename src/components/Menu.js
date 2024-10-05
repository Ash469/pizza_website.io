import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useCart } from './CartContext';
import './Menu.css';

const Menu = () => {
    const { cart,setCart } = useCart();
    const [pizzas, setPizzas] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // this is for Error Handling 

    useEffect(() => {
        const fetchPizzas = async () => {
            try {
                const response = await fetch('https://gist.githubusercontent.com/aditya-samal/c075c71045acb8fd3b04a7996c7463a7/raw/905b79d1510842e3a770e9fa2641b44bc9d3c716/pizzas.json');
                if (!response.ok) {
                    throw new Error('Failed to fetch pizzas');
                }
                const data = await response.json();
                setPizzas(data.data);
            } catch (err) {
                // console.error('Error fetching pizzas:', err);
                setError('An error occurred while fetching the pizza data.');
                navigate('/server-error');
            }
        };

        fetchPizzas();
    }, [navigate]);

    const addToCart = (pizzaToAdd) => {
        setCart((prevCart) => {
            const pizzaExists = prevCart.find((pizza) => pizza.id === pizzaToAdd.id);
            if (pizzaExists) {
                return prevCart.map((pizza) =>
                    pizza.id === pizzaToAdd.id
                        ? { ...pizza, quantity: pizza.quantity + 1 }
                        : pizza
                );
            } else {
                return [...prevCart, { ...pizzaToAdd, quantity: 1 }];
            }
        });
    };

    const isPizzaInCart = (pizzaId) => {
        return cart.some((pizza) => pizza.id === pizzaId);
    };

    return (
        <div>
            <h1>Menu</h1>
            <div className="menu-container">
                {pizzas.length > 0 ? (
                    pizzas.map((pizza) => (
                        <div key={pizza.id} className="pizza-card">
                            <h2>{pizza.name}</h2>
                            <img src={pizza.imageUrl} alt={pizza.name} />
                            <p>Price: ${pizza.unitPrice}</p>
                            <p>Ingredients: {pizza.ingredients.join(', ')}</p>
                            <p className={pizza.soldOut ? 'sold-out' : 'available'}>
                                {pizza.soldOut ? 'Sold Out' : 'Available'}
                            </p>
                            {!pizza.soldOut && (
                                <button className='btn cart' onClick={() => addToCart(pizza)}>
                                    {/* this is for when a item is added to cart its svg changes */}
                                        {isPizzaInCart(pizza.id) ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="16">
                                            <path fillRule="evenodd" d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0"/>
                                            <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/>
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="16" fill="currentColor">
                                            <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
                                        </svg>
                                    )}
                                    Add to Cart
                                </button>

                            )}
                        </div>
                    ))
                ) : (
                    <p className="no-pizzas">No pizzas available</p>
                )}
            </div>
        </div>
    );
};

export default Menu;
