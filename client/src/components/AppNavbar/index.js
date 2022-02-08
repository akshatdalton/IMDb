import React from "react";

import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";

import "./appnavbar.css";

const AppNavbar = () => {
    return (
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark p-md-3">
            <div className="container">
                <a className="navbar-brand" href="#">
                    <img src="/IMDb-Logo.svg" className="navbar-brand-img" />
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <div className="mx-auto"></div>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <strong>
                                <a className="nav-link text-white" href="#">
                                    MOVIES
                                </a>
                            </strong>
                        </li>
                        <li className="nav-item">
                            <strong>
                                <a className="nav-link text-white" href="#">
                                    CELEBS & PHOTOS
                                </a>
                            </strong>
                        </li>
                        <li className="nav-item">
                            <strong>
                                <a className="nav-link text-white" href="#">
                                    COMMUNITY
                                </a>
                            </strong>
                        </li>
                        <li className="nav-item">
                            <strong>
                                <a className="nav-link text-white" href="#">
                                    NEWS
                                </a>
                            </strong>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default AppNavbar;
