import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useLocation } from "react-router-dom";

import { setStoreUsers } from "../../store/userSlice";
import { setStoreTracks, setStoreVideos } from "../../store/musicSlice";
import { Home, Expressions, Visual, Auditory, Live, Waveform } from "..";
import "./app.css";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    let url;
    if (import.meta.env.VITE_DEV_MODE === "true") {
      url = import.meta.env.VITE_DEV_URL;
    } else {
      url = import.meta.env.VITE_PROD_URL;
    }
    axios
      .get(`${url}/api/users/all`)
      .then((userData) => {
        dispatch(setStoreUsers(userData.data));
        return axios.get(`${url}/api/music/tracks/all`);
      })
      .then((trackData) => {
        dispatch(setStoreTracks(trackData.data));
        return axios.get(`${url}/api/music/videos/all`);
      })
      .then((videoData) => {
        dispatch(setStoreVideos(videoData.data));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  // const location = useLocation();
  // const urlParams = new URLSearchParams(location.search);

  // Get the value of the 'success' query parameter
  // const successQueryParam = urlParams.get("success");

  if (loading) return <p>Loading...</p>;
  return (
    <div className="appContainer">
      {/* <Router /> */}
      <Routes>
        {/* <Route
        path="/checkout"
        element={<Checkout successQueryParam={successQueryParam} />}
      /> */}
        <Route path="/" element={<Home />} />
        <Route path="/expressions" element={<Expressions />} />
        <Route path="/expressions/visual" element={<Visual />} />
        <Route path="/expressions/auditory" element={<Auditory />} />
        <Route path="/live" element={<Live />} />
      </Routes>
      <Waveform />
    </div>
  );
}

export default App;