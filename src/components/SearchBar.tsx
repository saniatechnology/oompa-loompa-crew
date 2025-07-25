import React from "react";
import "./SearchBar.css";

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => (
  <div className="search-bar">
    <label htmlFor="search-input" className="hidden-label">
      Search
    </label>
    <input type="text" placeholder="Search" value={value} onChange={onChange} className="search-input" aria-label="Search workers" id="search-input" />
    <span className="search-divider">|</span>
    <img className="search-icon" src="https://s3.eu-central-1.amazonaws.com/napptilus/level-test/imgs/ic_search.png" alt="search" />
  </div>
);

export default SearchBar;
