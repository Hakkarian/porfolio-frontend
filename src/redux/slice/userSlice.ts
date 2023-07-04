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
    setGoogleUser: (state, action) => {
      console.log('google payload', action.payload)
      state.token = action.payload.token;
      state.user = action.payload.user;
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
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(currenti.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload)
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(updUser.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log('update slice', action.payload);
        state.user = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = {} as any;
        state.token = "";
      })
});

export const { setGoogleUser } = userSlice.actions;

export default userSlice.reducer;
