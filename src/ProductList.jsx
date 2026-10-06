import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

const img = (seed) => `https://picsum.photos/seed/${seed}/300/200`;

const plantsArray = [
  {
    category: 'Plantas Aromáticas',
    plants: [
      { name: 'Lavanda', image: img('lavanda'), description: 'Aroma relajante y flores moradas.', cost: 15 },
      { name: 'Menta', image: img('menta'), description: 'Fresca y de rápido crecimiento.', cost: 12 },
      { name: 'Romero', image: img('romero'), description: 'Perfecta para cocinar y perfumar.', cost: 14 },
      { name: 'Albahaca', image: img('albahaca'), description: 'Hoja aromática para tus recetas.', cost: 10 },
      { name: 'Jazmín', image: img('jazmin'), description: 'Flores blancas de olor intenso.', cost: 18 },
      { name: 'Citronela', image: img('citronela'), description: 'Aroma cítrico que aleja mosquitos.', cost: 16 },
    ],
  },
  {
    category: 'Plantas Medicinales',
    plants: [
      { name: 'Aloe Vera', image: img('aloevera'), description: 'Calma la piel y las quemaduras.', cost: 13 },
      { name: 'Manzanilla', image: img('manzanilla'), description: 'Ideal para infusiones digestivas.', cost: 11 },
      { name: 'Equinácea', image: img('equinacea'), description: 'Refuerza las defensas.', cost: 17 },
      { name: 'Caléndula', image: img('calendula'), description: 'Cuida y regenera la piel.', cost: 12 },
      { name: 'Tomillo', image: img('tomillo'), description: 'Alivia la tos y las vías respiratorias.', cost: 9 },
      { name: 'Valeriana', image: img('valeriana'), description: 'Ayuda a conciliar el sueño.', cost: 16 },
    ],
  },
  {
    category: 'Plantas Purificadoras del Aire',
    plants: [
      { name: 'Sansevieria', image: img('sansevieria'), description: 'Resistente, casi no necesita riego.', cost: 20 },
      { name: 'Pothos', image: img('pothos'), description: 'Colgante y muy fácil de cuidar.', cost: 14 },
      { name: 'Lirio de la Paz', image: img('lirio'), description: 'Flores blancas y filtra toxinas.', cost: 19 },
      { name: 'Helecho de Boston', image: img('helecho'), description: 'Aporta humedad al ambiente.', cost: 18 },
      { name: 'Palmera Areca', image: img('areca'), description: 'Aspecto tropical y gran purificadora.', cost: 25 },
      { name: 'Cinta', image: img('cinta'), description: 'Crece rápido y es muy resistente.', cost: 11 },
    ],
  },
];

function ProductList({ onHomeClick }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [showCart, setShowCart] = useState(false);

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const isInCart = (name) => cartItems.some((item) => item.name === name);

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-brand">Paradise Nursery</div>
        <div className="navbar-links">
          <a href="#" onClick={(e) => { e.preventDefault(); onHomeClick(); }}>Inicio</a>
          <a href="#" onClick={(e) => { e.preventDefault(); setShowCart(false); }}>Plantas</a>
          <a href="#" className="cart-link" onClick={(e) => { e.preventDefault(); setShowCart(true); }}>
            🛒 <span className="cart-count">{totalQuantity}</span>
          </a>
        </div>
      </nav>

      {!showCart ? (
        <div className="product-grid">
          {plantsArray.map((group) => (
            <section key={group.category}>
              <h2 className="category-title">{group.category}</h2>
              <div className="cards">
                {group.plants.map((plant) => (
                  <div className="product-card" key={plant.name}>
                    <img className="product-image" src={plant.image} alt={plant.name} />
                    <h3>{plant.name}</h3>
                    <p>{plant.description}</p>
                    <p className="product-price">${plant.cost}</p>
                    <button
                      className="product-button"
                      disabled={isInCart(plant.name)}
                      onClick={() => handleAddToCart(plant)}
                    >
                      {isInCart(plant.name) ? 'Añadida' : 'Agregar al carrito'}
                    </button>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      )}
    </div>
  );
}

export default ProductList;