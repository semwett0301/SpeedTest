import axiosConfig from "../../config/axiosConfig";
import axios from "axios";

export const networkInstance = axios.create({
    baseURL: axiosConfig.baseUrl + axiosConfig.modules.network
})


