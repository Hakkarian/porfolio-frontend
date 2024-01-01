import axios from "axios";

const backendUrl = process.env.REACT_APP_API_URL!;
// create a basic instance for our apies
const instance = axios.create({
  withCredentials: true,
  baseURL: backendUrl
});

// instance.interceptors.response.use((config) => {
//   const token = localStorage.getItem("token");
//   console.log("bearer intercept token", token);
//   config.headers.Authorization = localStorage.getItem("token");
//   console.log('headers', config.headers);
//   return config;
// })

instance.interceptors.response.use((config) => {
  console.log('config');
  return config;
}, async (error) => {
  try {
    const originalRequest = error.config;
    console.log('error resp', error)
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
      console.log('here');
      originalRequest._isRetry = true;
      console.log(originalRequest);
      const response = await axios.get(`${backendUrl}/users/refresh`, {
        withCredentials: true,
      })
      console.log('1234')
      localStorage.setItem('token', response.data.accessToken);
    }
    return instance.request(originalRequest);
  } catch (error) {
    console.log('User is unauthorized: ', error)
  }
  throw error
})

export const setToken = (token: string) => {
  console.log("Im free", token);
  if (token) {
    instance.defaults.headers.authorization = `Bearer ${token}`;
    return;
  }
  console.log("or else...");
    instance.defaults.headers.authorization = ``;
    return;
};

export default instance;