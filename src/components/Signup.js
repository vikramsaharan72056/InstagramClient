import React, { useState, useEffect } from "react";
import M from "materialize-css";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [showpass, setShowpass] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const history = useNavigate();

  const PostData = async () => {
    await fetch("http://localhost:8080/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error });
        } else {
          M.toast({ html: data.message });
          history("/signin");
        }
      })
      .catch((err) => console.log(err.message));
  };
  return (
    <div className="mycard">
      <div
        className="card auth-card input field"
        style={{ width: "70%", marginLeft: "10%" }}
      >
        <h2 style={{ textAlign: "center" }}>SignUp</h2>
        <div style={{ width: "90%", marginLeft: "4%" }}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div style={{ width: "90%", marginLeft: "4%" }}>
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div style={{ display: "flex" }}>
          <span style={{ width: "90%", marginLeft: "4%" }}>
            <input
              type={showpass ? "text" : "password"}
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </span>

          <span style={{ marginLeft: "-7%", marginTop: "2%" }}>
            <button onClick={() => setShowpass(!showpass)}>
              {showpass ? "Hide" : "Show"}
            </button>
          </span>
        </div>

        <button
          style={{ marginLeft: "45%", marginTop: "2%", marginBottom: "1%" }}
          onClick={() => PostData()}
        >
          Register
        </button>
        <h5 style={{ marginLeft: "30%" }}>
          Already have an account,then <Link to="/signin">Login</Link>
        </h5>
      </div>
    </div>
  );
};

export default Signup;
