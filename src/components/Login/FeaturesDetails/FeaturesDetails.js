import React from "react";
import "./FeaturesDetails.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function FeaturesDetails() {
  return (
    <div className="features-details">
      <FontAwesomeIcon icon="gamepad" className="gamepad-logo" />
      <div>
        <h1>How it works</h1>

        <div>
          <FontAwesomeIcon icon="user" />
          <p>
            Log in to your free account to be able to get all features of
            Gamepad
          </p>
        </div>
        <div>
          <FontAwesomeIcon icon="bookmark" />
          <p>Add a game to your collection</p>
        </div>
        <div>
          <FontAwesomeIcon icon="comment-alt" />
          <p>Leave a review for a game</p>
        </div>
      </div>
    </div>
  );
}

export default FeaturesDetails;
