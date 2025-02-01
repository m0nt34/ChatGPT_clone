import axios from "axios";

export const deleteIMG = async (id: string) => {

  try {
    await axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/api/delete/img/${id}`
    );
  } catch (error) {
    console.log(error);
  }
};
