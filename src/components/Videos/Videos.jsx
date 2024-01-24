import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./videos.css";

const Videos = () => {
  const { storeUsers } = useSelector((state) => state.users);

  return (
    <>
      <h1>This is the Videos component</h1>
      {storeUsers.map((user) => (
        <div key={user.id}>
          <p>
            {user.username} - {user.id}
          </p>
          <img
            src={`http://localhost:8000${user.profile.profile_photo}`}
            alt={`Profile of ${user.username}`}
            style={{ width: "300px", height: "200px" }}
          />
        </div>
      ))}
    </>
  );
};

export default Videos;
