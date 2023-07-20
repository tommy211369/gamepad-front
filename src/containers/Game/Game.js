// Librairies
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./Game.css";

// Components
import GameDetails from "../../components/Game/GameDetails/GameDetails";
import Ratings from "../../components/Game/Ratings/Ratings";
import GamesLike from "../../components/Game/GamesLike/GamesLike";
import GameReviews from "../../components/Game/GameReviews/GameReviews";
import Spinner from "../../components/Spinner";

export default function Game({
  userToken,
  userReview,
  setUserReview,
  allFavorites,
  setAllFavorites,
}) {
  // Hooks :
  const { id } = useParams(); // game id

  // States :
  const [game, setGame] = useState(); // game details
  const [isLoading, setIsLoading] = useState(true);
  const [gameExist, setGameExist] = useState();
  const [reviews, setReviews] = useState(); // all the reviews for the game

  //useEffect :
  useEffect(() => {
    fetchGameData();
  }, [id]);

  // Méthodes :
  const fetchGameData = async () => {
    try {
      // `http://localhost:4000/games/${id}`;
      // `https://gamepad-backend.onrender.com/games/${id}`;
      const response = await axios.get(
        `https://gamepad-backend.onrender.com/games/${id}`
      );

      // if userToken : get user favorites and user reviews
      if (userToken) {
        // `http://localhost:4000/user/favorites?token=${userToken}`;
        // `https://gamepad-backend.onrender.com/user/favorites?token=${userToken}`;
        const responseAllFavorite = await axios.get(
          `https://gamepad-backend.onrender.com/user/favorites?token=${userToken}`
        );

        // `http://localhost:4000/user/review?token=${userToken}&gameId=${id}`;
        // `https://gamepad-backend.onrender.com/user/review?token=${userToken}&gameId=${id}`;
        const responseUserReview = await axios.get(
          `https://gamepad-backend.onrender.com/user/review?token=${userToken}&gameId=${id}`
        );

        // console.log("GAME userAllFavorites >> ", responseAllFavorite.data);
        // console.log("GAME userReview >>> ", responseUserReview.data);
        setUserReview(responseUserReview.data.bool);
        setAllFavorites(responseAllFavorite.data);
      }

      // console.log("GAME details >>>> ", response.data);
      // console.log("GAME reviews >>>> ", responseReviews.data);
      // console.log("GAME");
      setGame(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleFavorites = async () => {
    try {
      const gameData = {
        gameId: game.id,
        gameName: game.name,
        gameImage: game.background_image,
      };

      // `http://localhost:4000/user/favorites`
      // `https://gamepad-backend.onrender.com/user/favorites`;
      const responseFavorites = await axios.post(
        `https://gamepad-backend.onrender.com/user/favorites`,
        gameData,
        {
          headers: {
            authorization: `Bearer ${userToken}`,
          },
        }
      );

      setAllFavorites(responseFavorites.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="game">
      <h1>{game.name}</h1>
      <div className="game-details-img">
        <img src={game.background_image} alt={game.name} />

        <GameDetails
          game={game}
          userToken={userToken}
          userReview={userReview}
          allFavorites={allFavorites}
          gameExist={gameExist}
          setGameExist={setGameExist}
          handleFavorites={handleFavorites}
        />
      </div>

      <Ratings game={game} />

      <GamesLike game={game} id={id} />

      <GameReviews
        userToken={userToken}
        game={game}
        id={id}
        reviews={reviews}
        setReviews={setReviews}
        isLoading={isLoading}
      />
    </div>
  );
}
