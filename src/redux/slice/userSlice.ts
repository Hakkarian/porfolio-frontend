import { createSlice } from "@reduxjs/toolkit";
import { currenti, login, logoutUser, register, updUser } from "../operations";
import { IUserState } from "../../interfaces";
import { pending, rejected } from "../../utils";

const initialState: IUserState = {
  user: null,
  token: "",
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setGoogleUser: (state, {payload}) => {
      state.token = payload.token;
      state.user = payload.user;
    }
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
      .addCase(register.fulfilled, (state, {payload}) => {
        state.isLoading = false;
        state.user = payload;
      })
      .addCase(login.fulfilled, (state, {payload}) => {
        state.isLoading = false;
        state.user = payload.user;
        state.token = payload.token;
      })
      .addCase(currenti.fulfilled, (state, {payload}) => {
        state.isLoading = false
        if (payload) {
          state.user = payload.user;
          state.token = payload.token;
        }
      })
      .addCase(updUser.fulfilled, (state, {payload}) => {
        state.isLoading = false;
        state.user = payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = {} as any;
        state.token = "";
      })
});

export const { setGoogleUser } = userSlice.actions;

export default userSlice.reducer;
