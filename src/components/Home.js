import React, { useState, useEffect } from "react";

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://instagramserver-ypo7.onrender.com/allpost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setData(result.posts);
      });
  }, []);

  return (
    <div className="home">
      {data.map((item, index) => {
        return (
          <div
            className="card home-card"
            style={{ width: "90%", marginLeft: "4%" }}
          >
            <h5>PostedBy:{item.postedBy.name}</h5>
            <div className="card-image">
              <img src={item.photo} alt="sample" />
            </div>
            <div className="card-content">
              <h6>{item.title}</h6>
              <p>{item.body}</p>
              <input type="text" placeholder="add comment" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
