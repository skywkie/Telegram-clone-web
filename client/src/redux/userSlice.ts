import { createSlice } from "@reduxjs/toolkit";

type initialStateType =
  | [
      {
        name: string;
        password: string;
        age: number;
      }
    ]
  | [];

const initialState: initialStateType = [];

export const userSlice = createSlice({
  name: "User props",
  initialState,
  reducers: {
    addUser: () => {},
    updateUser: () => {},
    deleteUser: () => {},
  },
});

export const { addUser, updateUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
