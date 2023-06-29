import { AsyncThunkAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { Dispatch, SetStateAction } from "react";

export type SetStateProp = Dispatch<SetStateAction<IBoolUser>>;

export interface ISetState {
  setEdit: SetStateProp
}

export type ActionType = AsyncThunkAction<AxiosResponse<any, any> | undefined, IUpdUser, any>

export interface IUser {
  username: string;
  email: string;
  password: string;
  userId: string;
  favorite: [];
  isAdmin: boolean;
  avatar: { url: string; id: string };
}

export interface IUpdateUser {
  username: string;
  email: string;
  birthday: string;
  location: string;
  phone: string;
}

export interface IRegisterUser {
  username: string;
  email: string;
  password: string;
}

export interface IUpdUser {
  [name: string]: string | File | null;
}

export interface IBoolUser {
  username: boolean;
  email: boolean;
  birthday: boolean;
  location: boolean;
  phone: boolean;
  avatar: boolean;
}

export interface IRegisterPage {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IUserState {
  user: IUser | null;
  token: string;
  isLoading: boolean;
  error: string | null;
}
