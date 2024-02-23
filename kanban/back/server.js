const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const app = express();
const port = 3002;

app.use(cors());
app.use(bodyParser.json());


// Create a connection to the database
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Replace with the actual password
  database: 'kanban'
});

// Connect to the database
con.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to the database');
});

app.post('/login', (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const selectQuery = 'SELECT * FROM user WHERE email = ?';

  con.query(selectQuery, [email], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }

    if (result.length === 0) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const userInfo = { id: result[0].id, email: result[0].email };
    res.status(200).json({ message: 'Success', userInfo });
  });
});


app.post('/Signup', (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  const insertQuery = 'INSERT INTO user (email) VALUES (?)';

  con.query(insertQuery, [email], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }

    res.status(201).json({ message: 'User created successfully' });
  });
});


// Assuming the rest of your server code is here...



let tables = [];

app.get('/api/tables', async (req, res) => {
  res.json(tables);
});

app.post('/api/tables', async (req, res) => {
  const newTable = { id: tables.length + 1, columns: [] };
  tables.push(newTable);
  res.json(newTable);
});

app.post('/api/tables/:tableId/columns', async (req, res) => {
  const { tableId } = req.params;
  const { title } = req.body;

  const table = tables.find((tbl) => tbl.id == tableId);

  if (table) {
    const newColumn = { id: Date.now(), title, tasks: [] };
    table.columns.push(newColumn);
    res.json(newColumn);
  } else {
    res.status(404).send('Table not found');
  }
});

app.post('/api/tables/:tableId/tasks', async (req, res) => {
  const { tableId } = req.params;
  const { columnId, text } = req.body;

  const table = tables.find((tbl) => tbl.id == tableId);
  if (table) {
    const column = table.columns.find((col) => col.id == columnId);

    if (column) {
      const task = { id: Date.now(), text };
      column.tasks.push(task);
      res.json(task);
    } else {
      res.status(404).send('Column not found');
    }
  } else {
    res.status(404).send('Table not found');
  }
});

app.put('/api/tables/:tableId/columns/:columnId/tasks/:taskId', async (req, res) => {
  const { tableId, columnId, taskId } = req.params;
  const { newColumnId } = req.body;

  const table = tables.find((tbl) => tbl.id == tableId);

  if (table) {
    const sourceColumn = table.columns.find((col) => col.id == columnId);
    const destinationColumn = table.columns.find((col) => col.id == newColumnId);

    if (sourceColumn && destinationColumn) {
      const taskIndex = sourceColumn.tasks.findIndex((task) => task.id == taskId);
      if (taskIndex !== -1) {
        const [task] = sourceColumn.tasks.splice(taskIndex, 1);
        destinationColumn.tasks.push(task);
        res.json(task);
      } else {
        res.status(404).send('Task not found');
      }
    } else {
      res.status(404).send('Source or destination column not found');
    }
  } else {
    res.status(404).send('Table not found');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
