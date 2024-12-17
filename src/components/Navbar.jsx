import React, { useState } from "react";
import "./Navbar.scss";

const Navbar = ({ onSearch, episodes, onSelectEpisode }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value) {
      const filteredSuggestions = episodes.filter((episode) =>
        episode.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }

    onSearch(value);
  };

  return (
    <nav className="navbar">
      <h1>Rick and Morty Episodes</h1>
      <div className="search-container">
        <input
          type="text"
          className="search-bar"
          placeholder="Search Episodes..."
          value={query}
          onChange={handleInputChange}
        />
        {suggestions.length > 0 && (
          <div className="suggestions-dropdown">
            {suggestions.map((episode) => (
              <div
                key={episode.id}
                className="suggestion-item"
                onClick={() => {
                  onSelectEpisode(episode);
                  setQuery(episode.name); // Set the selected name in the input field
                  setSuggestions([]); // Clear suggestions
                }}
              >
                {episode.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
