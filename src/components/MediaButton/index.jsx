import React, { useState } from "react";
import close from "../../assets/icons/close-btn.png";
import up from "../../assets/icons/up.png";
import callBack from "../../assets/icons/call-back.png";
import { useSelector, useDispatch } from "react-redux";
import { setModalAction } from "../../store/reducers/modalSlice";

const MediaButton = () => {
  const [isUp, setIsUp] = useState(false);
  const info = useSelector((state) => state.info);

  const dispatch = useDispatch();

  return (
    <div className="media-buttons">
      <div
        className="up"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <img src={up} />
      </div>
      <div className="callBack" onClick={() => setIsUp(!isUp)}>
        {!isUp ? (
          <img src={callBack} />
        ) : (
          <>
            <img src={close} />{" "}
            <div className="callBack__links">
              {info.loading ? (
                <div>Loading</div>
              ) : (
                <>
                  <div>
                    <a
                      target="_blank"
                      href={info.data.mobileSocialMedia[0].data}
                    >
                      <img
                        src={info.data.mobileSocialMedia[0].src}
                        alt={info.data.mobileSocialMedia[0].title}
                      />
                    </a>
                  </div>
                  <div>
                    <a
                      target="_blank"
                      href={info.data.mobileSocialMedia[1].data}
                    >
                      <img
                        src={info.data.mobileSocialMedia[1].src}
                        alt={info.data.mobileSocialMedia[1].title}
                      />
                    </a>
                  </div>
                  <div
                    onClick={() => {
                      dispatch(setModalAction());
                    }}
                  >
                    <img
                      src={info.data.mobileSocialMedia[2].src}
                      alt={info.data.mobileSocialMedia[2].title}
                    />
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MediaButton;
