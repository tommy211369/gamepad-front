// Librairies
// Librairies
import React from "react";

const Genres = ({ game }) => {
  // Variables :
  let genres = "";

  for (let i = 0; i < game.genres.length; i++) {
    if (i === game.genres.length - 1) {
      genres += game.genres[i].name;
    } else {
      genres += game.genres[i].name + ", ";
    }
  }

  return (
    <div>
      <p className="title">Genre</p>

      <div className="platforms">
        <p>{genres}</p>
      </div>
    </div>
  );
};

export default Genres;
