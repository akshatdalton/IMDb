import React, { useState } from "react";
import MovieCard from "../MovieCard";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    Accordion,
    Alert,
    Form,
    FormControl,
    InputGroup,
    Col,
    Row,
    Button,
} from "react-bootstrap";

import api from "../../api";

import "./dashboard.css";

const Dashboard = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [moviesList, setMoviesList] = useState([
        { title: "Attack on Titan", img_link: "", rating: "9.8", genre: "action" },
    ]);

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
