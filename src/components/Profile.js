import React from "react";

const Profile = () => {
  return (
    <div>
      <div style={{ display: "flex" }}>
        <div>
          <img
            style={{ width: "60%", borderRadius: "50%", marginLeft: "5%" }}
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
            alt="myImage"
          />
        </div>
        <div>
          <h4>Angela Thomas</h4>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "111%",
            }}
          >
            <h5>Posts: 40</h5>
            <h5>Followers: 474</h5>
            <h5>Following: 568</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
