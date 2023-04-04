// Require the Express.js framework
const express = require('express');

// Create an instance of the Express.js framework
const app = express();

// Set up middleware
// Body-parser middleware to parse JSON and URL-encoded data
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create routes
// Example route to handle GET requests to the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the Food Delivery Platform');
});

// Set up error handling middleware
const errorHandler = require('error-handler');
app.use(errorHandler());

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  pool.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
    if (error) {
      console.error('Database error:', error);
      res.status(500).send('Server error');
    } else if (results.length === 0) {
      res.status(401).send('Invalid email or password');
    } else {
      const user = results[0];
      bcrypt.compare(password, user.password, (error, isMatch) => {
        if (error) {
          console.error('Encryption error:', error);
          res.status(500).send('Server error');
        } else if (!isMatch) {
          res.status(401).send('Invalid email or password');
        } else {
          res.status(200).send('Login successful');
        }
      });
    }
  });
});

const express = require('express');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.post('/register', (req, res) => {
  // handler for registering a new user
});

app.post('/login', (req, res) => {
  // handler for logging in a user
});

app.get('/menu', (req, res) => {
  // handler for getting the menu
});

app.post('/order', (req, res) => {
  // handler for placing an order
});

app.get('/order/:id', (req, res) => {
  // handler for getting an order by ID
});

app.get('/orders', (req, res) => {
  // handler for getting all orders
});

app.get('/delivery/:id', (req, res) => {
  // handler for getting delivery information by ID
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

const express = require('express');
const router = express.Router();
const db = require('./database');

// Route for registering a new user
router.post('/register', (req, res) => {
  const { username, email, password } = req.body;

  // Check if username or email already exists in the database
  db.query('SELECT * FROM users WHERE username = ? OR email = ?', [username, email], (error, results) => {
    if (error) throw error;

    if (results.length > 0) {
      // User with the same username or email already exists
      res.status(409).json({ message: 'Username or email already exists' });
    } else {
      // Insert the new user into the database
      db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password], (error, results) => {
        if (error) throw error;
        res.status(201).json({ message: 'User registered successfully' });
      });
    }
  });
});

module.exports = router;

// Place order route
app.post('/orders', (req, res) => {
  const { userId, items } = req.body;

  // Validate input
  if (!userId || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  // Insert order into database
  const query = 'INSERT INTO orders (user_id, items) VALUES (?, ?)';
  const values = [userId, JSON.stringify(items)];

  pool.query(query, values, (error, results) => {
    if (error) {
      console.error('Error placing order:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }

    const orderId = results.insertId;
    return res.json({ orderId });
  });
});

// Track delivery route
app.get('/orders/:id/delivery', (req, res) => {
  const orderId = req.params.id;

  // Get order from database
  const query = 'SELECT * FROM orders WHERE id = ?';
  const values = [orderId];

  pool.query(query, values, (error, results) => {
    if (error) {
      console.error('Error getting order:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const order = results[0];

    // Get delivery status from external API
    const deliveryStatus = getDeliveryStatus(order);

    return res.json({ deliveryStatus });
  });
});
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
app.use(passport.initialize());
app.use(passport.session());
app.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);
app.post('/register', function(req, res) {
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;

  // validate user input
  // ...

  // save user data to database
  db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password], function (error, results, fields) {
    if (error) throw error;
    res.redirect('/');
  });
});

app.get('/admin', isAdmin, (req, res) => {
  res.render('admin', { user: req.user });
});

app.get('/admin/restaurants/add', isAdmin, (req, res) => {
  res.render('addRestaurant', { user: req.user });
});

app.post('/admin/restaurants/add', isAdmin, (req, res) => {
  const { name, description, image, menu, price } = req.body;
  pool.query('INSERT INTO restaurants (name, description, image, menu, price) VALUES (?, ?, ?, ?, ?)', [name, description, image, menu, price], (error, results) => {
    if (error) throw error;
    res.redirect('/admin');
  });
});

app.get('/admin/restaurants/edit/:id', isAdmin, (req, res) => {
  const { id } = req.params;
  pool.query('SELECT * FROM restaurants WHERE id = ?', [id], (error, results) => {
    if (error) throw error;
    res.render('editRestaurant', { user: req.user, restaurant: results[0] });
  });
});

app.post('/admin/restaurants/edit/:id', isAdmin, (req, res) => {
  const { name, description, image, menu, price } = req.body;
  const { id } = req.params;
  pool.query('UPDATE restaurants SET name = ?, description = ?, image = ?, menu = ?, price = ? WHERE id = ?', [name, description, image, menu, price, id], (error, results) => {
    if (error) throw error;
    res.redirect('/admin');
  });
});

// Display edit form for a specific restaurant
app.get('/admin/restaurants/:id/edit', (req, res) => {
  const { id } = req.params;
  pool.query('SELECT * FROM restaurants WHERE id = ?', [id], (error, results) => {
    if (error) throw error;
    res.render('edit-restaurant', { restaurant: results[0] });
  });
});

// Handle edit form submission for a specific restaurant
app.post('/admin/restaurants/:id/edit', (req, res) => {
  const { id } = req.params;
  const { name, menu } = req.body;
  pool.query(
    'UPDATE restaurants SET name = ?, menu = ? WHERE id = ?',
    [name, menu, id],
    (error, results) => {
      if (error) throw error;
      res.redirect('/admin/restaurants');
    }
  );
});
const mysql = require('mysql');

function createConnection() {
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Okokok123.',
    database: 'fooddelivery'
  });

  connection.connect((error) => {
    if (error) {
      console.error('Error connecting to database: ' + error.stack);
      return;
    }

    console.log('Connected to database.');
  });

  return connection;
}

module.exports = createConnection;
const createConnection = require('./db');
const connection = createConnection();
connection.end((error) => {
  if (error) {
    console.error('Error closing database connection: ' + error.stack);
    return;
  }

  console.log('Database connection closed.');
});
