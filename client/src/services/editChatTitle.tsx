import axios from "axios";
import { EditReq } from "../types/types";

export const editChatTitle = async (userID: string, reqObj: EditReq) => {
  try {
    await axios.patch(
      `${import.meta.env.VITE_BACKEND_URL}/user/edit/${userID}`,
      reqObj
    );
  } catch (err) {
    console.log(err);
  }
};
