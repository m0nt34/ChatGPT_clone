import axios from "axios";

export const deleteIMG = async (id: string) => {
  console.log(id);
  
  try {
    const res = await axios.delete(
      `http://localhost:${
        import.meta.env.VITE_BACKEND_PORT
      }/api/delete/img/${id}`
    );
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};
