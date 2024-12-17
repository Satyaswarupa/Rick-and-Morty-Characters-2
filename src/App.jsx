import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import EpisodeDetails from "./components/EpisodeDetails";
import Loader from "./components/Loader"; // Import the Loader component
import "./App.scss";

const App = () => {
  const [episodes, setEpisodes] = useState([]);
  const [filteredEpisodes, setFilteredEpisodes] = useState([]); // Filtered episodes for suggestions
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [loading, setLoading] = useState(true); // Loader state

  useEffect(() => {
    const fetchEpisodes = async () => {
      setLoading(true); // Show loader
      try {
        const res = await fetch("https://rickandmortyapi.com/api/episode");
        const data = await res.json();
        setEpisodes(data.results);
        setFilteredEpisodes(data.results); // Initialize filtered episodes
      } catch (error) {
        console.error("Failed to fetch episodes:", error);
      } finally {
        setLoading(false); // Hide loader
      }
    };
    fetchEpisodes();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Function to handle search and filter episodes
  const handleSearch = (query) => {
    if (!query) {
      setFilteredEpisodes(episodes); // Reset filtered episodes if query is empty
    } else {
      const filtered = episodes.filter((episode) =>
        episode.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredEpisodes(filtered);
    }
  };

  return (
    <div className="app">
      <Navbar
        onSearch={handleSearch}
        episodes={episodes}
        onSelectEpisode={(episode) => setSelectedEpisode(episode)}
      />
      <div className="content">
        {loading ? ( // Show loader while fetching data
          <Loader />
        ) : (
          <>
            {!isMobile && (
              <Sidebar
                episodes={episodes} // Always display all episodes in the sidebar
                onSelectEpisode={(episode) => setSelectedEpisode(episode)}
              />
            )}
            <EpisodeDetails selectedEpisode={selectedEpisode} />
          </>
        )}
      </div>
      {isMobile && !loading && (
        <div className="mobile-episodes">
          {episodes.map((episode) => (
            <div
              key={episode.id}
              className="mobile-episode-card"
              onClick={() => setSelectedEpisode(episode)}
            >
              {episode.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
