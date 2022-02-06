const axios = require("axios").default;
const IMDBParser = require("./IMDBParser");

const fetch_results = async (query) => {
    // query database first
    console.log(query);
    // if not find then do web scrapping.
    try {
        const response = await axios.get(
            `https://www.imdb.com/find?q=${query}&s=tt&ref_=fn_al_tt_mr`
        );

        if (response.status !== 200) {
            // do something
        }

        const parser = new IMDBParser(response.data);

        if (parser.check_error()) {
            // do something
        }

        parser.extract_movies_list();
        return parser.movies_list;
    } catch (error) {}
};

module.exports = fetch_results;
