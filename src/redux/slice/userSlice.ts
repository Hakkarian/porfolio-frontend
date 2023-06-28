import { createSlice } from "@reduxjs/toolkit";
import { currenti, login, register, updUser } from "../operations";
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
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(register.pending, pending)
      .addCase(login.pending, pending)
      .addCase(currenti.pending, pending)
      .addCase(updUser.pending, pending)
      .addCase(register.rejected, rejected)
      .addCase(login.rejected, rejected)
      .addCase(currenti.rejected, rejected)
      .addCase(updUser.rejected, rejected)
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload?.data.user;
        state.token = action.payload?.data.token;
      })
      .addCase(currenti.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload?.data.user;
        state.token = action.payload?.data.token;
      })
      .addCase(updUser.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log('update slice', action.payload?.data);
        state.user = action.payload?.data;
        state.token = action.payload?.data.token;
      })
});

export default userSlice.reducer;
