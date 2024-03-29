import axiosInstance from "../api";


export const createPost = async (data) => {
  try {
    const result = await axiosInstance.post("/posts", data);
    return result.data;
  } catch (error) {
    console.error("Error: " + error);
  }
};

export const getAllPost = async () => {
  try {
    const result = await axiosInstance.get(`/posts`);
    return result.data;
  } catch (error) {
    console.error("Error: " + error);
  }
};

export const getPostByUser = async (userId) => {
  try {
    const result = await axiosInstance.get(`/posts/${userId}`);
    return result.data;
  } catch (error) {
    console.error("Error: " + error);
  }
};
