// Librairies
import React from "react";

const Platforms = ({ game }) => {
  // Variables :
  let platforms = "";

  for (let i = 0; i < game.platforms.length; i++) {
    if (i === game.platforms.length - 1) {
      platforms += game.platforms[i].platform.name;
    } else {
      platforms += game.platforms[i].platform.name + ", ";
    }
  }

  return (
    <div>
      <p className="title">Platforms</p>

      <div className="category">
        <p>{platforms}</p>
      </div>
    </div>
  );
};

export default Platforms;
