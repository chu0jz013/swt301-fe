import axios from 'axios';
const BASE_URL = 'http://localhost:8888/api/v1/';
export default axios.create({
  baseURL: BASE_URL,
});
export const privateAxios = axios.create({
  baseURL: BASE_URL,
});
privateAxios.interceptors.request.use(
  (config) => {
    console.log(config.url);
    const token = JSON.parse(localStorage.getItem('token'));
    config.headers.Authorization = `Bearer ${token}`;
    // if (config.method === 'post' && config.url === 'user') {
    //   config.headers['Content-Type'] = 'multipart/data-form';
    // }
    return config;
  },
  (error) => Promise.reject(error)
);
// privateAxios.interceptors.response.use(
//   function (response) {
//     console.log(response);
//     return response;
//   },
//   function (error) {
//     console.log(error);
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     return Promise.reject(error);
//   }
// );
