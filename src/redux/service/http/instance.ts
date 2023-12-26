import axios from "axios";

const backendUrl = process.env.REACT_APP_API_URL!;
// create a basic instance for our apies
const instance = axios.create({
  withCredentials: true,
  baseURL: backendUrl,
});

instance.interceptors.response.use((config) => {
  return config;
}, async (error) => {
  try {
    const originalRequest = error.config;
    console.log('error refr', error.response.status)
    if ((error.response.status === 401)) {
      console.log('yeehoo')
      await axios.get(`${backendUrl}/users/refresh`, {
        withCredentials: true,
      });
      console.log('resii')
    }
    instance.request(originalRequest);
  } catch (error) {
    console.log('User is unauthorized: ', error)
  }
})

export const setToken = (token: string) => {
  console.log("Im free");
  if (token) {
    instance.defaults.headers.authorization = `Bearer ${token}`;
    return;
  }
  console.log("or else...");
    instance.defaults.headers.authorization = ``;
    return;
};

export default instance;