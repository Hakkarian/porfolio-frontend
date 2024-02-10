import axios from "axios";

const backendUrl = process.env.REACT_APP_API_URL!;
console.log(backendUrl)
// create a basic instance for our apies
const instance = axios.create({
  withCredentials: true,
  baseURL: backendUrl,
});

instance.interceptors.request.use((config) => {
  console.log(config.headers.authorization);
  config.headers.authorization = `Bearer ${localStorage.getItem('accessToken')}`;
  console.log(config.headers.authorization, 'now?')
  return config;
})

instance.interceptors.response.use((config) => {
  return config;
}, async (error) => {
    const originalRequest = error.config;
  console.log('befour', error.response.message);
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
      console.log('aufter')
      originalRequest._isRetry = true;
      try {
      const { data: result } = await axios.get(`${backendUrl}/users/refresh`, {
        withCredentials: true,
      });
        localStorage.setItem('accessToken', result.accessToken);
        console.log('herehe');
      return instance.request(originalRequest);
    } catch (error) {
      console.log('User is unauthorized: ', error)
    }
  }
  throw error
})



export default instance;