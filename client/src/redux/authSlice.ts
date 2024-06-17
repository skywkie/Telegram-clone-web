import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setUser } from "./userSlice";
import fetchAuthByEmail from "../utils/fetchAuthByEmail";

interface UserFetchData {
  email: string;
  password: string;
}

export const fetchRegistrationWithEmail = createAsyncThunk(
  "fetchRegistration",
  async function (UserData: UserFetchData, { rejectWithValue, dispatch }) {
    try {
      const response = await fetchAuthByEmail("/api/auth/register", UserData);

      if (response.ok) {
        const responseData = { userId: response.userId, token: response.token };

        dispatch(setUser({ ...responseData, email: UserData.email, userName: "" }));

        return responseData;
      }
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
      const response = await fetchAuthByEmail("/api/auth/login", UserData);

      if (response.ok) {
        const responseData = { userId: response.userId, token: response.token };

        dispatch(setUser({ ...responseData, email: UserData.email, userName: "" }));

        return responseData;
      }
    } catch (err) {
      console.log("@fetchRegistrationWithEmail ERROR", err);
      return rejectWithValue("@fetchRegistrationWithEmail");
    }
  }
);

// TODO: setUserName

const initialState = {
  isAuth: true, // DEV MODE!!!
  errorAuth: "",
};

interface Payload {
  isAuth: boolean;
  errorAuth: "";
}

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<Payload>) => {
      state.isAuth = action.payload.isAuth;
      state.errorAuth = action.payload.errorAuth;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRegistrationWithEmail.fulfilled, (state, action) => {
      console.log("@fetchRegistrationWithEmail fulfilled", action.payload);
      state.isAuth = true;
    });
    builder.addCase(fetchRegistrationWithEmail.rejected, (state, action) => {
      console.log("@fetchRegistrationWithEmail rejected", action.payload);
      state.errorAuth = "Error Register";
      state.isAuth = false;
    });
    builder.addCase(fetchLoginWithEmail.fulfilled, (state, action) => {
      console.log("@fetchLoginWithEmail fulfilled", action.payload);

      state.isAuth = true;
    });
    builder.addCase(fetchLoginWithEmail.rejected, (state, action) => {
      console.log("@fetchLoginWithEmail rejected", action.payload);
      state.errorAuth = "Error Login";
      state.isAuth = false;
    });
  },
});

export const { setAuth } = authSlice.actions;

export default authSlice.reducer;
