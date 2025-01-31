import axios from "axios";

export const getChatContent = async (id: String) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/chats/get/${id}`
    );

    return res.data.data.History;
  } catch (err) {
    console.log(err);
    return [];
  }
};
