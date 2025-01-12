import { IKContext, IKUpload } from "imagekitio-react";
import axios from "axios";
import { ImgState } from "../types/types";
import Clip from "../assets/icons/Clip";
import style from "../assets/styles/components/inputForm.module.scss";

const urlEndpoint = import.meta.env.VITE_IMAGE_KIT_ENDPOINT;
const publicKey = import.meta.env.VITE_IMAGE_KIT_PUBLIC_KEY;

const authenticator = async () => {
  try {
    const response = await axios.get(
      `http://localhost:${import.meta.env.VITE_BACKEND_PORT}/api/upload`
    );
    const data = response.data;

    const { Signature, Expires, Token } = data;

    return { signature: Signature, expire: Expires, token: Token };
  } catch (error) {
    console.log(error);
  }
};

type SetImgType = React.Dispatch<React.SetStateAction<ImgState>>;

const Upload = ({
  setImg,
  deleteIMGFunc,
}: {
  setImg: SetImgType;
  deleteIMGFunc: () => void;
}) => {
  const onError = (err: any) => {
    console.log("Error", err);
    setImg((prev) => ({ ...prev, isLoading: false }));
  };

  const onSuccess = (res: any) => {
    console.log("Success", res);

    deleteIMGFunc();
    setImg((prev) => ({ ...prev, isLoading: false, dbData: res }));
  };

  const onUploadProgress = (progress: any) => {
    console.log("Progress", progress);
  };

  const onUploadStart = (evt: any) => {
    setImg((prev) => ({ ...prev, isLoading: true }));
    console.log("Start", evt);
  };

  return (
    <IKContext
      urlEndpoint={urlEndpoint}
      publicKey={publicKey}
      authenticator={authenticator}
    >
      <IKUpload
        fileName="test-upload.png"
        onError={onError}
        onSuccess={onSuccess}
        useUniqueFileName={true}
        onUploadProgress={onUploadProgress}
        onUploadStart={onUploadStart}
        style={{ display: "none" }}
        id="upload"
      />
      <label className={style.clip} htmlFor="upload">
        <Clip />
      </label>
    </IKContext>
  );
};

export default Upload;
