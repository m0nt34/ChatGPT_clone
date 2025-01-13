import SyntaxHighlighter from "react-syntax-highlighter";
import Logo from "../../assets/icons/Logo";
import style from "../../assets/styles/pages/chatpage.module.scss";
import { useChat } from "../../store/chat";
import Markdown from "react-markdown";
import { tomorrowNightBright } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useEffect, useRef } from "react";
import ScrollDown from "./ScrollDown";
import { useLoading } from "../../store/chatLoading";
import LoaderDot from "../../assets/icons/animated/LoaderDot";

const Chat = () => {
  const { chats } = useChat();
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const { loading } = useLoading();
  useEffect(() => {
    scrollDownFunc();
  }, [chats]);
  const scrollDownFunc = () => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={style.chatPage}>
      <div className={style.chat}>
        {chats.map((message, i) => {
          return message.user ? (
            <div key={i} className={`${style.wrapper}`}>
              <div className={`${style.message} ${style.user}`}>
                {message.text}
              </div>
            </div>
          ) : (
            <div key={i} className={`${style.wrapper}`}>
              <div className={`${style.message}`}>
                <div className={style.AIIcon}>
                  <div className={style.logo}>
                    <Logo />
                  </div>
                </div>
                <div className={style.text}>
                  <Markdown
                    children={message.text}
                    components={{
                      code({ node, className, children, ...props }) {
                        const language = className
                          ? className.replace("language-", "")
                          : null;
                        console.log(className);

                        if (language) {
                          return (
                            <>
                              <div className={style.pre_header}>{language}</div>
                              <SyntaxHighlighter
                                style={tomorrowNightBright}
                                className={style.markdown_cont}
                                //showLineNumbers={true}
                                customStyle={{
                                  display: "flex",
                                  justifyContent: "flex-start",
                                  width: "100%",
                                  maxWidth: "100%",
                                  backgroundColor: "#0d0d0d",
                                  padding: "0",
                                }}
                                language={language}
                              >
                                {String(children).replace(/\n$/, "")}
                              </SyntaxHighlighter>
                            </>
                          );
                        }
                        return (
                          <code className={className} {...props}>
                            {children}
                          </code>
                        );
                      },
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
        {loading && (
          <div className={style.loading_response}>
            <div className={style.AIIcon}>
              <div className={style.logo}>
                <Logo />
              </div>
            </div>
            <div className={style.loader}>
              <LoaderDot/>
            </div>
          </div>
        )}
        <div ref={scrollRef}></div>
        <ScrollDown scrollRef={scrollRef} />
      </div>
    </div>
  );
};

export default Chat;
