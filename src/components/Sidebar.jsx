import React from "react";
import "./Sidebar.scss";

const Sidebar = ({ episodes, onSelectEpisode }) => {
  return (
    <div className="sidebar">
      {episodes.map((episode) => (
        <div
          key={episode.id}
          className="episode-card"
          onClick={() => onSelectEpisode(episode)}
        >
          {episode.name}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
