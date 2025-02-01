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
      `${import.meta.env.VITE_BACKEND_URL}/api/upload`
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
    setImg((prev) => ({ ...prev, isLoading: false }));
    console.log(err);
  };

  const onSuccess = (res: any) => {
    setImg((prev) => ({ ...prev, isLoading: false, dbData: res }));
    console.log(res);
  };


  const onUploadStart = (evt: any) => {
    deleteIMGFunc();
    const file = evt.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImg((prev) => ({
        ...prev,
        isLoading: true,
        aiData: {
          inlineData: {
            data:
              typeof reader.result === "string"
                ? reader.result.split(",")[1]
                : "",
            mimeType: file.type,
          },
        },
      }));
    };

    reader.readAsDataURL(file);
  };

  return (
    <IKContext
      urlEndpoint={urlEndpoint}
      publicKey={publicKey}
      authenticator={authenticator}
    >
      <IKUpload
        fileName=""
        onError={onError}
        onSuccess={onSuccess}
        useUniqueFileName={true}
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
