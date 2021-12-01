// Librairies
import React from "react";
import "./Filters.css";

const Filters = ({
  platforms,
  platformSelected,
  setPlatform,
  setPlatformSelected,
  genreSelected,
  setGenre,
  setGenreSelected,
  genres,
  ordering,
  setOrdering,
}) => {
  return (
    <div className="filters">
      <div>
        <div>
          <p>
            Platform :
            {platformSelected ? (
              <span> {platformSelected}</span>
            ) : (
              <span> All</span>
            )}
          </p>
          <ul>
            <li
              onClick={() => {
                setPlatform("");
                setPlatformSelected("");
              }}
            >
              All
            </li>
            {platforms.map((platform) => {
              return (
                <li
                  key={platform.id}
                  onClick={() => {
                    setPlatform(platform.id);
                    setPlatformSelected(platform.name);
                  }}
                >
                  {platform.name}
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <p>
            Type :
            {genreSelected ? <span> {genreSelected}</span> : <span> All</span>}
          </p>
          <ul>
            <li
              onClick={() => {
                setGenre("");
                setGenreSelected("");
              }}
            >
              All
            </li>
            {genres.map((genre) => {
              return (
                <li
                  key={genre.id}
                  onClick={() => {
                    setGenre(genre.id);
                    setGenreSelected(genre.name);
                  }}
                >
                  {genre.name}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div>
        <div>
          <p>
            Sort by :
            {ordering ? (
              <span className="sort"> {ordering}</span>
            ) : (
              <span> Default</span>
            )}
          </p>
          <ul>
            <li onClick={() => setOrdering("")}>Default</li>
            <li onClick={() => setOrdering("name")}>Name</li>
            <li onClick={() => setOrdering("released")}>Released</li>
            <li onClick={() => setOrdering("added")}>Added</li>
            <li onClick={() => setOrdering("created")}>Created</li>
            <li onClick={() => setOrdering("updated")}>Updated</li>
            <li onClick={() => setOrdering("rating")}>Rating</li>
            <li onClick={() => setOrdering("metacritic")}>Metacritic</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Filters;
