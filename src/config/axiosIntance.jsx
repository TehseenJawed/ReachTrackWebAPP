import { store } from '../redux/store';
import { updateAccessToken } from '../redux/actions/authActions';
import axios from 'axios';
const { REACT_APP_DEV_URL } = process.env
const accessToken = localStorage.getItem('access_token')
const header = accessToken ? {
  Authorization: `Bearer ${accessToken}`
} : {}
const api = axios.create({
  baseURL: REACT_APP_DEV_URL,
  headers: {
    ...header
  },
  withCredentials: true,
})


let axiosInterceptor = null; // outer variable

const refreshToken = async () => {
  if (!!axiosInterceptor || axiosInterceptor === 0) {
    axios.interceptors.request.eject(axiosInterceptor);
  }
  await api.get('/refresh-token')
      .then((response) => {
        return response?.data?.data?.accessToken;
      })
      .catch((error) => {
        window.location.pathname = "/login"
      })
}

axiosInterceptor = api.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    if (error.response.status === 401) {
      window.location.href = '/login'
      // try {
      //   const newAccessToken = await refreshToken()
      //   if (newAccessToken) {
      //     axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;

      //     const originalRequest = error.config;
      //     originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

      //     return axios(originalRequest)
      //     store.dispatch(updateAccessToken(accessToken))
      //     localStorage.setItem("access_token", accessToken)
      //   }
      // }
      // catch (refreshError) {
      //   return Promise.reject(error)
      // }
    } else {
      return Promise.reject(error);
    }
  }
);

export { api }