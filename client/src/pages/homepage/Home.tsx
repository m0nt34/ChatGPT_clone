import { Link } from "react-router-dom";
import style from "../../assets/styles/pages/homepage.module.scss";
import botIMG from "../../assets/images/bot.png";
const Home = () => {
  return (
    <div className={style.homepage}>
      <div className={style.left}>
        <h1>GPT AI</h1>
        <h2>Supercharge your creativity and productivity</h2>
        <h3>
          Discover the power of advanced AI to elevate your projects, streamline
          workflows, and unlock new possibilities.
        </h3>
        <Link to="/dashboard">Get Started</Link>
      </div>
      <div className={style.right}>
        <div className={style.img_cont}>
          <img src={botIMG} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Home;
