// Librairies
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// Components
import Spinner from "../components/Spinner";

export default function Favorites({
  userToken,
  allFavorites,
  setAllFavorites,
}) {
  // States :
  const [isLoading, setIsLoading] = useState(true);

  // useEffect :
  useEffect(() => {
    console.log("FAVORITES");

    fetchFavorites();
  }, []);

  // Méthodes :
  const fetchFavorites = async () => {
    try {
      // `http://localhost:4000/user/favorites?token=${userToken}`;
      // `https://gamepad-tommy.herokuapp.com/user/favorites?token=${userToken}`;
      const responseFavorites = await axios.get(
        `https://gamepad-tommy.herokuapp.com/user/favorites?token=${userToken}`
      );

      console.log("FAVORITES games >>> ", responseFavorites.data);
      setAllFavorites(responseFavorites.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleRemove = async (id) => {
    try {
      // `http://localhost:4000/user/favorites?id=${id}`;
      // `https://gamepad-tommy.herokuapp.com/user/favorites?id=${id}`;
      const response = await axios.delete(
        `https://gamepad-tommy.herokuapp.com/user/favorites?id=${id}`,
        {
          headers: {
            authorization: `Bearer ${userToken}`,
          },
        }
      );

      // console.log(response.data);
      setAllFavorites(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="favorites">
      <h1>My Collection</h1>

      {allFavorites !== null && allFavorites.length > 0 ? (
        <div className="favorites-grid">
          {allFavorites.map((game) => {
            return (
              <div key={game.gameId}>
                <Link to={`/game/${game.gameId}`}>
                  <img src={game.image} alt={game.name} />
                  <p>{game.name}</p>
                </Link>
                <p onClick={() => handleRemove(game.gameId)}>Remove</p>
              </div>
            );
          })}
        </div>
      ) : (
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          No games in your collection...
        </p>
      )}
    </div>
  );
}
