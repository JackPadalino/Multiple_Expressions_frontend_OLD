import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Router from "./components/Router";
import { setStoreUsers } from "./store/userSlice";
import { setStoreTracks, setStoreVideos } from "./store/musicSlice";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const fetchUsers = () => {
    axios
      .get("http://localhost:8000/api/users/all")
      .then((userData) => {
        dispatch(setStoreUsers(userData.data));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  const fetchData = () => {
    axios
      .get("http://localhost:8000/api/users/all")
      .then((userData) => {
        dispatch(setStoreUsers(userData.data));
        return axios.get("http://localhost:8000/api/music/tracks/all");
      })
      .then((trackData) => {
        dispatch(setStoreTracks(trackData.data));
        return axios.get("http://localhost:8000/api/music/videos/all");
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
    <>
      <Router />
    </>
  );
}

export default App;
