import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Loading from "../Loading/Loading";
import "./artist.css";

const Artist = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [artist, setArtist] = useState({});

  const fetchArtistData = async () => {
    let url;
    if (import.meta.env.VITE_DEV_MODE === "true") {
      url = import.meta.env.VITE_DEV_URL;
    } else {
      url = import.meta.env.VITE_PROD_URL;
    }
    try {
      const response = await axios.get(`${url}/api/music/artists/${id}`);
      setArtist(response.data);
      setLoading(false);
    } catch (error) {
      if (error.response) {
        console.error(
          "Request failed with status code:",
          error.response.status
        );
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error setting up the request:", error.message);
      }
    }
  };

  useEffect(() => {
    fetchArtistData();
  }, []);

  console.log(loading);

  if (loading) return <Loading />;
  return (
    <div className="artistMainContainer">
      <h1>{artist.name}</h1>
    </div>
  );
};

export default Artist;
