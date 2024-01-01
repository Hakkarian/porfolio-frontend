import { ILogin, IRegisterUser, IUpdUser } from "../../../interfaces";
import instance, {setToken} from "../http/instance";

// we're getting an address of the backend
const backendUrl = process.env.REACT_APP_API_URL;

// create a basic instance for our apies

// generate a function setToken, which checks to see
// if our authorization string has a bearer token
// or just an empty string

// an object with multiple methods:
// transfer the data to the database specific location
const userApi = {
  // to register a user
  register: async (data: IRegisterUser) => {
    try {
      const { data: result } = await instance.post("/users/register", data, {withCredentials: true});
      return result;
    } catch (error) {
      console.log(error);
    }
  },
  login: async (data: ILogin) => {
    // to log in them
    try {
      const {data: result} = await instance.post(`/users/login`, data, {withCredentials: true});
      localStorage.setItem('token', result.accessToken);
      return result;
    } catch (error) {
      console.log(error);
    }
  },

  
  // here we're not passing any data, only user token
  // to return the user which has this token
  current: async () => {
    try {
      const { data: result } = await instance.get(`/users/refresh`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      console.log('refresh res', result);
      localStorage.setItem('token', result.accessToken);
      instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
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
    console.log(`/users/${id}/update`);
    try {
      const formData = new FormData();

      for (let el in data) {
        console.log(`${el}`);
        if (data[el]) {
          if (el !== "avatar") {
            formData.append(`${el}`, data[el] as string);
          } else {
            console.log(`${el}`);
            formData.append(`${el}`, data[el] as string | Blob);
          }
        }
      }
      // and update but the id of the user
      const { data: result } = await instance.patch(
        `/users/${id}/update`,
        formData
      );
      console.log('upd res', result);
      return result;
    } catch (error) {
      console.log(error);
    }
  },
  
  // an api method to log out the user
  logout: async () => {
    try {
      const { data: result } = await instance.post(`${backendUrl}/users/logout`, { withCredentials: true });
      console.log('logout res', result);
      // just discard a token of the user to end a session
      localStorage.removeItem('token');
      return result;
    } catch (error) {
      console.log(error);
    }
  },
};

export default userApi;
