import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const itemTotal = (item) => item.cost * item.quantity;
  const cartTotal = cartItems.reduce((sum, item) => sum + itemTotal(item), 0);

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => dispatch(removeItem(item.name));

  const handleCheckout = (e) => {
    e.preventDefault();
    alert('Próximamente');
  };

  return (
    <div className="cart-container">
      <h2>Total del carrito: ${cartTotal}</h2>

      {cartItems.length === 0 && <p>Tu carrito está vacío.</p>}

      {cartItems.map((item) => (
        <div className="cart-item" key={item.name}>
          <img className="cart-item-image" src={item.image} alt={item.name} />
          <div className="cart-item-details">
            <h3>{item.name}</h3>
            <p>Precio unitario: ${item.cost}</p>
            <div className="cart-item-quantity">
              <button onClick={() => handleDecrement(item)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => handleIncrement(item)}>+</button>
            </div>
            <p className="cart-item-total">Total: ${itemTotal(item)}</p>
            <button className="cart-item-delete" onClick={() => handleRemove(item)}>
              Eliminar
            </button>
          </div>
        </div>
      ))}

      <div className="cart-actions">
        <button onClick={(e) => { e.preventDefault(); onContinueShopping(); }}>
          Continuar comprando
        </button>
        <button onClick={handleCheckout}>Pagar</button>
      </div>
    </div>
  );
}

export default CartItem;