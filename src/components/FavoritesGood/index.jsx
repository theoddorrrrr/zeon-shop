import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  setUnFavorites,
} from "../../store/reducers/favoritesSlice";

import favoriteActive from "../../assets/icons/heart-good-filled.png";
import { useState } from "react";

const FavoritesGood = ({item}) => {
  const [index, setIndex] = useState(0);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const unFavoriteHandler = (e, item) => {
    e.stopPropagation();
    dispatch(setUnFavorites(item));
  };

  return (
    <div
      onClick={() => navigate(`/collections/${item.collection}/${item.id}`)}
      key={item.id}
      className="goods__item"
    >
      <div className="goods__images">
        {item.price?.discount && (
          <div className="goods__discount">
            <span>{item.price.discount}%</span>
          </div>
        )}

        <div
          onClick={(e) => unFavoriteHandler(e, item)}
          className="goods__favorite"
        >
          <img src={favoriteActive} alt="Favorite" />
        </div>

        <div className="goods__img">
          <img
            className="goods__img_main"
            src={item.src[index]}
            alt={item.title}
          />

          <div className="goods__img_hidden">
            {item.src.map((item, index) => {
              return (
                <img
                  className="goods__img_hover"
                  src={item}
                  onMouseOver={() => setIndex(index)}
                  onMouseLeave={() => setIndex(0)}
                  alt={item.title}
                  key={Math.random()}
                ></img>
              );
            })}
          </div>
        </div>

        <div
          style={{ left: `${10 + 25 * index}px`, transition: "0.5s ease" }}
          className="hover"
        ></div>
      </div>
      <div className="goods__body">
        <div className="goods__title">{item.title}</div>
        <div className="goods__prices">
          {item.isDiscount ? (
            <>
              <span className="goods__price">{item.price.price} р</span>
              <span className="goods__old-price">{item.price?.oldPrice} р</span>
            </>
          ) : (
            <span className="goods__price">{item.price.price} р</span>
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

export default FavoritesGood;
