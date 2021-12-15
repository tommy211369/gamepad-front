// Librairies
import "./App.css";
import { useState } from "react";
import Cookies from "js-cookie";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faGamepad,
  faUser,
  faBookmark,
  faCommentAlt,
  faSearch,
  faThumbsUp,
  faThumbsDown,
  faTimes,
  faUpload,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

// Components
import Home from "./containers/Home/Home";
import Game from "./containers/Game/Game";
import Favorites from "./containers/Favorites/Favorites";
import Review from "./containers/Review/Review";
import SignIn from "./containers/Log/SignIn";
import SignUp from "./containers/Log/SignUp";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ScrollToTop from "./components/ScrollToTop";
library.add(
  faGamepad,
  faUser,
  faBookmark,
  faCommentAlt,
  faSearch,
  faThumbsUp,
  faThumbsDown,
  faTimes,
  faUpload,
  faBars
);

function App() {
  // States :
  const [userToken, setUserToken] = useState(Cookies.get("userToken") || null);
  const [userName, setUserName] = useState(Cookies.get("userName") || null);
  const [allFavorites, setAllFavorites] = useState([]); // all user's favorites
  const [userReview, setUserReview] = useState(); // boolean : if user reviewed the game
  const [games, setGames] = useState([]); // all the games
  const [count, setCount] = useState(); // total of games
  const [inputSearch, setInputSearch] = useState(""); // during typing
  const [search, setSearch] = useState(""); // on search click
  const [page, setPage] = useState(1);
  const [platform, setPlatform] = useState("");
  const [genre, setGenre] = useState("");
  const [ordering, setOrdering] = useState("");
  const [platformSelected, setPlatformSelected] = useState("");
  const [genreSelected, setGenreSelected] = useState("");
  const [displayMenuBars, setDisplayMenuBars] = useState(false);

  // Méthodes :
  const setToken = (token) => {
    setUserToken(token);
    Cookies.set("userToken", token);
  };

  const setName = (name) => {
    setUserName(name);
    Cookies.set("userName", name);
  };

  const resetSearch = async () => {
    try {
      // `https://localhost:4000/games?page=1&search=""`;
      // `https://gamepad-tommy.herokuapp.com/games?page=1&search=""`;
      const response = await axios.get(
        `https://gamepad-tommy.herokuapp.com/games?page=1&search=""`
      );

      setPlatform("");
      setGenre("");
      setOrdering("");
      setInputSearch("");
      setSearch("");
      setPlatformSelected("");
      setGenreSelected("");
      setCount(response.data.count);
      setGames(response.data.results);
      setPage(1);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className="app">
      <Router>
        <ScrollToTop />
        <Header
          userToken={userToken}
          userName={userName}
          setUserName={setUserName}
          setUserToken={setUserToken}
          setAllFavorites={setAllFavorites}
          setGames={setGames}
          setCount={setCount}
          setInputSearch={setInputSearch}
          setSearch={setSearch}
          setPage={setPage}
          setPlatform={setPlatform}
          setGenre={setGenre}
          setOrdering={setOrdering}
          setPlatformSelected={setPlatformSelected}
          setGenreSelected={setGenreSelected}
          displayMenuBars={displayMenuBars}
          setDisplayMenuBars={setDisplayMenuBars}
          resetSearch={resetSearch}
        />
        <Switch>
          <Route path="/signin">
            <SignIn setToken={setToken} setName={setName} />
          </Route>
          <Route path="/signup">
            <SignUp setToken={setToken} setName={setName} />
          </Route>
          <Route path="/favorites">
            <Favorites
              userToken={userToken}
              allFavorites={allFavorites}
              setAllFavorites={setAllFavorites}
            />
          </Route>
          <Route path="/review/:id">
            <Review
              userToken={userToken}
              userReview={userReview}
              setUserReview={setUserReview}
            />
          </Route>
          <Route path="/game/:id">
            <Game
              userToken={userToken}
              userReview={userReview}
              setUserReview={setUserReview}
              allFavorites={allFavorites}
              setAllFavorites={setAllFavorites}
            />
          </Route>
          <Route path="/">
            <Home
              setGames={setGames}
              setCount={setCount}
              games={games}
              count={count}
              inputSearch={inputSearch}
              setInputSearch={setInputSearch}
              search={search}
              setSearch={setSearch}
              page={page}
              setPage={setPage}
              platform={platform}
              setPlatform={setPlatform}
              genre={genre}
              setGenre={setGenre}
              ordering={ordering}
              setOrdering={setOrdering}
              platformSelected={platformSelected}
              setPlatformSelected={setPlatformSelected}
              genreSelected={genreSelected}
              setGenreSelected={setGenreSelected}
            />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
