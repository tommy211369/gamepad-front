// Librairies
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./GameReviews.css";

// Components
import Reviews from "./Reviews/Reviews";
import Spinner from "../../Spinner";

export default function GameReviews({
  userToken,
  game,
  reviews,
  setReviews,
  id,
}) {
  // States :
  const [isLoading, setIsLoading] = useState(true);

  // useEffect :
  useEffect(() => {
    const fetchGameReviews = async () => {
      try {
        // `http://localhost:4000/reviews?gameId=${id}`;
        // `https://gamepad-backend.onrender.com/reviews?gameId=${id}`;
        const responseReviews = await axios.get(
          `https://gamepad-backend.onrender.com/reviews?gameId=${id}`
        );

        // console.log("Reviews");
        setReviews(responseReviews.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchGameReviews();
  }, [id]);

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="game-reviews">
      <h2>Reviews</h2>

      {reviews.length === 0 ? (
        <p>No reviews for this game</p>
      ) : (
        reviews
          .sort((a, b) => b.likes - a.likes)
          .map((review, index) => {
            return (
              <Reviews
                key={index}
                review={review}
                userToken={userToken}
                game={game}
              />
            );
          })
      )}
    </div>
  );
}
