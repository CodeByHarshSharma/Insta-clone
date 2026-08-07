import React from "react";
import "../global.css";
import 'remixicon/fonts/remixicon.css'
import { useNavigate } from "react-router";

const Nav = () => {
  const navigate = useNavigate();

  return (
    <nav className="nav-bar">
      <p>Finite</p>

      <button
        onClick={() => navigate("/create-post")}
        className="button primary-button">
        <i className="ri-add-line"></i>
        New post
      </button>
    </nav>
  );
};

export default Nav;