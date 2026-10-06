import React, { useState } from 'react';
import ProductList from './ProductList';
import AboutUs from './AboutUs';
import './App.css';

function App() {
  const [showProductList, setShowProductList] = useState(false);

  return (
    <div className="app-container">
      <div className={`landing-page ${showProductList ? 'hidden' : ''}`}>
        <div className="landing-content">
          <h1>Paradise Nursery</h1>
          <p>Donde la naturaleza se encuentra con tu hogar</p>
          <button className="get-started-button" onClick={() => setShowProductList(true)}>
            Comenzar
          </button>
          <AboutUs />
        </div>
      </div>

      {showProductList && (
        <ProductList onHomeClick={() => setShowProductList(false)} />
      )}
    </div>
  );
}

export default App;