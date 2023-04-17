import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import M from "materialize-css";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const history = useNavigate("");

  useEffect(() => {
    if (url) {
      fetch("https://instagramserver-ypo7.onrender.com/createpost", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          title,
          body,
          image: url,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            M.toast({ html: data.error });
          } else {
            M.toast({ html: "post created successfully" });
            history("");
          }
        });
    }
  }, [url]);

  const postImage = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "Rootfor");
    data.append("cloud_name", "dp6gqhir8");
    fetch("https://api.cloudinary.com/v1_1/dp6gqhir8/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div
      className="card input-field"
      style={{ width: "80%", marginLeft: "5%", padding: "5%" }}
    >
      <input
        type="text"
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <div style={{ padding: "2%" }}>
        <div className="btn">
          <span>File</span>
          <input
            type="file"
            //value={image}
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>
      <button
        onClick={() => postImage()}
        className="btn waves-effect waves-light #64b5f6 blue darken-1"
      >
        Create Post
      </button>
    </div>
  );
};

export default CreatePost;
