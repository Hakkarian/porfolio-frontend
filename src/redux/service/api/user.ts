import axios from "axios";
import { ILogin, IRegisterUser, IUpdUser } from "../../../interfaces";

// we're getting an address of the backend
const backendUrl = process.env.REACT_APP_API_URL;

// create a basic instance for our apies
export const instance = axios.create({
  baseURL: backendUrl,
});

// generate a function setToken, which checks to see
// if our authorization string has a bearer token
// or just an empty string
export const setToken = (token: string) => {
  console.log('Im free')
  if (token) {
    instance.defaults.headers.authorization = `Bearer ${token}`;
    return;
  }
  console.log('or else...')
  instance.defaults.headers.authorization = ``;
};

// an object with multiple methods:
// transfer the data to the database specific location
const userApi = {
  // to register a user
  register: async (data: IRegisterUser) => {
    try {
      const { data: result } = await instance.post("/users/register", data);
      return result;
    } catch (error) {
      console.log(error);
    }
  },
  login: async (data: ILogin) => {
    // to log in them
    try {
      const { data: result } = await instance.post("/users/login", data);
      return result;
    } catch (error) {
      console.log(error);
    }
  },

  // here we're not passing any data, only user token
  // to return the user which has this token
  current: async (token: string) => {
    try {
      setToken(token);
      const { data: result } = await instance.get("/users/current");
      console.log('backend', result)
      return result;
    } catch (error) {
      console.log(error);
    }
  },
  // update user credentials
  // check if data has username, email, location, birthday, phone and avatar
  // if some field is empty, continue
  // until you find out which field must be changed
  updateInfo: async (data: IUpdUser, id: string, token: string) => {
    try {
      setToken(token);
      const formData = new FormData();
      const { username, email, location, birthday, phone, avatar } = data;

      if (username) {
        formData.append("username", username);
      }
      if (email) {
        formData.append("email", email);
      }
      if (location) {
        formData.append("location", location);
      }
      if (birthday) {
        formData.append("birthday", birthday);
      }
      if (phone) {
        formData.append("phone", phone);
      }
      if (avatar) {
        formData.append("avatar", avatar as string | Blob);
      }
      // and update but the id of the user
      const { data: result } = await instance.patch(
        `/users/${id}/update`,
        formData
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  },
  // an api method to log out the user
  logout: async () => {
    try {
      const { data: result } = await instance.post(`/users/logout`);
      // just discard a token of the user to end a session
      setToken("");
      return result;
    } catch (error) {
      console.log(error);
    }
  },
};

export default userApi;
