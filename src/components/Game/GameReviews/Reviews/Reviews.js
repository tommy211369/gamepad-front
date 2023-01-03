// Librairies
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./Reviews.css";

export default function Reviews({ review, userToken, game }) {
  // Hooks :
  const history = useHistory();

  // States :
  const [reviewError, setReviewError] = useState();
  let [likes, setLikes] = useState(review.likes);
  let [dislikes, setDislikes] = useState(review.dislikes);

  // Méthodes :
  const handleNote = async (reviewId, gameId, token, note) => {
    try {
      const response = await axios.post(
        // `http://localhost:4000/user/note?reviewId=${reviewId}&gameId=${gameId}&token=${token}&note=${note}`
        // `https://gamepad-backend.onrender.com/user/note?reviewId=${reviewId}&gameId=${gameId}&token=${token}&note=${note}`
        `https://gamepad-backend.onrender.com/user/note?reviewId=${reviewId}&gameId=${gameId}&token=${token}&note=${note}`
      );

      console.log("REVIEWS note >>> ", response.data);
      if (response.data.message === "Like added") {
        setLikes((likes += 1));
        setReviewError("");
      } else if (response.data.message === "Dislike added") {
        setDislikes((dislikes += 1));
        setReviewError("");
      } else if (response.data.message === "Like deleted") {
        setLikes((likes -= 1));
        setReviewError("");
      } else if (response.data.message === "Dislike deleted") {
        setDislikes((dislikes -= 1));
        setReviewError("");
      } else if (response.data.code === 2) {
        // setReviewError("You have already liked this review");
        setDislikes((dislikes += 1));
        setLikes((likes -= 1));
      } else if (response.data.code === 1) {
        // setReviewError("You have already disliked this review");
        setLikes((likes += 1));
        setDislikes((dislikes -= 1));
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  // Variables :
  const date = review.date;
  const dateArray = date.split("-");
  const year = dateArray[2]; // 2021
  const month = dateArray[1]; // 8
  const day = dateArray[0]; // 22

  let newMonth = "";

  switch (month) {
    case "1":
      newMonth = "Jan";
      break;
    case "2":
      newMonth = "Feb";
      break;
    case "3":
      newMonth = "Mar";
      break;
    case "4":
      newMonth = "Apr";
      break;
    case "5":
      newMonth = "May";
      break;
    case "6":
      newMonth = "Jun";
      break;
    case "7":
      newMonth = "Jul";
      break;
    case "8":
      newMonth = "Aug";
      break;
    case "9":
      newMonth = "Sep";
      break;
    case "10":
      newMonth = "Oct";
      break;
    case "11":
      newMonth = "Nov";
      break;
    case "12":
      newMonth = "Dec";
      break;
    default:
      console.log("error Switch");
  }

  let newDate = `${newMonth} ${day}, ${year}`;

  return (
    <div className="reviews">
      <div>
        <h3>{review.title}</h3>
        <p>{review.text}</p>

        <div>
          {review.user.picture && (
            <img src={review.user.picture.secure_url} alt={review.user.email} />
          )}

          <div>
            <p>{newDate}</p>
            <p>{review.user.username}</p>
          </div>
        </div>
      </div>
      <div>
        <p>{reviewError}</p>
        <div
          className={likes > 0 ? "likes" : "thumbs"}
          onClick={() => {
            if (userToken) {
              if (userToken !== review.user.token) {
                handleNote(review._id, game.id, userToken, "like");
              } else {
                setReviewError("Can't like your own review !");
              }
            } else {
              history.push("/signin");
            }
          }}
        >
          <FontAwesomeIcon icon="thumbs-up" />
          {likes > 0 ? <span>+ {likes}</span> : <span>{likes}</span>}
        </div>
        <div
          className={dislikes > 0 ? "dislikes" : "thumbs"}
          onClick={() => {
            if (userToken) {
              if (userToken !== review.user.token) {
                handleNote(review._id, game.id, userToken, "dislike");
              } else {
                setReviewError("Can't dislike your own review !");
              }
            } else {
              history.push("/signin");
            }
          }}
        >
          <FontAwesomeIcon icon="thumbs-down" />
          {dislikes > 0 ? <span>+ {dislikes}</span> : <span>{dislikes}</span>}
        </div>
      </div>
    </div>
  );
}
