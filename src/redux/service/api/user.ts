import axios from "axios"
import { ILogin, IRegisterUser, IUpdUser } from "../../../interfaces";


const backendUrl = process.env.REACT_APP_API_URL;
console.log(backendUrl)

export const instance = axios.create({
    baseURL: backendUrl
})

export const setToken = (token: string) => {
  if (token) {
    return instance.defaults.headers.authorization = `Bearer ${token}`;
  }
  instance.defaults.headers.authorization = ``;
}

const userApi = {
  register: async (data: IRegisterUser) => {
    try {
      const {data: result} = await instance.post("/users/register", data);
      return result;
    } catch (error) {
      console.log(error);
    }
  },
  login: async (data: ILogin) => {
    try {
      const {data: result} = await instance.post('/users/login', data);
      return result;
    } catch (error) {
      console.log(error)
    }
  },
  current: async (token: string) => {
    console.log('here')
    try {
      setToken(token)
      const { data: result } = await instance.get('/users/current');
      return result;
    } catch (error) {
      console.log(error)
    }
  },
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
      const {data: result} = await instance.patch(`/users/${id}/update`, formData);
      return result;
    } catch (error) {
      console.log(error)
    }
  },
  logout: async () => {
    try {
      const { data: result } = await instance.post(`/users/logout`);
      setToken("");
      return result
    } catch (error) {
      console.log(error)
    }
  }
};


export default userApi;