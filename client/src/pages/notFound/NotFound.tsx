import { TypeAnimation } from "react-type-animation";
import Logo from "../../assets/icons/Logo";
import style from "../../assets/styles/pages/notFound.module.scss";
import { useState } from "react";
import { notFoundPageTexts } from "../../data/notFoundPageTexts";

const NotFound = () => {
  const [str] = useState<string>(
    notFoundPageTexts[Math.floor(Math.random() * notFoundPageTexts.length)]
  );

  return (
    <div className={style.wrapper}>
      <div className={style.content_cont}>
        <header>
          <div className={style.logo_cont}>
            <Logo />
          </div>
          <h2>404 Not Found</h2>
        </header>
        <div className={style.text}>
          <TypeAnimation
            sequence={[str]}
            wrapper="p"
            speed={40}
            repeat={0}
          />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
