import { useState, useRef, useEffect } from "react";
import style from "../assets/styles/components/inputForm.module.scss";
import ArrowUp from "../assets/icons/ArrowUp";
import Upload from "../services/Upload";
import { ImgState } from "../types/types";
import { IKImage } from "imagekitio-react";
import XIcon from "../assets/icons/XIcon";
import { deleteIMG } from "../services/deleteIMG";
import Loader from "../assets/icons/animated/Loader";
import { useChat } from "../store/chat";
import { useLoading } from "../store/chatLoading";
import { getResponse } from "../services/gptResponse";

const InputForm = () => {
  const [text, setText] = useState<string>("");
  const { addChat } = useChat();
  const { setLoading } = useLoading();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [img, setImg] = useState<ImgState>({ isLoading: false, error: "", dbData: {}, aiData: { inlineData: { data: "", mimeType: "" } }, });
  const handleInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "20px";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };
  useEffect(() => {
    handleInput();
  }, []);
  const deleteImg = (clear = true) => {
    if (img.dbData.fileId && clear) {
      deleteIMG(img.dbData.fileId);
    }
    setImg({ isLoading: false, error: "", dbData: {}, aiData: { inlineData: { data: "",mimeType: "" }, },});
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const prop = text.trim();
    if (!prop && !img.dbData.url) return;
    setLoading(true);

    setText("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "20px";
    }

    addChat({user: true,img: img.dbData?.url ? img.dbData.url : "",text: prop});
    const imgCopy = { ...img };
    deleteImg(false);
    const { error, res } = await getResponse({ imgCopy, prop });

    if (error) {
      setLoading(false);
      addChat({user: false,img: "",text: res});
    } else {
      setLoading(false);
      addChat({user: false,img: "",text: res});
    }
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
                <button onClick={() => deleteImg()}>
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
          <form
            action="*"
            onSubmit={handleSubmit}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSubmit(e);
            }}
          >
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
