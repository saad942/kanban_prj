import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Left from './left';
import './cart.css';

function App() {
  const user = JSON.parse(localStorage.getItem('user-info'));

  const [inputValue, setInputValue] = useState('');
  const [names, setNames] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3002/list')
      .then((response) => {
        if (response.data.message === 'success') {
          // Extracting just the names from the response
          const itemNames = response.data.names.map(item => item.name);
          setNames(itemNames);
        } else {
          console.log(response.data);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [user.id]);

  const add = (e) => {
    e.preventDefault();

    axios.post("http://localhost:3002/createList", { name: inputValue })
      .then((response) => {
        if (response.data.message === 'List created successfully') {
          console.log('List created successfully');
        } else {
          console.log(response.data);
        }
      })
      .catch((err) => {
        console.error('Error:', err);
      });
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div>
      <Left />
      <div className="container">
        <div className='input'>
          <input
            type='text'
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter cart"
            style={{ marginRight: '10px', display: 'flex' }}
          />
          <button onClick={add}>Add to Cart</button>
        </div>
        <div className="cart">
  {names.length === 0 ? (
    <p>No items in cart</p>
  ) : (
    names.map((item, index) => (
      <div key={index} className='col-4' style={{ marginRight: '10px' }}>{item}</div>
    ))
  )}
</div>
      </div>
    </div>
  );
}

export default App;
