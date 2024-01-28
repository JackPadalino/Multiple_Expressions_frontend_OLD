import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import musicReducer from "./musicSlice";
import waveformReducer from "./waveformSlice";

const store = configureStore({
  reducer: {
    users: userReducer,
    music: musicReducer,
    waveform: waveformReducer,
  },
});

export default store;
