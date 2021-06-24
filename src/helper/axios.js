import axios from "axios";
import { API } from "../urlConfig";

const token = localStorage.getItem("token");
const axiosInstance = axios.create({
  baseURL: API,
  headers: { Authorization: `bearer ${token}` },
});

export default axiosInstance;
