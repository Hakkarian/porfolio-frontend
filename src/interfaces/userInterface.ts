export interface IUser {
  name: string;
  email: string;
  password: string;
}

export interface IUserState {
  user: IUser | null;
  isLoading: boolean;
  error: string | null;
}

