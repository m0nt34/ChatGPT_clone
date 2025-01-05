import { useState, useRef } from "react";
import style from "../assets/styles/components/inputForm.module.scss";
import Clip from "../assets/icons/Clip";
import ArrowUp from "../assets/icons/ArrowUp";

const InputForm = () => {
  const [text, setText] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "20px";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  return (
    <div className={style.main_cont}>
      <div className={style.input_field}>
        <form action="*">
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
            <button className={style.clip} type="button">
              <Clip />
            </button>
            <button className={style.arrow_btn} type="button">
              <ArrowUp />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InputForm;
