const userRoutes = require('../controllers/userRoutes');
const express = require('express');
const path = require('path');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

// Serves the client-side application
router.use(express.static(path.join(__dirname, '../client/build')));
router.use("/user", userRoutes);
// Defines a route that serves the client-side application
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Existing routes
router.get('/search', (req, res, next) => {
  res.json({ search: 'search' });
});

router.post('/search', (req, res, next) => {
  const query = req.body["giphy-query"];
  const url = `http://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&q=${query}&limit=20`;

  axios.get(url)
    .then(response => {
      const searchResultUrl = response.data.data;
      res.json({ searchResultUrl });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    });
});

module.exports = router;
