import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useLocation } from "react-router-dom";
import { setUrl } from "../../store/urlSlice";

import { setStoreArtists } from "../../store/artistSlice";
import { setStoreTracks, setStoreVideos } from "../../store/musicSlice";
import { setMobileView } from "../../store/mobileViewSlice";
import {
  NotFound,
  Loading,
  Home,
  Visual,
  Auditory,
  Live,
  Waveform,
  MobileWaveform,
  Nav,
  Admin,
  Artist,
} from "..";

import "./app.css";

const App = () => {
  const dispatch = useDispatch();
  const { mobileView } = useSelector((state) => state.mobileView);
  const [loading, setLoading] = useState(true);

  // check for mobile view - send state up to redux store
  // to be used by other components like waveform
  const checkMobileView = () => {
    const mediaQuery = window.matchMedia("(max-width: 1280px)");
    dispatch(setMobileView(mediaQuery.matches));
  };

  const fetchData = () => {
    let url;
    if (import.meta.env.VITE_DEV_MODE === "true") {
      url = import.meta.env.VITE_DEV_URL;
    } else {
      url = import.meta.env.VITE_PROD_URL;
    }
    // set global url in redux store for all other API requests
    dispatch(setUrl(url));
    axios
      .get(`${url}/api/music/artists/all`)
      .then((artistData) => {
        dispatch(setStoreArtists(artistData.data));
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
    checkMobileView();
    fetchData();
  }, []);

  // useLocation to determine the path name and render a nav
  // only on certain routes
  const location = useLocation();

  // array of routes that should include the Nav component
  const routesWithNav = [
    "home",
    "visual",
    "auditory",
    "live",
    "admin",
    "artist",
  ];

  if (loading) return null;
  return (
    <div className="appContainer">
      {routesWithNav.includes(location.pathname.split("/")[1]) && <Nav />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/visual" element={<Visual />} />
        <Route path="/auditory" element={<Auditory />} />
        <Route path="/live" element={<Live />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/artist/:id" element={<Artist />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      {mobileView ? <MobileWaveform /> : <Waveform />}
    </div>
  );
};

export default App;
