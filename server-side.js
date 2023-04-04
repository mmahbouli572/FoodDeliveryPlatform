const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

// Set up middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set up database connection
mongoose.connect('mongodb://localhost/mydatabase', { useNewUrlParser: true })
  .then(() => console.log('Connected to database'))
  .catch(err => console.error('Error connecting to database', err));

// Define routes
app.get('/menus', (req, res) => {
  // Retrieve menus from database and return as JSON
});

app.post('/orders', (req, res) => {
  // Validate order data and save to database
});

// Define error handling function
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(3000, () => console.log('Server running on port 3000'));
