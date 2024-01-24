import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./videos.css";

const Videos = () => {
  const { storeVideos } = useSelector((state) => state.music);

  console.log(storeVideos);

  return (
    <>
      <h1>This is the Videos component</h1>
      {storeVideos.map((video) => (
        <div key={video.id}>
          <h3>
            {video.title} - {video.upload_date}
          </h3>
          {video.tags.map((tag) => (
            <p key={tag.id}>#{tag.title}</p>
          ))}
        </div>
      ))}
    </>
  );
};

export default Videos;
