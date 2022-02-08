const { fetch_results, fetch_slides } = require("./FetchData");

module.exports = {
    getMovies(req, res) {
        const query = req.params.query;
        fetch_results(query.toLowerCase())
            .then((matches) => res.json(matches))
            .catch((err) => res.status(500).json(err));
    },
    getSlides(req, res) {
        fetch_slides()
            .then((slides) => {
                res.json(slides);
            })
            .catch((err) => res.status(500).json(err));
    },
};
