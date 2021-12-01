// Librairies
import React, { useState } from "react";
import "./GameDetails.css";

// Components
import AddToFavorites from "../../GameDetails/AddToFavorites";
import AddReview from "../../GameDetails/AddReview";
import Platforms from "../../GameDetails/Platforms";
import Genres from "../../GameDetails/Genres";
import Developers from "../../GameDetails/Developers";
import ReleasedDate from "../../GameDetails/ReleasedDate";
import Publishers from "../../GameDetails/Publishers";

const GameDetails = ({
  game,
  userToken,
  userReview,
  allFavorites,
  gameExist,
  setGameExist,
  handleFavorites,
}) => {
  // States
  const [seeMore, setSeeMore] = useState(false);

  // Fonctions
  const detailsToggleHandler = () => {
    setSeeMore(!seeMore);
  };

  return (
    <div className="game-details">
      <div>
        <AddToFavorites
          userToken={userToken}
          game={game}
          allFavorites={allFavorites}
          gameExist={gameExist}
          setGameExist={setGameExist}
          handleFavorites={handleFavorites}
        />

        <AddReview userToken={userToken} game={game} userReview={userReview} />
      </div>

      <div>
        <Platforms game={game} />

        <Genres game={game} />
      </div>
      <div>
        <ReleasedDate game={game} />

        <Developers game={game} />
      </div>
      <div>
        <Publishers game={game} />

        <div>
          <p className="title">Rating</p>
          <p>{game.rating}</p>
        </div>
      </div>
      <p className="title">About</p>
      {seeMore ? (
        <p className="game-description-full">{game.description_raw}</p>
      ) : (
        <p className="game-description-mini">{game.description_raw}</p>
      )}

      {!seeMore ? (
        <p className="see-more-less" onClick={detailsToggleHandler}>
          see more
        </p>
      ) : (
        <p className="see-more-less" onClick={detailsToggleHandler}>
          see less
        </p>
      )}
    </div>
  );
};

export default GameDetails;
