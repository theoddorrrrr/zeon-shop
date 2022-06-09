import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAllCollections } from "../../api/API";
import arrow from "../../assets/icons/up.png";


const CollectionsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const collections = useSelector((state) => state.collections);

  useEffect(() => {
    dispatch(fetchAllCollections());
  }, []);

  return (
        <>
      {collections.loading ? (
        <div>Loading</div>
      ) : (
        <div className="collections">
          <div className="collections__text text">Коллекции</div>
          <div className="collections__items">
            {collections.all.map((item) => {
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
    </>
)};

export default CollectionsPage;
