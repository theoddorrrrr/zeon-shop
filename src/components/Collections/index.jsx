import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchMoreColletions } from "../../api/API";
import arrow from "../../assets/icons/up.png";

const Collections = () => {
  const collections = useSelector((state) => state.collections);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const getMoreCollections = () => {
    dispatch(fetchMoreColletions());
  };
  return (
    <>
      {collections.loading ? (
        <div>Loading</div>
      ) : (
        <div className="collections">
          <div className="collections__text title">Коллекция</div>
          <div className="collections__items">
            {collections.data.map((item) => {
              return (
                <div
                  onClick={() => navigate(`/collections/${item.goods}`)}
                  className="collections__item"
                  key={item.id}
                >
                  <div className="collections__img">
                    <img src={item.src} alt={item.title} />
                    <div className="collections__title">{item.title}</div>
                  </div>

                  <div className="collections__button">
                    <button className="button btn button-show-all">
                      <span>Смотреть все</span>
                      <img className="arrow-more" src={arrow} alt="arrow" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {collections.data.length <= 4 && (
        <button onClick={getMoreCollections} className="button btn button-load">
          Еще
        </button>
      )}
    </>
  );
};

export default Collections;
