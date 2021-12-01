// Librairies
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Home.css";

// Components
import SearchBloc from "../../components/Home/SearchBloc/SearchBloc";
import GamesGrid from "../../components/Home/GamesGrid/GamesGrid";
import Filters from "../../components/Home/Filters/Filters";
import Pagination from "../../components/Home/Pagination/Pagination";
import Spinner from "../../components/Spinner";

export default function Home({
  setGames,
  setCount,
  games,
  count,
  inputSearch,
  setInputSearch,
  search,
  setSearch,
  page,
  setPage,
  platform,
  setPlatform,
  genre,
  setGenre,
  ordering,
  setOrdering,
  platformSelected,
  setPlatformSelected,
  genreSelected,
  setGenreSelected,
}) {
  // States :
  const [platforms, setPlatforms] = useState();
  const [genres, setGenres] = useState();
  const [gamesOnSearch, setGamesOnSearch] = useState([]); // all the games during games searching
  const [display, setDisplay] = useState(false); // display the autocomplete container
  const [isLoading, setIsLoading] = useState(true);
  const wrapperRef = useRef(null);

  //useEffect :
  useEffect(() => {
    fetchData();
  }, [page]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Méthodes :
  const fetchData = async () => {
    try {
      // `http://localhost:4000/games?page=${page}&search=${inputSearch}&ordering=${ordering}&platforms=${platform}&genres=${genre}`;
      // `https://gamepad-tommy.herokuapp.com/games?page=${page}&search=${inputSearch}&ordering=${ordering}&platforms=${platform}&genres=${genre}`;
      const response = await axios.get(
        `https://gamepad-tommy.herokuapp.com/games?page=${page}&search=${inputSearch}&ordering=${ordering}&platforms=${platform}&genres=${genre}`
      );

      // `http://localhost:4000/platforms`;
      // `https://gamepad-tommy.herokuapp.com/platforms`;
      const responsePlatforms = await axios.get(
        `https://gamepad-tommy.herokuapp.com/platforms`
      );

      // `http://localhost:4000/genres`;
      // `https://gamepad-tommy.herokuapp.com/genres`;
      const responseGenres = await axios.get(
        `https://gamepad-tommy.herokuapp.com/genres`
      );

      console.log("HOME");
      setPlatforms(responsePlatforms.data.results);
      setGenres(responseGenres.data.results);
      setCount(response.data.count);
      setGames(response.data.results);
      setIsLoading(false);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleClickOutside = (e) => {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(e.target)) {
      setDisplay(false);
    }
  };

  const handleSubmitSearch = async () => {
    try {
      // `http://localhost:4000/games?page=1&search=${inputSearch}&ordering=${ordering}&platforms=${platform}&genres=${genre}`;
      // `https://gamepad-tommy.herokuapp.com/games?page=1&search=${inputSearch}&ordering=${ordering}&platforms=${platform}&genres=${genre}`;
      const response = await axios.get(
        `https://gamepad-tommy.herokuapp.com/games?page=1&search=${inputSearch}&ordering=${ordering}&platforms=${platform}&genres=${genre}`
      );

      setPage(1);
      setSearch(inputSearch);
      setCount(response.data.count);
      setGames(response.data.results);
      setDisplay(false);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleOnSearch = async (e) => {
    try {
      setInputSearch(e.target.value);
      // `http://localhost:4000/games?page=${page}&search=${e.target.value}&ordering=${ordering}&platforms=${platform}&genres=${genre}`;
      // `https://gamepad-tommy.herokuapp.com/games?page=${page}&search=${e.target.value}&ordering=${ordering}&platforms=${platform}&genres=${genre}`;
      const response = await axios.get(
        `https://gamepad-tommy.herokuapp.com/games?page=1&search=${e.target.value}&ordering=${ordering}&platforms=${platform}&genres=${genre}`
      );

      setDisplay(true);
      setGamesOnSearch(response.data.results);
      console.log("HOME : games on search...");
    } catch (error) {
      console.log(error.response);
    }
  };

  const setGameOnSearch = async (game) => {
    await setInputSearch(game);
    setDisplay(false);
  };

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setPage(selectedPage + 1);
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="home">
      <SearchBloc
        inputSearch={inputSearch}
        setInputSearch={setInputSearch}
        handleSubmitSearch={handleSubmitSearch}
        search={search}
        count={count}
        display={display}
        handleOnSearch={handleOnSearch}
        setDisplay={setDisplay}
        gamesOnSearch={gamesOnSearch}
        setGameOnSearch={setGameOnSearch}
        wrapperRef={wrapperRef}
      />

      <Filters
        platforms={platforms}
        platformSelected={platformSelected}
        setPlatform={setPlatform}
        setPlatformSelected={setPlatformSelected}
        genreSelected={genreSelected}
        setGenre={setGenre}
        setGenreSelected={setGenreSelected}
        genres={genres}
        ordering={ordering}
        setOrdering={setOrdering}
      />

      <Pagination
        setPage={setPage}
        count={count}
        page={page}
        handlePageClick={handlePageClick}
      />

      <GamesGrid games={games} />
    </div>
  );
}
