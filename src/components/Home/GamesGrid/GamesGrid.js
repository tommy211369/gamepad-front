// Librairies
import React from "react";
import { Link } from "react-router-dom";
import "./GamesGrid.css";

const GamesGrid = ({ games }) => {
  return (
    <div className="games-grid">
      {games.map((game) => {
        return (
          <Link key={game.id} to={`/game/${game.id}`}>
            <p>{game.name}</p>
            <img src={game.background_image} alt={game.name} />
          </Link>
        );
      })}
    </div>
  );
};

export default GamesGrid;
