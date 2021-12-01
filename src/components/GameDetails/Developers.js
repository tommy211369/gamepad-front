// Librairies
import React from "react";

const Developers = ({ game }) => {
  // Variables :
  let developers = "";

  for (let i = 0; i < game.developers.length; i++) {
    if (i === game.developers.length - 1) {
      developers += game.developers[i].name;
    } else {
      developers += game.developers[i].name + ", ";
    }
  }

  return (
    <div>
      <p className="title">Developer</p>
      <div className="category">
        <p>{developers}</p>
      </div>
    </div>
  );
};

export default Developers;
