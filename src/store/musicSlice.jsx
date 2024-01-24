import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  storeUsers: []
};

export const musicSlice = createSlice({
  name: "music",
  initialState,
  reducers: {
    setStoreUsers: (state, action) => {
        state.storeUsers = action.payload;
    }
  }
});

export const { setStoreUsers } = musicSlice.actions;

export default musicSlice.reducer;
