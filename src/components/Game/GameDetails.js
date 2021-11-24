// Librairies
import React from "react";

// Components
import AddToFavorites from "../GameDetails/AddToFavorites";
import AddReview from "../GameDetails/AddReview";
import Platforms from "../GameDetails/Platforms";
import Genres from "../GameDetails/Genres";
import Developers from "../GameDetails/Developers";
import ReleasedDate from "../GameDetails/ReleasedDate";
import Publishers from "../GameDetails/Publishers";

const GameDetails = ({
  game,
  userToken,
  userReview,
  allFavorites,
  gameExist,
  setGameExist,
  handleFavorites,
}) => {
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
      <p>{game.description_raw}</p>
    </div>
  );
};

export default GameDetails;
