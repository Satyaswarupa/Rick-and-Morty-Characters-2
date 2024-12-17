import React, { useState, useEffect } from "react";
import "./EpisodeDetails.scss";
import Characters from "./Characters";
import Loader from "./Loader"; // Import the Loader component

const EpisodeDetails = ({ selectedEpisode }) => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchCharacters = async () => {
      if (selectedEpisode) {
        setLoading(true); // Show loader
        try {
          const characterPromises = selectedEpisode.characters.map((url) =>
            fetch(url).then((res) => res.json())
          );
          const characterData = await Promise.all(characterPromises);
          setCharacters(characterData);
        } catch (error) {
          console.error("Error fetching characters:", error);
        } finally {
          setLoading(false); // Hide loader
        }
      }
    };
    fetchCharacters();
  }, [selectedEpisode]);

  return (
    <div className="episode-details">
      {selectedEpisode ? (
        <>
          <h2>{selectedEpisode.name}</h2>
          <p>{selectedEpisode.air_date}</p>
          {loading ? (
            <Loader /> // Loader appears only in this container
          ) : (
            <div className="characters">
              {characters.map((character) => (
                <div key={character.id} className="character-card">
                  <img src={character.image} alt={character.name} />
                  <p>{character.name}</p>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <Characters />
      )}
    </div>
  );
};

export default EpisodeDetails;
