import axiosInstance from "../api";

export const getRoomByUser = async (userId) => {
  try {
    const result = await axiosInstance.get(`/rooms/${userId}`);
    return result.data;
  } catch (error) {
    console.error("Error: " + error);
  }
};
export const createRoom = async (data) => {
  try {
    const result = await axiosInstance.post(`/rooms`, data);
    return result.data;
  } catch (error) {
    console.error("Error: " + error);
  }
};
