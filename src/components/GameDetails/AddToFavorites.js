// Librairies
import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AddToFavorites = ({
  userToken,
  game,
  allFavorites,
  setGameExist,
  gameExist,
  handleFavorites,
}) => {
  // useEffect :
  useEffect(() => {
    console.log("AddToFavorites");
    if (allFavorites.length > 0) {
      setGameExist(allFavorites.find((elem) => elem.gameId === game.id));
    } else if (allFavorites.length === 0) {
      setGameExist(false);
    }
  }, [allFavorites, game.id]);

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
            Save to{" "}
            <span style={{ color: "#30D33A" }}>Collection ? &nbsp;</span>{" "}
            <FontAwesomeIcon icon="bookmark" />
          </p>
        </Link>
      ) : (
        <div onClick={handleFavorites}>
          {gameExist ? (
            <p>
              Remove from{" "}
              <span style={{ color: "#ff4655" }}>Collection ? &nbsp;</span>{" "}
              <FontAwesomeIcon icon="bookmark" />
            </p>
          ) : (
            <p>
              Save to{" "}
              <span style={{ color: "#30D33A" }}>Collection ? &nbsp;</span>{" "}
              <FontAwesomeIcon icon="bookmark" />
            </p>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default AddToFavorites;
