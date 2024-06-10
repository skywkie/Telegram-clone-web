import { createSlice } from "@reduxjs/toolkit";

interface initialState {
  userName: string | null;
  token: number | null;
  userId: number | null;
}

const initialState: initialState = { userName: null, token: null, userId: null };

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userName = action.payload.userName;
      state.token = action.payload.token;
      state.userId = action.payload.userId;
    },
    // updateUser: () => {},
    removeUser: (state) => {
      state.userName = null;
      state.token = null;
      state.userId = null;
    },
  },
});

export const { setUser, /*updateUser*/ removeUser } = userSlice.actions;
export default userSlice.reducer;
