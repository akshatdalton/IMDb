const express = require("express");
const router = express.Router();

const MovieController = require("./controllers/MovieController");

// Handle everything related to Movie queries.
router.get("/api/movies/:query", MovieController.getMovies);
router.get("/api/slides", MovieController.getSlides);

module.exports = router;
