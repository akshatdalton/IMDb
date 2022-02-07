const { fetch_results, fetch_sliders } = require("./FetchData");

module.exports = {
    getMovies(req, res) {
        const query = req.params.query;
        fetch_results(query)
            .then((matches) => res.json(matches))
            .catch((err) => res.status(404).json(err));
    },
    getSliders(req, res) {
        fetch_sliders()
            .then((sliders) => res.json(sliders))
            .catch((err) => res.status(404).json(err));
    },
};
