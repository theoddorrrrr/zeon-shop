import React from "react";
import { useSelector } from "react-redux";

const Advantages = () => {
  const mainInfo = useSelector((state) => state.mainInfo);
  return (
    <>
      {mainInfo.loading ? (
        <div>Loading</div>
      ) : (
        <div className="advantages container">
          <h2 className="advantages__title title">Наши преимущества</h2>
          <div className="advantages__items">
            {mainInfo?.data?.advantages?.map((item) => {
              return (
                <div className="advantages__item" key={item.id}>
                  <div className="advantages__img">
                    <img src={item.src} alt={item.title} />
                  </div>
                  <div className="advantages__text">{item.title}</div>
                  <div className="advantages__description">
                    {item.description}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Advantages;
