// Librairies
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AddReview = ({ userToken, game, userReview }) => {
  return (
    <Fragment>
      {!userToken ? (
        <Link
          to={{
            pathname: "/signin",
            state: { gameId: game.id },
          }}
        >
          <p>
            Add a Review &nbsp;
            <FontAwesomeIcon icon="comment-alt" />
          </p>
        </Link>
      ) : (
        <Fragment>
          {userReview ? (
            <Link to={`/review/${game.id}`}>
              Your review &nbsp;
              <FontAwesomeIcon icon="comment-alt" />
            </Link>
          ) : (
            <Link to={`/review/${game.id}`}>
              Add a Review &nbsp;
              <FontAwesomeIcon icon="comment-alt" />
            </Link>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default AddReview;
