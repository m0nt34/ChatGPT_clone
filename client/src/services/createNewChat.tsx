import axios from "axios";

export const createNewChat = async (id: string, title?: string) => {
  try {
    const reqObj = {
      ID: null,
      Title: title ? title : "New Chat",
      CreatedAt: null,
    };
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/user/create/${id}`,
      reqObj
    );

    return res.data.data || [];
  } catch (err) {
    console.log(err);
    return [];
  }
};
