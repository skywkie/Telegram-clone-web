import { createSlice } from "@reduxjs/toolkit";

type initialStateType = {
  userName: string | null;
  token: number | null;
  id: number | null;
};

const initialState: initialStateType = { userName: null, token: null, id: null };

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userName = action.payload.userName;
      state.token = action.payload.token;
      state.id = action.payload.id;
    },
    // updateUser: () => {},
    removeUser: (state) => {
      state.userName = null;
      state.token = null;
      state.id = null;
    },
  },
});

export const { setUser, /*updateUser*/ removeUser } = userSlice.actions;
export default userSlice.reducer;
