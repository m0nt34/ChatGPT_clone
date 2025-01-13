import { useState, useRef, useEffect } from "react";
import style from "../assets/styles/components/inputForm.module.scss";
import ArrowUp from "../assets/icons/ArrowUp";
import Upload from "../services/Upload";
import { ImgState } from "../types/types";
import { IKImage } from "imagekitio-react";
import XIcon from "../assets/icons/XIcon";
import { deleteIMG } from "../services/deleteIMG";
import Loader from "../assets/icons/animated/Loader";
import model from "../lib/gemini";
import { useChat } from "../store/chat";
import { useLoading } from "../store/chatLoading";
const InputForm = () => {
  const [text, setText] = useState<string>("");
  const { addChat } = useChat();
  const { setLoading } = useLoading();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [img, setImg] = useState<ImgState>({
    isLoading: false,
    error: "",
    dbData: {},
  });
  const handleInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "20px";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };
  useEffect(() => {
    handleInput();
  }, []);
  const deleteImg = () => {
    if (img.dbData.fileId) {
      deleteIMG(img.dbData.fileId);
    }
    setImg({
      isLoading: false,
      error: "",
      dbData: {},
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const prop = text.trim();
    if (!prop) return;
    setLoading(true);

    setText("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "20px";
    }
    addChat({
      user: true,
      img: "",
      text: prop,
    });
    const result = await model.generateContent(prop);
    setLoading(false);

    addChat({
      user: false,
      img: "",
      text: result.response.text(),
    });
  };
  return (
    <>
      <div className={style.main_cont}>
        <div className={style.input_field}>
          {img.isLoading ? (
            <div className={style.imgs_cont}>
              <Loader />
            </div>
          ) : img.dbData?.filePath ? (
            <div className={style.imgs_cont}>
              <div className={style.img_cont}>
                <button onClick={deleteImg}>
                  <XIcon />
                </button>
                <IKImage
                  urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                  path={img.dbData.filePath}
                  width="56"
                  height="56"
                />
              </div>
            </div>
          ) : null}
          <form action="*" onSubmit={handleSubmit}>
            <div className={style.input_cont}>
              <textarea
                ref={textareaRef}
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                  handleInput();
                }}
                placeholder="Message ChatGPT"
              />
            </div>
            <div className={style.bottom_cont}>
              <Upload setImg={setImg} deleteIMGFunc={deleteImg} />
              <input type="file" id="file" multiple={false} hidden />
              <button className={style.arrow_btn} type="submit">
                <ArrowUp />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default InputForm;
