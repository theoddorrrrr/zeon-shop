import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  setFavorites,
  setUnFavorites,
} from "../../store/reducers/favoritesSlice";

import favorite from "../../assets/icons/heart-good.png";
import favoriteActive from "../../assets/icons/heart-good-filled.png";

const Interested = ({ item, isFavorite }) => {
  const [index, setIndex] = useState(0);
  const dispatch = useDispatch();

  let navigate = useNavigate();

  const unFavoriteHandler = (e, item) => {
    e.stopPropagation();
    dispatch(setUnFavorites(item));
  };

  // Favorite Functions
  const favoriteHandler = (e, item) => {
    e.stopPropagation();
    dispatch(setFavorites(item));
  };

  return (
    <div
      className="goods__item"
      onClick={() => navigate(`/collections/${item.collection}/${item.id}`)}
      key={item.id}
    >
      <div className="goods__images">
        {item.price?.discount && (
          <div className="goods__discount">
            <span>{item.price.discount}%</span>
          </div>
        )}

        {isFavorite ? (
          <div
            onClick={(e) => unFavoriteHandler(e, item)}
            className="goods__favorite"
          >
            <img src={favoriteActive} alt="Favorite" />
          </div>
        ) : (
          <div
            onClick={(e) => favoriteHandler(e, item)}
            className="goods__favorite favorite"
          >
            <img src={favorite} alt="Favorite" />
          </div>
        )}

        <div className="goods__img">
          <div
            className="goods__img_main"
            style={{ backgroundImage: `url(${item.src[index]})` }}
          ></div>

          <div className="goods__img_hidden">
            {item.src.map((item, index) => {
              return (
                <img
                  className="goods__img_hover"
                  src={item}
                  onMouseOver={() => setIndex(index)}
                  onMouseLeave={() => setIndex(0)}
                  alt={item.title}
                  key={index}
                ></img>
              );
            })}
          </div>
          <div
            style={{ left: `${10 + index * 18}%`, transition: "0.5s ease" }}
            className="hover"
          ></div>
        </div>
      </div>
      <div className="goods__body">
        <div className="goods__title">{item.title}</div>
        <div className="goods__prices">
          {item.isDiscount ? (
            <>
              <span className="goods__price">
                {item.price.price.toLocaleString()} р
              </span>
              <span className="goods__old-price">
                {item.price?.oldPrice.toLocaleString()} р
              </span>
            </>
          ) : (
            <span className="goods__price">
              {item.price.price.toLocaleString()} р
            </span>
          )}
        </div>
        <div className="goods__sizes">Размер: {item.sizes}</div>
        <div className="goods__colors">
          {item.colors.map((color) => {
            return (
              <div
                key={color}
                className="goods__color"
                style={
                  color === "#FFFFFF"
                    ? {
                        backgroundColor: color,
                        border: "1px solid #D1D1D1",
                      }
                    : { backgroundColor: color }
                }
              ></div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Interested;
