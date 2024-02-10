import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  url: "",
};

export const urlSlice = createSlice({
  name: "url",
  initialState,
  reducers: {
    setUrl: (state, action) => {
      console.log("url slice hit!");
      state.url = action.payload;
    },
  },
});

export const { setUrl } = urlSlice.actions;

export default urlSlice.reducer;
