// Librairies
import React from "react";

const Publishers = ({ game }) => {
  // Variables :
  let publishers = "";

  for (let i = 0; i < game.publishers.length; i++) {
    if (i === game.publishers.length - 1) {
      publishers += game.publishers[i].name;
    } else {
      publishers += game.publishers[i].name + ", ";
    }
  }
  return (
    <div>
      <p className="title">Publisher</p>
      <div className="platforms">
        <p>{publishers}</p>
      </div>
    </div>
  );
};

export default Publishers;
