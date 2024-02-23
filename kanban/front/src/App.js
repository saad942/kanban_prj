import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cart from './cart/cart.js';
import Home from './home/home.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



function App() {

  return (
    <div>
       <Router>
      <Routes>
        <Route path="/home" element={<Cart/>} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
    </div>
     
  );
}

export default App;

