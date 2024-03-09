const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = 3002;

app.use(cors());
app.use(bodyParser.json());

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'kanban'
});

pool.on('error', (err) => {
  console.error('Error connecting to database:', err);
});

// Endpoint for user login or signup
app.post('/login-or-signup', (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  // Check if the email already exists in the database
  const selectQuery = 'SELECT * FROM user WHERE email = ?';
  pool.query(selectQuery, [email], (err, result) => {
    if (err) {
      console.error('Error:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (result.length > 0) {
      const userInfo = { id: result[0].id, email: result[0].email };
      return res.status(200).json({ message: 'Success', userInfo });
    } else {
      // If the email doesn't exist, create a new user
      const insertQuery = 'INSERT INTO user (email) VALUES (?)';
      pool.query(insertQuery, [email], (err, result) => {
        if (err) {
          console.error('Error:', err);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
        const userInfo = { id: result.insertId, email };
        return res.status(201).json({ message: 'User created and logged in successfully', userInfo });
      });
    }
  });
});

// Endpoint for creating a list
app.post('/createList', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'List name is required' });
  }

  const sql = 'INSERT INTO lists (name) VALUES (?)';
  pool.query(sql, [name], (err, result) => {
    if (err) {
      console.error('Error:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    return res.status(201).json({ message: 'List created successfully' });
  });
});


app.get('/list', (req, res) => {
  const sql = 'SELECT name FROM lists'; // Select only the 'name' column from the 'items' table
  pool.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching data:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    return res.status(200).json({ message: 'success', names: result }); // Sending only the names
  });
});

//table
app.post('/createL', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'List name is required' });
  }

  const sql = 'INSERT INTO tables (name) VALUES (?)';
  pool.query(sql, [name], (err, result) => {
    if (err) {
      console.error('Error:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    return res.status(201).json({ message: 'List created successfully' });
  });
});


app.get('/listTb', (req, res) => {
  const sql = 'SELECT name FROM tables'; 
  pool.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching data:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    return res.status(200).json({ message: 'success', names: result }); 
  });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
