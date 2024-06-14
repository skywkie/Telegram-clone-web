import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setUser } from "./userSlice";

interface UserFetchData {
  email: string;
  password: string;
}

interface UserResponseData {
  userId: number;
  token: string;
}

export const fetchRegistrationWithEmail = createAsyncThunk(
  "fetchRegistration",
  async function (UserData: UserFetchData, { rejectWithValue, dispatch }) {
    try {
      await axios.post("/api/auth/register", UserData).then((response) => {
        const data: UserResponseData = response.data;

        dispatch(setUser({ ...data, ...UserData, userName: "" }));

        return data;
      });
    } catch (err) {
      console.log("@fetchRegistrationWithEmail ERROR", err);
      return rejectWithValue("@fetchRegistrationWithEmail");
    }
  }
);
export const fetchLoginWithEmail = createAsyncThunk(
  "fetchLoginWithEmail",
  async function (UserData: UserFetchData, { rejectWithValue, dispatch }) {
    try {
      await axios.post("/api/auth/login", UserData).then((response) => {
        const data: UserResponseData = response.data;

        dispatch(setUser({ ...data, ...UserData, userName: "" }));

        return data;
      });
    } catch (err) {
      console.log("@fetchRegistrationWithEmail ERROR", err);
      return rejectWithValue("@fetchRegistrationWithEmail");
    }
  }
);

// TODO: setUserName

const initialState = {
  isAuth: false,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setAuth: (
      state,
      action: PayloadAction<{
        isAuth: boolean;
      }>
    ) => {
      state.isAuth = action.payload.isAuth;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRegistrationWithEmail.fulfilled, (state, action) => {
      console.log("@fetchRegistrationWithEmail fulfilled", action.payload);

      state.isAuth = true;
    });
    builder.addCase(fetchRegistrationWithEmail.rejected, (state, action) => {
      console.log("@fetchRegistrationWithEmail rejected", action.payload);

      state.isAuth = false;
    });
    builder.addCase(fetchLoginWithEmail.fulfilled, (state, action) => {
      console.log("@fetchLoginWithEmail fulfilled", action.payload);

      state.isAuth = true;
    });
    builder.addCase(fetchLoginWithEmail.rejected, (state, action) => {
      console.log("@fetchLoginWithEmail rejected", action.payload);

      state.isAuth = false;
    });
  },
});

export const { setAuth } = authSlice.actions;

export default authSlice.reducer;
