import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cart from './cart/cart.js';
import Home from './home/home.js';
import { BrowserRouter , Routes, Route } from 'react-router-dom';



function App() {

  return (
    <div>
       <BrowserRouter>
      <Routes>
        <Route path="/cart" element={<Cart/>} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
    </div>
     
  );
}

export default App;

