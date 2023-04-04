const express = require('express');
const router = express.Router();

// Route for adding a new restaurant
router.post('/add', (req, res) => {
  // Add restaurant to database
});

// Route for editing an existing restaurant
router.put('/:id/edit', (req, res) => {
  // Update restaurant in database
});

// Route for deleting a restaurant
router.delete('/:id', (req, res) => {
  // Delete restaurant from database
});

module.exports = router;

function isAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.isAdmin) {
      return next();
    }
    res.redirect('/login');
  }
  const express = require('express');
  const passport = require('passport');
  
  // Middleware to check if user is authenticated and authorized
  function isAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.isAdmin) {
      return next();
    }
    res.redirect('/login');
  }
  
  // Route for adding a new restaurant
  router.post('/add', isAdmin, (req, res) => {
    // Add restaurant to database
  });
  
  // Route for editing an existing restaurant
  router.put('/:id/edit', isAdmin, (req, res) => {
    // Update restaurant in database
  });
  
  // Route for deleting a restaurant
  router.delete('/:id', isAdmin, (req, res) => {
    // Delete restaurant from database
  });
  
  module.exports = router;
    