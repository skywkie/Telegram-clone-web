import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { setUser } from "./userSlice";

interface UserAuth {
  userName: string;
  password: string;
}

interface fetchRegistrationResponse {
  data: { token: string; userId: number };
}

export const fetchRegistration = createAsyncThunk(
  "fetchRegistration",
  async (userData: UserAuth, thunkAPI) => {
    try {
      await axios
        .post("/api/auth/register", userData)
        .then((response: fetchRegistrationResponse) => {
          console.log("@Register data is sent", response.data);

          thunkAPI.dispatch(
            setUser({
              userName: userData.userName,
              token: response.data.token,
              id: response.data.userId,
            })
          );
        })
        .catch((err) => console.error(err));
    } catch (error) {
      console.error(error);
    }
  }
);

interface fetchLoginResponse {
  data: { token: string; userId: number };
}

export const fetchLogin = createAsyncThunk(
  "fetchLogin",
  async (userData: UserAuth, thunkAPI) => {
    try {
      await axios
        .post("/api/auth/login", userData)
        .then((response: fetchLoginResponse) => {
          console.log("@Login data is sent", response.data);

          thunkAPI.dispatch(
            setUser({
              userName: userData.userName,
              token: response.data.token,
              id: response.data.userId,
            })
          );
        })
        .catch((err) => console.error(err));
    } catch (error) {
      console.error(error);
    }
  }
);

interface fetchLoginByTokenResponse {
  data: { userName: string; token: string; userId: number };
}

export const fetchLoginByToken = createAsyncThunk(
  "fetchLoginByToken",
  async (token: string, thunkAPI) => {
    try {
      await axios
        .post("/api/auth/loginByToken", token)
        .then((response: fetchLoginByTokenResponse) => {
          console.log("@Login data is sent", response.data);

          thunkAPI.dispatch(
            setUser({
              userName: response.data.userName,
              token: response.data.token,
              id: response.data.userId,
            })
          );
        })
        .catch((err) => console.error(err));
    } catch (error) {
      if (error instanceof Error) return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialAuthentication = {
  isAuthorized: false,
  error: null,
};

export const authenticationSlice = createSlice({
  name: "authenticationSlice",
  initialState: initialAuthentication,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setAuthentication(
      state,
      action: PayloadAction<{
        isAuthorized: boolean;
      }>
    ) {
      state.isAuthorized = action.payload.isAuthorized;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegistration.fulfilled, (state, action) => {
        console.log("ACTION FULLFILFED", action.payload);
        state.isAuthorized = true;
      })
      .addCase(fetchRegistration.rejected, (state, action) => {
        console.log("ACTION rejected", action.payload);
        state.isAuthorized = false;
      });
  },
});
