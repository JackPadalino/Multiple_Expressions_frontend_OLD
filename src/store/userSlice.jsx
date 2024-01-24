import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  storeUsers: [],
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setStoreUsers: (state, action) => {
      state.storeUsers = action.payload;
    },
  },
});

export const { setStoreUsers } = userSlice.actions;

export default userSlice.reducer;
