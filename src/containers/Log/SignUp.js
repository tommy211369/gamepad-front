// Libraries
import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Log.css";

// Components
import FeaturesDetails from "../../components/Login/FeaturesDetails/FeaturesDetails";
import Spinner from "../../components/Spinner";

export default function SignUp({ setToken, setName }) {
  // Hooks :
  const location = useLocation();
  const history = useHistory();

  // States :
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirm, setConfirm] = useState();
  const [picture, setPicture] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [gameId, setGameId] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // useEffect :
  useEffect(() => {
    // console.log("SIGNUP");
    if (location.state) {
      setGameId(location.state.gameId);
    }
    setIsLoading(false);
  }, []);

  // Méthodes :
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setErrorMessage("");
      const formData = new FormData();

      formData.append("email", email);
      formData.append("username", username);
      formData.append("password", password);
      formData.append("confirm", confirm);
      if (picture) {
        formData.append("picture", picture);
      }

      // "http://localhost:4000/signup";
      // "https://gamepad-backend.onrender.com/signup";
      const response = await axios.post(
        "https://gamepad-backend.onrender.com/signup",
        formData
      );

      // console.log("SIGNUP >>>", response.data);
      setName(response.data.resNewUser.username);
      // set token as cookie
      setToken(response.data.resNewUser.token);

      if (gameId) {
        history.push(`/game/${gameId}`);
      } else {
        // return to HomePage
        history.push("/");
      }
    } catch (error) {
      console.log(error.response.data);

      if (error.response.status === 409) {
        setErrorMessage("User already exist");
      } else if (error.response.status === 401) {
        setErrorMessage("Password and confirmation are different");
      } else if (error.response.status === 400) {
        setErrorMessage("Username is required / Email not valid");
      }
    }
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="log">
      <FeaturesDetails />
      <div className="log-inputs">
        <div>
          <h1>Sign up</h1>
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
              type="text"
              placeholder="Username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            ></input>
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => {
                let regEmail =
                  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                if (regEmail.test(e.target.value)) {
                  setEmail(e.target.value);
                } else {
                  setEmail("");
                }
              }}
              required
            ></input>
            <div>
              <input
                type="password"
                placeholder="Password..."
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
              ></input>
              <input
                type="password"
                placeholder="Confirm Password..."
                onChange={(e) => {
                  setConfirm(e.target.value);
                }}
                required
              ></input>
            </div>
            <div className="input-file">
              <input
                type="file"
                id="file"
                accept="image/*"
                onChange={(e) => {
                  setPicture(e.target.files[0]);
                }}
              />
              {picture ? (
                <label
                  htmlFor="file"
                  style={{ backgroundColor: "#A3A3A3", color: "white" }}
                >
                  Photo updated
                </label>
              ) : (
                <label
                  htmlFor="file"
                  style={{ backgroundColor: "white", color: "#b7b7b7" }}
                >
                  Add a photo
                </label>
              )}
              <FontAwesomeIcon icon="upload" className="upload-icon" />
              {picture && <p>{picture.name}</p>}
            </div>
            <input type="submit" value="Connexion" />
          </form>
          <div className="toSignupLink">
            {gameId ? (
              <Link
                to={{
                  pathname: "/signin",
                  state: { gameId: gameId },
                }}
              >
                Already have an account ? Log In
              </Link>
            ) : (
              <Link to="/signin">Already have an account ? Log In</Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
