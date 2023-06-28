import axios from "axios"
import { ILogin, IRegisterUser, IUpdUser } from "../../../interfaces";


const backendUrl = process.env.REACT_APP_API_URL;
console.log(backendUrl)

export const instance = axios.create({
    baseURL: backendUrl
})

export const setToken = (token: string) => {
      instance.defaults.headers.authorization = `Bearer ${token}`;
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
      const result = await instance.post('/users/login', data);
      return result;
    } catch (error) {
      console.log(error)
    }
  },
  current: async (token: string) => {
    console.log('here')
    try {
      setToken(token)
      const result = await instance.get('/users/current');
      return result;
    } catch (error) {
      console.log(error)
    }
  },
  updateInfo: async (data: IUpdUser, id: string, token: string) => {
    try {
      console.log('upd api', data);
      setToken(token);
      const result = await instance.patch(`/users/${id}/update`, data);
      console.log('upd api result', result)
      return result;
    } catch (error) {
      console.log(error)
    }
  }
};


export default userApi;