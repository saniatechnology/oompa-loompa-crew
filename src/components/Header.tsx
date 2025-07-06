import React from "react";
import { Link } from "react-router";
import "./Header.css";

const Header: React.FC = () => (
  <header className="header">
    <div className="header-content">
      <img className="header__logo" src="https://s3.eu-central-1.amazonaws.com/napptilus/level-test/imgs/logo-umpa-loompa.png" alt="Logo" />
      <Link className="header__title" to="/">
        Oompa Loompa's Crew
      </Link>
    </div>
  </header>
);

export default Header;
