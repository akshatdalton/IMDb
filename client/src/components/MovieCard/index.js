import React from "react";

import { Card, Col } from "react-bootstrap";

import "./moviecard.css";

const MovieCard = ({ movie }) => {
    return (
        <Col>
            {/* I will may add href. */}
            {/* <a href={movie.link}> */}
            <div className="shadow p-3 mb-5 bg-white rounded">
                <Card className="movie-card">
                    <Card.Img variant="top" src={movie.img_link} />
                    <Card.Body>
                        <Card.Title>{movie.title}</Card.Title>
                        {movie.rating} | {movie.genre}
                    </Card.Body>
                </Card>
            </div>
            {/* </a> */}
        </Col>
    );
};

export default MovieCard;
