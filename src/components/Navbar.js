import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";

const Navbar = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useNavigate();
  const renderList = () => {
    if (state) {
      return [
        <>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/createpost">CreatePost</Link>
          </li>
          <li>
            <button
              className="btn red"
              onClick={() => {
                localStorage.clear();
                dispatch({ type: "clear" });
                history("/signin");
              }}
            >
              LogOut
            </button>
          </li>
        </>,
      ];
    } else {
      return [
        <>
          <li>
            <Link to="/signin">Login</Link>
          </li>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
        </>,
      ];
    }
  };
  return (
    <nav>
      <div className="nav-wrapper">
        <Link
          to={state ? "/" : "/signin"}
          className="brand-logo left"
          style={{ font: "gr" }}
        >
          <span>Instagram</span>
        </Link>
        <ul id="nav-mobile" className="right ">
          {renderList()}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
