import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Router from "./components/Router";
import { setStoreUsers } from "./store/userSlice";
import { setStoreTracks, setStoreVideos } from "./store/musicSlice";
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

  if (loading) return <p>Loading...</p>;
  return (
    <div className="appContainer">
      <Router />
    </div>
  );
}

export default App;
