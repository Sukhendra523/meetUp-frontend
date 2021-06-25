import axios from "axios";
import { API } from "../urlConfig";
import store from "../store";

const token = window.localStorage.getItem("token");

const axiosInstance = axios.create({
  baseURL: API,
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
});

axiosInstance.interceptors.request.use((req) => {
  const { auth } = store.getState();
  if (auth.token) {
    req.headers.Authorization = `Bearer ${auth.token}`;
  }
  return req;
});

export default axiosInstance;
