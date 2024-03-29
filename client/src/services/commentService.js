import axiosInstance from "../api";

export const createComment = async (data) => {
  try {
    const result = await axiosInstance.post("/comments", data);
    return result.data;
  } catch (error) {
    console.error("Error: " + error);
  }
};

export const getCommentByPost = async (postId) => {
  try {
    const result = await axiosInstance.get(`/comments/post/${postId}`);
    return result.data;
  } catch (error) {
    console.error("Error: " + error);
  }
};

export const deleteComment = async (commentId) => {
  try {
    const result = await axiosInstance.delete(`/comments/${commentId}`);
    return result.data;
  } catch (error) {
    console.error("Error: " + error);
  }
};
