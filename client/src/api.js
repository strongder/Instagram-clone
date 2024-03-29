import axios from "axios";

// const token = localStorage.getItem('token');

const axiosInstance = axios.create({
  baseURL: "http://localhost:8081/api",
  headers: {
    "Content-type": "application/json",
    // "Authorization": `Bearer ${token}` // Thêm token vào header Authorization
  },
});

export default axiosInstance;
