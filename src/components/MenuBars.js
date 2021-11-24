// Librairies
import React from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const MenuBars = ({
  userToken,
  setUserToken,
  userName,
  setUserName,
  setAllFavorites,
  setDisplayMenuBars,
}) => {
  return (
    <div className={userName ? "menu-bars" : "menu-bars-2"}>
      {userName && (
        <p>
          Hello <span>{userName}</span> !
        </p>
      )}

      {userToken ? (
        <Link
          to="/favorites"
          onClick={() => {
            setDisplayMenuBars(false);
          }}
        >
          My Collection
        </Link>
      ) : (
        <Link
          to="/signin"
          onClick={() => {
            setDisplayMenuBars(false);
          }}
        >
          My Collection
        </Link>
      )}

      {userToken ? (
        <Link
          to="/"
          onClick={() => {
            setDisplayMenuBars(false);
            setUserToken(null);
            setAllFavorites(null);
            setUserName(null);
            Cookies.remove("userToken");
            Cookies.remove("userName");
          }}
        >
          Log out
        </Link>
      ) : (
        <Link
          to="/signin"
          onClick={() => {
            setDisplayMenuBars(false);
          }}
        >
          Login
        </Link>
      )}
    </div>
  );
};

export default MenuBars;
