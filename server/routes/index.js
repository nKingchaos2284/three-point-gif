const express = require('express');
const path = require('path');
const router = express.Router();
require('dotenv').config();

// Serves the client-side application
router.use(express.static(path.join(__dirname, '../build')));

// Defines a route that serves the client-side application
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

// Existing routes
router.get('/search', (req, res, next) => {
  res.json({ search: 'search' });
});

router.post('/search', (req, res, next) => {
  // Handles search request
});

module.exports = router;
