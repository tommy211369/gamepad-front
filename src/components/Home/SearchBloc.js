// Libraires
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchBloc = ({
  inputSearch,
  search,
  handleOnSearch,
  count,
  handleSubmitSearch,
  display,
  gamesOnSearch,
  wrapperRef,
  setGameOnSearch,
}) => {
  return (
    <div className="search-bloc" ref={wrapperRef}>
      <div>
        <FontAwesomeIcon icon="gamepad" className="gamepad-logo" />
        <h1>Gamepad</h1>
      </div>
      <div className="last-div">
        <input
          type="text"
          placeholder="Search for a game..."
          value={inputSearch}
          onChange={handleOnSearch}
        />

        {display && (
          <div className="autocomplete-container">
            {gamesOnSearch.map((game) => {
              return (
                <p
                  key={game.id}
                  onClick={() => {
                    setGameOnSearch(game.name);
                  }}
                >
                  {game.name}
                </p>
              );
            })}
          </div>
        )}

        <input type="submit" value="Search" onClick={handleSubmitSearch} />
      </div>

      {search ? (
        <div>
          <p
            style={{
              fontSize: "18px",
              fontStyle: "oblic",
              textAlign: "center",
            }}
          >
            search results for{" "}
            <span
              style={{
                fontSize: "25px",
                fontStyle: "normal",
                textAlign: "center",
              }}
            >
              "{search}"
            </span>
          </p>
          <p
            style={{ marginTop: "10px", textAlign: "center", fontSize: "13px" }}
          >
            found <span>{count} games</span>
          </p>
        </div>
      ) : (
        <p style={{ textAlign: "center", fontSize: "13px" }}>
          search <span>{count}</span> games
        </p>
      )}
    </div>
  );
};

export default SearchBloc;
