const JSSoup = require("jssoup").default;

class IMDBParser {
    constructor(content) {
        this.soup = new JSSoup(content);
        this.div_list = this.soup.find("div", "lister-list");
    }

    check_error() {
        return this.div_list === undefined;
    }

    extract_movies_list() {
        this.movies_list = [];
        let curr_tag = this.div_list.nextElement;
        const tag_list = [curr_tag, ...curr_tag.nextSiblings];

        tag_list.forEach((movie_tag) => {
            const content = this.extract_movie_content(movie_tag);
            this.movies_list.push(content);
        });
    }

    extract_movie_content(movie_tag) {
        const img_tag = movie_tag.find("img");
        let img_link;
        if (img_tag !== undefined) {
            img_link = img_tag.attrs.loadlate;
        } else {
            img_link = "";
        }

        const title_tag = movie_tag.find("h3", "lister-item-header");
        let title;
        if (title_tag !== undefined && title_tag.find("a") !== undefined) {
            title = title_tag.find("a").text;
        } else {
            title = "";
        }

        const rating_tag = movie_tag.find("div", "ratings-bar");
        let rating;
        if (
            rating_tag !== undefined &&
            rating_tag.find("strong") !== undefined
        ) {
            rating = rating_tag.find("strong").text;
        } else {
            rating = "NA";
        }

        const genre_tag = movie_tag.find("span", "genre");
        let genre;
        if (genre_tag !== undefined) {
            genre = genre_tag.text;
        } else {
            genre = "";
        }

        const movie = {
            title,
            img_link,
            rating,
            genre,
        };
        return movie;
    }
}

const IMDBSlides = (response) => {
    const soup = new JSSoup(response);
    const slides = [];

    soup.findAll("div", "swiper-slide").forEach((tag) =>
        tag.findAll("img").forEach((t, index) => {
            if (index % 2 === 1) {
                // pick only bigger slides
                slides.push(t.attrs.srcSet);
            }
        })
    );

    return slides;
};

module.exports = { IMDBSlides, IMDBParser };
