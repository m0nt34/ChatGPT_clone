import React, { useEffect, useState } from "react";
import ArrowDown from "../../assets/icons/ArrowDown";
import style from "../../assets/styles/pages/chatpage.module.scss";

type props = {
  scrollRef: React.RefObject<HTMLDivElement>;
}

const ScrollDown = ({scrollRef}:props) => {
  const [isInView, setIsInView] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 1.0 }
    );

    if (scrollRef.current) {
      observer.observe(scrollRef.current);
    }

    return () => {
      if (scrollRef.current) {
        observer.unobserve(scrollRef.current);
      }
    };
  }, []);
  return (
    !isInView && (
      <div
        className={style.arrow_down}
        onClick={() =>
          scrollRef.current?.scrollIntoView({ behavior: "smooth" })
        }
      >
        <ArrowDown />
      </div>
    )
  );
};

export default ScrollDown;
