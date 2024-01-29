import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import musicReducer from "./musicSlice";
import waveformReducer from "./waveformSlice";
import mobileViewReducer from "./mobileViewSlice";

const store = configureStore({
  reducer: {
    users: userReducer,
    music: musicReducer,
    waveform: waveformReducer,
    mobileView: mobileViewReducer,
  },
});

export default store;
