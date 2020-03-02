import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <a href="index.html" className="navbar-brand" id="nameTag">
        The BookUp
      </a>
      <button
        className="navbar-toggler"
        data-toggle="collapse"
        data-target="#navbarMenu"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarMenu">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link
              to="/addBook"
              className={
                window.location.pathname === "/addBook"
                  ? "nav-link active"
                  : "nav-link"
              }
              style={{ textDecoration: "none", color: "white" }}
            >
              Sell My Book
            </Link>
          </li>
          <Link
            to="/bookSearch"
            className={
              window.location.pathname === "/bookSearch"
                ? "nav-link active"
                : "nav-link"
            }
            style={{ textDecoration: "none", color: "white" }}
          >
            Books For Sale
          </Link>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;