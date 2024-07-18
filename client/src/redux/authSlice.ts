import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setUser } from "./userSlice";

import useAuthQuery from "@/hooks/useAuthQuery";

import { LOGIN_URL_PATH, REGISTER_URL_PATH } from "@/api/constants/paths";

interface UserFetchData {
  email: string;
  password: string;
}

export const fetchRegistrationWithEmail = createAsyncThunk(
  "fetchRegistration",
  async function (UserData: UserFetchData, { rejectWithValue, dispatch }) {
    try {
      const { data, status } = await useAuthQuery(REGISTER_URL_PATH, UserData);

      if (status === 200) {
        const responseData = { userId: data.userId, token: data.token };

        dispatch(setUser({ ...responseData, email: UserData.email, userName: "" }));

        return responseData;
      }
      return rejectWithValue("@fetchRegistrationWithEmail");
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
      const { data, status } = await useAuthQuery(LOGIN_URL_PATH, UserData);

      if (status === 200) {
        const responseData = { userId: data.userId, token: data.token };

        dispatch(setUser({ ...responseData, email: UserData.email, userName: "" }));

        return responseData;
      }
      return rejectWithValue("@fetchRegistrationWithEmail");
    } catch (err) {
      console.log("@fetchRegistrationWithEmail ERROR", err);
      return rejectWithValue("@fetchRegistrationWithEmail");
    }
  }
);

// TODO: setUserName

const initialState = {
  isAuth: false, // DEV MODE!!!
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
      console.log("@fetchRegistrationWithEmail fulfilled. Payload --> ", action.payload);
      state.isAuth = true;
    });
    builder.addCase(fetchRegistrationWithEmail.rejected, (state, action) => {
      console.log("@fetchRegistrationWithEmail rejected. Payload --> ", action.payload);
      state.errorAuth = "Error Register";
      state.isAuth = false;
    });
    builder.addCase(fetchLoginWithEmail.fulfilled, (state, action) => {
      console.log("@fetchLoginWithEmail fulfilled. Payload --> ", action.payload);
      state.isAuth = true;
    });
    builder.addCase(fetchLoginWithEmail.rejected, (state, action) => {
      console.log("@fetchLoginWithEmail rejected. Payload --> ", action.payload);
      state.errorAuth = "Error Login";
      state.isAuth = false;
    });
  },
});

export const { setAuth } = authSlice.actions;

export default authSlice.reducer;
