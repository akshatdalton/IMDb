const dotenv = require("dotenv");

dotenv.config();

module.exports = {
    MONGO_DB_SECRET: process.env.MONGO_DB_SECRET,
};
