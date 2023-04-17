import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import M from "materialize-css";
import { UserContext } from "../App";

const Login = () => {
  const { state, dispatch } = useContext(UserContext);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const history = useNavigate();

  const PostData = () => {
    fetch("https://instagramserver-ypo7.onrender.com/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          M.toast({ html: data.error });
        } else {
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          M.toast({ html: "Logged In Successfully" });
          dispatch({ type: "USER", payload: data.user });
          history("/");
        }
      })
      .catch((err) => console.log(err.message));
  };
  return (
    <>
      <div className="mycard">
        <div
          className="card auth-card input field"
          style={{ width: "70%", marginLeft: "10%" }}
        >
          <h2 style={{ textAlign: "center" }}>Login</h2>
          <div style={{ width: "90%", marginLeft: "4%" }}>
            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div style={{ width: "90%", marginLeft: "4%" }}>
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            style={{ marginLeft: "45%", marginTop: "2%", marginBottom: "1%" }}
            onClick={() => PostData()}
          >
            Login
          </button>
          <p style={{ marginLeft: "30%" }}>
            Don't have an account,then <Link to="/signup">Register</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
