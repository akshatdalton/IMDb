import React, { useState } from "react";

import {
    Accordion,
    Alert,
    Form,
    FormControl,
    InputGroup,
    Col,
    Row,
    Card,
    Button,
} from "react-bootstrap";

const MovieCard = ({ movie }) => {
    return (
        <Col>
            {/* I will may add href. */}
            {/* <a href={movie.link}> */}
            <Card>
                <Card.Img variant="top" src={movie.img_link} />
                <Card.Body>
                    <Card.Title>{movie.title}</Card.Title>
                </Card.Body>
            </Card>
            {/* </a> */}
        </Col>
    );
};

export default MovieCard;
