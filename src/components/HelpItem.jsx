import React, { useState } from "react";
import arrow from "../assets/icons/help.png";

const HelpItem = (props) => {
  const { item } = props;
  const [isShow, setIsShow] = useState(false);

  return (
    <>
      <div className="help__item" onClick={() => setIsShow(!isShow)}>
        <div className="help__title">
          <span>{item.question}</span>
          <img className={!isShow ? "help__button" : "help__button rotate"} src={arrow} alt="Aroow" />
        </div>
        {isShow && (
          <div className="about-us__description help__description">
            {item.answer}
          </div>
        )}
      </div>
    </>
  );
};

export default HelpItem;
