const fetch_results = require("./FetchData");

module.exports = {
    getMovies(req, res) {
        const query = req.params.query;
        fetch_results(query)
            .then((matches) => res.json(matches))
            .catch((err) => res.status(404).json(err));
    },
};
