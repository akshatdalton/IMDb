const axios = require("axios").default;
const { IMDBParser, IMDBSlides } = require("./IMDBParser");

const Query = require("../models/Query");
const Movie = require("../models/Movie");

const fetch_results = async (query) => {
    // query database first
    const movie_list = await get_movies_list_from_db(query);
    if (movie_list.length !== 0) {
        return movie_list;
    }

    // if not find then do web scrapping.
    try {
        const response = await axios.get("https://www.imdb.com/search/title", {
            params: {
                title: query,
            },
        });

        if (response.status !== 200) {
            throw response.message;
        }

        const parser = new IMDBParser(response.data);

        if (parser.check_error()) {
            return [];
        }

        parser.extract_movies_list();

        // Do not need to wait here.
        store_movies_list(query, parser.movies_list);

        return parser.movies_list;
    } catch (error) {
        console.log(error);
    }
};

const fetch_slides = async () => {
    try {
        const response = await axios.get("https://www.imdb.com/");
        if (response.status !== 200) {
            throw response.error;
        }
        return IMDBSlides(response.data);
    } catch (error) {
        console.log("Error: ", error);
    }
};

const get_movie = async (id) => {
    return Movie.findById(id)
        .then((movie) => {
            return movie;
        })
        .catch((err) => {
            console.error(err);
            return {};
        });
};

const get_movies_list_from_db = async (query) => {
    const id_list = await Query.findOne({ name: query })
        .then((query_result) => {
            if (query_result) {
                return query_result.movie_id_list;
            } else {
                return [];
            }
        })
        .catch((err) => {
            console.error(err);
        });

    const movie_list = await Promise.all(
        id_list.map((id) => {
            return get_movie(id);
        })
    );
    return movie_list;
};

const store_movie = async (movie) => {
    let found_movie = await Movie.findOne(movie);
    if (found_movie) {
        return found_movie.id;
    }

    const newMovie = new Movie(movie);
    found_movie = await newMovie.save();
    return found_movie.id;
};

const store_movies_list = async (query, movies_list) => {
    await Promise.all(
        movies_list.map((movie) => {
            return store_movie(movie);
        })
    )
        .then((returned_id_list) => {
            return returned_id_list.filter((id) => id !== undefined);
        })
        .then((filtered_id_list) => {
            const newQuery = new Query({
                name: query,
                movie_id_list: filtered_id_list,
            });
            return newQuery.save();
        })
        .catch((err) => {
            console.error(err);
        });
};

module.exports = { fetch_results, fetch_slides };
