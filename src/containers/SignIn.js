// Librairies
import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Components
import Spinner from "../components/Spinner";

export default function SignIn({ setToken, setName }) {
  // Hooks :
  const location = useLocation();
  const history = useHistory();

  // States :
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [gameId, setGameId] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // useEffect :
  useEffect(() => {
    console.log("LOGIN");
    if (location.state) {
      setGameId(location.state.gameId);
    }
    setIsLoading(false);
  }, []);

  // Méthodes :
  const userData = {
    email: email,
    password: password,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setErrorMessage("");

      // "http://localhost:4000/login";
      // "https://gamepad-tommy.herokuapp.com/login";
      const response = await axios.post(
        "https://gamepad-tommy.herokuapp.com/login",
        userData
      );

      // console.log("LOGIN >>> ", response.data);
      setName(response.data.resUser.username);
      // set token as cookie
      setToken(response.data.resUser.token);

      if (gameId) {
        history.push(`/game/${gameId}`);
      } else {
        // return to HomePage
        history.push("/");
      }
    } catch (error) {
      console.log(error.response);
      if (error.response.status === 400) {
        setErrorMessage("Wrong password");
      } else if (error.response.status === 401) {
        setErrorMessage("Email adress unknown");
      }
    }
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="log">
      <div>
        <FontAwesomeIcon icon="gamepad" className="gamepad-logo" />
        <div>
          <h1>How it works</h1>

          <div>
            <FontAwesomeIcon icon="user" />
            <p>
              Log in to your free account to be able to get all features of
              Gamepad
            </p>
          </div>
          <div>
            <FontAwesomeIcon icon="bookmark" />
            <p>Add a game to your collection</p>
          </div>
          <div>
            <FontAwesomeIcon icon="comment-alt" />
            <p>Leave a review for a game</p>
          </div>
        </div>
      </div>
      <div>
        <div>
          <h1>Login</h1>
          <p
            style={{
              color: "#FF4655",
              textAlign: "center",
              marginBottom: "10px",
            }}
          >
            {errorMessage}
          </p>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email..."
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></input>
            <input
              type="password"
              placeholder="Password..."
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></input>
            <input type="submit" value="Connexion" />
          </form>
          <div className="toSignupLink">
            {gameId ? (
              <Link
                to={{
                  pathname: "/signup",
                  state: { gameId: gameId },
                }}
              >
                Don't have an account yet ? Sign Up
              </Link>
            ) : (
              <Link to="/signup">Don't have an account yet ? Sign Up</Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
