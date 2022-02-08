const mongoose = require("mongoose");

const QuerySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    movie_id_list: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Movie",
        },
    ],
});

module.exports = mongoose.model("Query", QuerySchema);
