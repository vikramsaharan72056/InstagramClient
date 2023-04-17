import React, { useEffect, createContext, useReducer, useContext } from "react";
import Navbar from "./components/Navbar";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Signup from "./components/Signup";
import CreatePost from "./components/CreatePost";
import { reducer, initialState } from "./Reducers/userReducer";

export const UserContext = createContext();
const Routing = () => {
  const history = useNavigate();
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "USER", payload: user });
      history("/");
    } else {
      history("/signin");
    }
  }, []);
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/signin" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/createpost" element={<CreatePost />} />
    </Routes>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <Navbar />
      <Routing />
    </UserContext.Provider>
  );
}

export default App;
