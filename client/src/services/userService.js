import axios from "axios";
import axiosInstance from "../api.js";

export const createUser = async (userData) => {
  try {
    const result = await axios.post(
      `http://localhost:8081/api/register`,
      userData
    );
    return result.data;
  } catch (error) {
    console.error("Error: " + error);
  }
};

export const getUserById = async (id) => {
  try {
    const result = await axiosInstance.get(`/users/${id}`);
    return result.data;
  } catch (error) {
    console.error("Error: " + error);
  }
};

export const getAllUsers = async () => {
  try {
    const result = await axiosInstance.get(`/users`);
    return result.data;
  } catch (error) {
    console.error("Error: " + error);
  }
};

export const getFriendsByUser = async (userId) => {
  try {
    const result = await axiosInstance.get(`/users/friends/${userId}`);
    return result.data;
  } catch (error) {
    console.error("Error: " + error);
  }
};
