import axios from "axios";
import { ILogin, IRegister, IUpdUser } from "../../../interfaces";
import instance from "../http/instance";

// we're getting an address of the backend
const backendUrl = process.env.REACT_APP_API_URL;

// create a basic instance for our apies

// an object with multiple methods:
// transfer the data to the database specific location
const userApi = {
  // to register a user
  register: async (data: IRegister) => {
    try {
      console.log('before fetch')
      const { data: result } = await axios.post(`${backendUrl}/users/register`, data);
      console.log('after fetch')
      return result;
    } catch (error) {
      console.log(error);
    }
  },
  login: async (data: ILogin) => {
    // to log in them
    try {
      const { data: result } = await axios.post(`${backendUrl}/users/login`, data, {
        withCredentials: true,
      });
      localStorage.setItem('accessToken', result.accessToken);
      return result;
    } catch (error) {
      console.log(error);
    }
  },

  
  // here we're not passing any data, only user token
  // to return the user which has this token
  current: async () => {
    try {
      const { data: result } = await axios.get(`${backendUrl}/users/refresh`, {
        withCredentials: true,
      });
      console.log(result, 'result');
      return result;
    } catch (error) {
      console.log(error);
    }
  },
  // update user credentials
  // check if data has username, email, location, birthday, phone and avatar
  // if some field is empty, continue
  // until you find out which field must be changed
  updateInfo: async (data: IUpdUser, id: string) => {
    console.log(`/users/${id}/update`);
    try {
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
      const { data: result } = await instance.post(
        `/users/logout`,
        {
          withCredentials: true,
        }
      );
      // just discard a token of the user to end a session
      localStorage.removeItem('accessToken');
      return result;
    } catch (error) {
      console.log(error);
    }
  },
};

export default userApi;
