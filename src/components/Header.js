// Librairies
import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";

// Components
import MenuBars from "./MenuBars";

export default function Header({
  userToken,
  setUserToken,
  userName,
  setUserName,
  setAllFavorites,
  displayMenuBars,
  setDisplayMenuBars,
  resetSearch,
}) {
  return (
    <div className="header">
      <Link to="/" className="logo-link" onClick={resetSearch}>
        <FontAwesomeIcon icon="gamepad" className="gamepad-logo" />
        <h1>Gamepad</h1>
      </Link>
      <div className="link">
        {userName && (
          <p>
            Hello <span>{userName}</span> !
          </p>
        )}

        {userToken ? (
          <Link to="/favorites">My Collection</Link>
        ) : (
          <Link to="/signin">My Collection</Link>
        )}

        {userToken ? (
          <Link
            to="/"
            onClick={() => {
              setUserToken(null);
              setAllFavorites([]);
              setUserName(null);
              Cookies.remove("userToken");
              Cookies.remove("userName");
            }}
          >
            Log out
          </Link>
        ) : (
          <Link to="/signin">Login</Link>
        )}
      </div>

      <FontAwesomeIcon
        icon="bars"
        className="bars"
        onClick={() => {
          setDisplayMenuBars(!displayMenuBars);
        }}
      />

      {displayMenuBars && (
        <MenuBars
          userToken={userToken}
          setUserToken={setUserToken}
          userName={userName}
          setUserName={setUserName}
          setAllFavorites={setAllFavorites}
          setDisplayMenuBars={setDisplayMenuBars}
        />
      )}
    </div>
  );
}
