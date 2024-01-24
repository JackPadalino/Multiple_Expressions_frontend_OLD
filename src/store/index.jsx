import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import musicReducer from "./musicSlice";

const store = configureStore({
  reducer: {
    users: userReducer,
    music: musicReducer,
  },
});

export default store;
