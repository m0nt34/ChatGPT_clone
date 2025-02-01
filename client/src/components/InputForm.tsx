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
import Stop from "../assets/icons/Stop";
import { useUser } from "@clerk/clerk-react";
import { createNewChat } from "../services/createNewChat";
import { useChatList } from "../store/chatList";
import { useNavigate } from "react-router-dom";
import { uploadContent } from "../services/uploadContent";
import { useCurrentChatId } from "../store/currectChatId";

const InputForm = () => {
  const [text, setText] = useState<string>("");
  const { chats, addChat } = useChat();
  const { loading, setLoading } = useLoading();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { user } = useUser();
  const { addChatToChatList } = useChatList();
  const { currentChatId, setCurrentChatId } = useCurrentChatId();
  const [img, setImg] = useState<ImgState>({ isLoading: false, error: "", dbData: {}, aiData: { inlineData: { data: "", mimeType: "" } } });

  const navigate = useNavigate();
  const handleInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "24px";
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
    setImg({ isLoading: false, error: "", dbData: {}, aiData: { inlineData: { data: "", mimeType: "" } } });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const prop = text.trim();
    if (!prop && !img.dbData.url) return;
    setLoading(true);
    let tempID = "";
    setText("");
    handleInput();
    if (textareaRef.current) {
      textareaRef.current.style.height = "24px";
    }
    if (!chats.length && user) {
      const response = await createNewChat(user.id, prop.substring(0, 50));

      if (response) {
        addChatToChatList(response);
        setCurrentChatId(response.ID);
        tempID = response.ID;
      }
      navigate(`/dashboard/chats/${response.ID}`);
    }
    const newHistory = { Role: "user", Parts: [{ Text: prop }] as [{ Text: string }], Image: img.dbData?.url ? img.dbData.url : "" };
    addChat(newHistory);
    uploadContent(newHistory, tempID ? tempID : currentChatId);
    const imgCopy = { ...img };
    deleteImg(false);
    const { res } = await getResponse({ imgCopy, prop });

    setLoading(false);
    const modelReq = { Role: "model", Parts: [{ Text: res }] as [{ Text: string }], Image: "" };
    addChat(modelReq);
    uploadContent(modelReq, tempID ? tempID : currentChatId);
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
              <button
                className={style.arrow_btn}
                type="submit"
                style={{ pointerEvents: loading ? "none" : "all" }}
              >
                {loading ? <Stop /> : <ArrowUp />}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default InputForm;
