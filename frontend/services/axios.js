import axios from 'axios';
import { BASE_API_URL } from "../src/utils/config";

const getAccessToken = () => {
  if (typeof window !== 'undefined') {
    // decrypt and encrypt later
    const accessToken = localStorage.getItem("token");
    return accessToken;
  }
};


const instance = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    'Accept': '*/*',
    'Authorization': `Bearer ${getAccessToken()}`,
  },
});

export default instance;