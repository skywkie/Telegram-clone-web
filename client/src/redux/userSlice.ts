import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialState {
  userId?: null | number;
  email?: null | string;
  userName?: null | string;
  token?: null | string;
}

const initialState: InitialState = {
  userId: null,
  email: null,
  userName: null,
  token: null,
};

const userSlice = createSlice({
  name: "User Slice",
  initialState,
  reducers: {
		setUser: (state, action: PayloadAction<InitialState>) => {
			state.userId = action.payload.userId;
      state.email = action.payload.email;
      state.userName = action.payload.userName;
      state.token = action.payload.token;
    },
    removeUser: (state) => {
      state.userId = null;
      state.email = null;
      state.userName = null;
      state.token = null;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
