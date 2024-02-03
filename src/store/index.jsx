import { configureStore } from "@reduxjs/toolkit";
import artistReducer from "./artistSlice";
import musicReducer from "./musicSlice";
import waveformReducer from "./waveformSlice";
import mobileViewReducer from "./mobileViewSlice";
import usersReducer from "./usersSlice";

const store = configureStore({
  reducer: {
    artists: artistReducer,
    music: musicReducer,
    waveform: waveformReducer,
    mobileView: mobileViewReducer,
    users: usersReducer,
  },
});

export default store;
