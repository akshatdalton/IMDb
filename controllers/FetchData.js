const axios = require("axios").default;
const { IMDBParser, IMDBSlider } = require("./IMDBParser");

const fetch_results = async (query) => {
    // query database first
    console.log(query);
    // if not find then do web scrapping.
    try {
        const response = await axios.get("https://www.imdb.com/search/title", {
            params: {
                title: query,
            },
        });

        if (response.status !== 200) {
            console.log("Error: ", response.status, " msg: ", response.message);
            throw response.error;
        }

        const parser = new IMDBParser(response.data);

        if (parser.check_error()) {
            console.log("Nothing found!");
            return [];
        }

        parser.extract_movies_list();
        return parser.movies_list;
    } catch (error) {
        console.log("Error: ", error);
    }
};

const fetch_sliders = async () => {
    try {
        const response = await axios.get("https://www.imdb.com/");
        if (response.status !== 200) {
            console.log("Error: ", response.status, " msg: ", response.message);
            throw response.error;
        }
        return IMDBSlider(response.data);
    } catch (error) {
        console.log("Error: ", error);
    }
};

module.exports = { fetch_results, fetch_sliders };
