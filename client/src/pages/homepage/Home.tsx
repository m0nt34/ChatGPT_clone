import { Link } from "react-router-dom";
import style from "../../assets/styles/pages/homepage.module.scss";
import botIMG from "../../assets/images/bot.png";
import { TypeAnimation } from "react-type-animation";
import { useState } from "react";
import humanIMG from "../../assets/images/human.jpeg";
import Logo from "../../assets/icons/Logo";
const Home = () => {
  const [botImg, setBotImg] = useState<boolean>(false);
  return (
    <div className={style.homepage}>
      <div className={style.wrapper}>
        <div className={style.left}>
          <h1>GPT AI</h1>
          <h2>Boost your creativity and productivity</h2>
          <h3>
            Discover the power of advanced AI to elevate your projects,
            streamline workflows, and unlock new possibilities.
          </h3>
          <Link to="/dashboard">Get Started</Link>
        </div>
        <div className={style.right}>
          <div className={style.img_cont}>
            <img
              className={style.bot_img}
              src={botIMG}
              alt=""
              draggable={false}
            />
            <div className={style.chat}>
              <img src={botImg ? botIMG : humanIMG} alt="" draggable={false} />
              <TypeAnimation
                sequence={[
                  "What can you do?",
                  2000,
                  () => {
                    setBotImg(true);
                  },
                  "I can assist you with anything you need!",
                  2000,
                  () => {
                    setBotImg(false);
                  },
                  "Can you help me learn?",
                  2000,
                  () => {
                    setBotImg(true);
                  },
                  "Of course! Let’s explore together.",
                  2000,
                  () => {
                    setBotImg(false);
                  },
                ]}
                wrapper="span"
                repeat={Infinity}
                omitDeletionAnimation={true}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={style.terms}>
        <div className={style.logo}>
          <Logo />
        </div>
        <div className={style.links}>
          <Link to="https://openai.com/policies/row-terms-of-use/">
            Terms of Service
          </Link>
          |
          <Link to="https://openai.com/policies/row-privacy-policy/">
            Privacy policy
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
