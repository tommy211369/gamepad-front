// Librairies
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// Components
import Spinner from "../Spinner";

const GamesLike = ({ game, id }) => {
  // States :
  const [gamesLike, setGamesLike] = useState(); // games suggested
  const [isLoading, setIsLoading] = useState(true);

  // useEffect :
  useEffect(() => {
    fetchData();
  }, [id]);

  // Méthodes :
  const fetchData = async () => {
    try {
      let genres = "";
      let developers = "";

      for (let i = 0; i < game.genres.length; i++) {
        if (i === game.genres.length - 1) {
          genres += game.genres[i].slug;
        } else {
          genres += game.genres[i].slug + ",";
        }
      }

      for (let i = 0; i < game.developers.length; i++) {
        if (i === game.developers.length - 1) {
          developers += game.developers[i].slug;
        } else {
          developers += game.developers[i].slug + ",";
        }
      }

      // `http://localhost:4000/games_like?genres=${genres}&developers=${developers}`;
      // `https://gamepad-tommy.herokuapp.com/games_like?genres=${genres}&developers=${developers}`
      const responseGamesLike = await axios.get(
        `https://gamepad-tommy.herokuapp.com/games_like?genres=${genres}&developers=${developers}`
      );

      // console.log("GamesLike >> ", responseGamesLike.data);
      console.log("GamesLike");

      const gamesLikeArray = [];
      for (let game of responseGamesLike.data) {
        if (game.id != id) {
          gamesLikeArray.push(game);
        }
      }

      setGamesLike(gamesLikeArray);
      setIsLoading(false);
    } catch (error) {
      console.log(error.response);
    }
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="games-like">
      <h2>Games Like {game.name}</h2>

      <div className="carrousel">
        {gamesLike.map((game) => {
          return (
            <Link key={game.id} to={`/game/${game.id}`}>
              <img src={game.background_image} alt={game.name} />
              <h3>{game.name}</h3>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default GamesLike;
