// Librairies
import React from "react";

const Ratings = ({ game }) => {
  return (
    <div id="ratings">
      {game.ratings.map((rating) => {
        return (
          <div key={rating.id}>
            <p>{rating.title}</p>
            <p>
              <span>{rating.percent}</span> &nbsp; %
            </p>
            <p>
              <span>{rating.count}</span> &nbsp; votes
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Ratings;
