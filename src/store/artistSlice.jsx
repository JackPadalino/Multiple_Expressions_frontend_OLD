import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  storeArtists: [],
};

export const artistSlice = createSlice({
  name: "artists",
  initialState,
  reducers: {
    setStoreArtists: (state, action) => {
      state.storeArtists = action.payload;
    },
  },
});

export const { setStoreArtists } = artistSlice.actions;

export default artistSlice.reducer;
