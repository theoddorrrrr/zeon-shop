import React, { useState } from "react";
import close from "../../assets/icons/close-btn.png";
import up from "../../assets/icons/up.png";
import callBack from "../../assets/icons/call-back.png";

const MediaButton = () => {
  const [isUp, setIsUp] = useState(false);

  return (
    <div className="media-buttons">
      <div
        className="up"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <img src={up} />
      </div>
      <div className="callBack" onClick={() => setIsUp(!isUp)}>
        {!isUp ? <img src={callBack} /> : <img src={close} />}
      </div>
    </div>
  );
};

export default MediaButton;
