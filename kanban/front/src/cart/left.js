import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './left.css'; 
import {  useNavigate } from 'react-router-dom';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [names, setNames] = useState([]);
  const [selectedTableName, setSelectedTableName] = useState('');
  const [tableContent, setTableContent] = useState([]);
  const navigate =useNavigate()

  useEffect(() => {
    axios.get('http://localhost:3002/listTb')
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
  }, []);

  const add = (e) => {
    e.preventDefault();

    axios.post("http://localhost:3002/createL", { name: inputValue })
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

  const fetchTableContent = (tableName) => {
    axios.get(`http://localhost:3002/getTableContent/${tableName}`)
      .then((response) => {
        if (response.data.message === 'success') {
          setTableContent(response.data.content);
        } else {
          console.log(response.data);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleTableNameClick = (tableName) => {
    setSelectedTableName(tableName);
    fetchTableContent(tableName);
  };

  return (
    <div>
      <div className="left-sidebar">
        <div className="cart">
          {names.length === 0 ? (
            <p>No items in cart</p>
          ) : (
            names.map((item, index) => (
              <div key={index} onClick={() => handleTableNameClick(item)}>
                <span onClick={()=>navigate('/')}>{item}</span>
              </div>
            ))
          )}
        </div>
        
        <div className='input'>
          <input
            type='text'
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter cart"
          />
          <button onClick={add}>Add to Cart</button>
        </div>

        <div className="table-content">
          {selectedTableName && (
            <div>
              <h2>{selectedTableName}</h2>
              {tableContent.map((row, index) => (
                <div key={index}>
                  {Object.values(row).map((value, index) => (
                    <span key={index}>{value} </span>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
