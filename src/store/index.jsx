import { configureStore } from "@reduxjs/toolkit";
import artistReducer from "./artistSlice";
import musicReducer from "./musicSlice";
import waveformReducer from "./waveformSlice";
import mobileViewReducer from "./mobileViewSlice";
import usersReducer from "./usersSlice";
import liveReducer from "./liveSlice";
import urlReducer from "./urlSlice";

const store = configureStore({
  reducer: {
    artists: artistReducer,
    music: musicReducer,
    waveform: waveformReducer,
    mobileView: mobileViewReducer,
    users: usersReducer,
    live: liveReducer,
    url: urlReducer,
  },
});

export default store;
