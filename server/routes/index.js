const express = require("express");
const router = express.Router();
require("dotenv").config();
const axios = require("axios");

router.get("/", (req, res, next) => {
  const url = `http://api.giphy.com/v1/gifs/random?api_key=${process.env.GIPHY_API_KEY}`;
  axios.get(url).then(response => {
    const imgUrl = response.data.data.images.original.url;
    res.render("index", { title: "Welcome To In A GIFFY!", imgUrl: imgUrl });
  })
  .catch(err => {
    console.error(err);
  });
});

router.get("/search", (req, res, next) => {
  res.render("search");
});

router.post("/search", (req, res, next) => {
  const query = req.body["giphy-query"];
  const url = `http://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&q=${query}&limit=20`;
  axios.get(url).then(response => {
    console.log(response.data.data[0].images);
    const searchResultUrl = response.data.data;
    res.render("search", { searchResultUrl: searchResultUrl });
  })
  .catch(err => {
    console.error(err);
  });
});

module.exports = router;
