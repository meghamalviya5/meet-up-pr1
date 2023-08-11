import { EventContext } from "../../contexts/EventContext";
import logo from "../../logo.svg";
import React, { useContext } from "react";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { dispatch } = useContext(EventContext);

  console.log("in navbar");
  return (
    <div className="flex flex-dir-col">
      <div className="flex nav-bar">
        <Link to="/">
          <img src={logo} alt="logo" className="logo" />
        </Link>

        <div className="flex flex-align-center relative">
          <FontAwesomeIcon
            icon={faSearch}
            className="grey-color m-s absolute"
          />
          <input
            type="search"
            className="nav-search search-input"
            placeholder="Search by title and t..."
            onChange={(e) =>
              dispatch({ type: "SEARCH_BY_TITLE_TAG", payload: e.target.value })
            }
          />
        </div>
      </div>
      <hr className="grey-color" />
    </div>
  );
};

export default Navbar;
