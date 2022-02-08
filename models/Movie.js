const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    img_link: {
        type: String,
    },
    rating: {
        type: String,
    },
    genre: {
        type: String,
    },
});

module.exports = mongoose.model("Movie", MovieSchema);
