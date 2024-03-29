import axiosInstance from "../api";

export const sendFollow = async (data) => {
  try {
    const result = await axiosInstance.post("/follows/send", data);
    return result.data;
  } catch (error) {
    alert("Đã gửi yêu cầu")

    console.error("Error: " + error);
  }
};

export const accept = async (followId) => {
  try {
    const result = await axiosInstance.put(`/follows/accept/${followId}`);
    return result.data;
  } catch (error) {
    console.error("Error: " + error);
  }
};

export const decline = async (followId) => {
  try {
    const result = await axiosInstance.delete(`/follows/decline/${followId}`);
    return result.data;
  } catch (error) {
    console.error("Error: " + error);
  }
};

export const getFollowByUser = async (userId) => {
    try {
      const result = await axiosInstance.get(`/follows/${userId}`);
      return result.data;
    } catch (error) {
      console.error("Error: " + error);
    }
  };
