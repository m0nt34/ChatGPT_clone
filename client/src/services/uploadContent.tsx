import axios from "axios";
import { historyType } from "../types/types";

export const uploadContent = async (reqObj: historyType, id: string) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/chats/upload/${id}`,
      reqObj
    );
  } catch (err) {
    console.log(err);
  }
};
