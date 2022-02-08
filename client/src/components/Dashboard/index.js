import React, { useEffect, useState } from "react";
import MovieCard from "../MovieCard";

import { Carousel, FormControl, InputGroup, Row } from "react-bootstrap";

import api from "../../api";

import "./dashboard.css";

const Dashboard = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [moviesList, setMoviesList] = useState([]);
    const [slides, setSlides] = useState([]);

    useEffect(() => {
        getSlides();
    }, []);

    const getSlides = async () => {
        try {
            const res = await api.get("/api/slides");
            if (res.status === 200) {
                setSlides([...res.data]);
            } else {
                console.log("Error: ", res.status);
            }
        } catch (err) {
            console.log(`Error: ${err}`);
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const res = await api.get("/api/movies/" + searchQuery);
            if (res.status === 200) {
                setSearchQuery("");
                setMoviesList([...res.data]);
            } else {
                console.error(`Error: ${res.status}`);
            }
        } catch (err) {
            console.error(`Error: ${err}`);
        }
    };

    return (
        <>
            <div className="movie-carousel">
                <Carousel fade>
                    {slides.map((slide, index) => (
                        <Carousel.Item key={index}>
                            <img
                                className="d-block w-100"
                                src={slide}
                                alt="First slide"
                            />
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>

            <div className="d-flex justify-content-center">
                <InputGroup className="movie-search mb-3">
                    <FormControl
                        placeholder="Search"
                        value={searchQuery || ""}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <InputGroup.Text
                        className="movie-input-group"
                        onClick={handleSearch}
                    >
                        <i className="fa fa-search" aria-hidden="true"></i>
                    </InputGroup.Text>
                </InputGroup>
            </div>
            <div className="movie-list">
                <Row xs={5} md={6} lg={6} className="g-4">
                    {moviesList.map((movie, index) => (
                        <MovieCard key={index} movie={movie} />
                    ))}
                </Row>
            </div>
        </>
    );
};

export default Dashboard;
