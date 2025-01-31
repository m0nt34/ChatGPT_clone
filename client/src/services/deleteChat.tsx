import axios from "axios";

export const deleteChatService = async (id: string) => {
  try {
    const res = await axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/user/delete/${id}`
    );
  } catch (err) {
    console.log(err);
  }
};
