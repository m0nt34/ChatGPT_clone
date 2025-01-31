import axios from "axios";

export const getChatList = async (id: String) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/user/get/${id}`
    );
    return res.data.data.Chats;
  } catch (err) {
    console.log(err);
    return [];
  }
};
