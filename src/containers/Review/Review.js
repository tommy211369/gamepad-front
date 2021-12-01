// Libraries
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import "./Review.css";

const Review = ({ userToken, userReview }) => {
  // Hooks :
  const history = useHistory();
  const { id } = useParams();

  // States :
  const [reviewTitle, setReviewTitle] = useState();
  const [reviewText, setReviewText] = useState();
  const [review, setReview] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // useEffect :
  useEffect(() => {
    console.log("REVIEW");

    fetchUserReview();
  }, [id]);

  // Méthodes :
  const fetchUserReview = async () => {
    try {
      // `http://localhost:4000/user/review?token=${userToken}&gameId=${id}`;
      // `https://gamepad-tommy.herokuapp.com/user/review?token=${userToken}&gameId=${id}`;
      const responseUserReview = await axios.get(
        `https://gamepad-tommy.herokuapp.com/user/review?token=${userToken}&gameId=${id}`
      );

      // console.log("Review user >>> ", responseUserReview.data.review);
      setReview(responseUserReview.data.review);
      setIsLoading(false);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // "http://localhost:4000/reviews";
      // "https://gamepad-tommy.herokuapp.com/reviews";
      const response = await axios.post(
        "https://gamepad-tommy.herokuapp.com/reviews",
        reviewData,
        {
          headers: {
            authorization: `Bearer ${userToken}`,
          },
        }
      );

      // console.log(response.data);
      history.push(`/game/${id}`);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleDeleteReview = async () => {
    try {
      // `http://localhost:4000/user/review?token=${userToken}&gameId=${id}`;
      // `https://gamepad-tommy.herokuapp.com/user/review?token=${userToken}&gameId=${id}`;
      const responseReviewDelete = await axios.delete(
        `https://gamepad-tommy.herokuapp.com/user/review?token=${userToken}&gameId=${id}`
      );

      // console.log(responseReviewDelete.data);
      history.push(`/game/${id}`);
    } catch (error) {
      console.log(error.response);
    }
  };

  // Variables :
  const newDate = new Date(Date.now());
  let formatedDate =
    newDate.getDate() +
    "-" +
    (newDate.getMonth() + 1) +
    "-" +
    newDate.getFullYear();

  const reviewData = {
    title: reviewTitle,
    text: reviewText,
    gameId: id,
    date: formatedDate,
  };

  return isLoading ? (
    <p>Loading ...</p>
  ) : userReview ? (
    <div className="your-review">
      <h1>Your Review </h1>
      <p>
        Title : " <span>{review.title}</span> "
      </p>
      <p>
        Text : " <span>{review.text}</span> "
      </p>
      <p className="review-delete" onClick={handleDeleteReview}>
        Delete your review
      </p>
    </div>
  ) : (
    <div className="review">
      <div>
        <h1>Write a review</h1>
        <FontAwesomeIcon
          icon="times"
          className="close-review"
          onClick={() => {
            history.push(`/game/${id}`);
          }}
        />
      </div>
      <form onSubmit={handleSubmit}>
        <p>Review title</p>
        <input type="text" onChange={(e) => setReviewTitle(e.target.value)} />
        <p>Review text</p>
        <textarea onChange={(e) => setReviewText(e.target.value)}></textarea>
        <input type="submit" value="Publish" />
      </form>
    </div>
  );
};

export default Review;
