import axios from "axios";
import { API } from "../urlConfig";

const axiosInstance = axios.create({ baseURL: API });

export default axiosInstance;
