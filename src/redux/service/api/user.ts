import axios from "axios"
import { IUser } from "../../../interfaces";


const backendUrl = process.env.REACT_APP_API_URL;
console.log(backendUrl)

export const instance = axios.create({
    baseURL: backendUrl
})
const userApi = {
  register: async (data: IUser) => {
    try {
      const result = await instance.post("/users/register", data);
      return result;
    } catch (error) {
      console.log(error);
    }
  },
};

export default userApi;