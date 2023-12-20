import { createSlice } from "@reduxjs/toolkit";
import { currenti, login, logoutUser, register, updUser } from "../operations";
import { IUserState } from "../../interfaces";
import { pending, rejected } from "../../utils";

// initial state is for redux slice
// with user credentials,
// a user token
// an error and a loading indicator

const initialState: IUserState = {
  user: null,
  token: "",
  isLoading: false,
  error: null,
};

// connect to the slice asynchronous reducers along with initialState
// these extraReducers have three states - pending, rejected, and fulfilled
// pending state is needed of a loading purpose
// rejected is for displaying errors
// fulfilled is for showing results
// name is for pointing out which exactly state we're going to change

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setGoogleUser: (state, { payload }) => {
      state.token = payload.token;
      state.user = payload.user;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(register.pending, pending)
      .addCase(login.pending, pending)
      .addCase(currenti.pending, pending)
      .addCase(updUser.pending, pending)
      .addCase(logoutUser.pending, pending)
      .addCase(register.rejected, rejected)
      .addCase(login.rejected, rejected)
      .addCase(currenti.rejected, rejected)
      .addCase(updUser.rejected, rejected)
      .addCase(logoutUser.rejected, rejected)
      .addCase(register.fulfilled, (state, { payload }) => {
        // we're turning off a loading indicator,
        // and passing a payload to the user state
        state.isLoading = false;
        state.user = payload;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        // we're turning off a loading indicator,
        // and passing to the user state a user along with a token
        state.isLoading = false;
        state.user = payload.user;
        state.token = payload.accessToken;
      })
      .addCase(currenti.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        if (payload) {
          state.user = payload.user;
          state.token = payload.token;
        }
      })
      .addCase(updUser.fulfilled, (state, { payload }) => {
        // we're turning off a loading indicator,
        // and passing to the user state a payload
        state.isLoading = false;
        state.user = payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        // make the user equal to an empty array,
        // the same goes for the token
        state.isLoading = false;
        state.user = {} as any;
        state.token = "";
      }),
});

export const { setGoogleUser } = userSlice.actions;

export default userSlice.reducer;
