import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  storeBroadcasting: false,
};

export const liveSlice = createSlice({
  name: "live",
  initialState,
  reducers: {
    setStoreBroadcasting: (state, action) => {
      state.storeBroadcasting = action.payload;
    },
  },
});

export const { setStoreBroadcasting } = liveSlice.actions;

export default liveSlice.reducer;
