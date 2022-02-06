const JSSoup = require("jssoup").default;

module.exports = class IMDBParser {
    constructor(content) {
        this.soup = new JSSoup(content);
        this.titles = this.soup.find("table", "findList");
    }

    check_error() {
        return this.titles === undefined || this.titles === "";
    }

    extract_movies_list() {
        this.movies_list = [];
        let curr_tag = this.titles.nextElement;
        const tr_list = [curr_tag, ...curr_tag.nextSiblings];

        tr_list.forEach((movie_tag) => {
            const content = this.extract_movie_content(movie_tag);
            this.movies_list.push(content);
        });

        console.log("Done extracting ...");
    }

    extract_movie_content(movie_tag) {
        const img_tag = movie_tag.find("img");
        const a_tag = movie_tag.find("a");
        const movie = {
            title: movie_tag.text,
            link: a_tag.attrs.href,
            img_link: img_tag.attrs.src,
        };
        return movie;
    }
};
