import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { instance } from "../../api/API";
import cartImg from "../../assets/icons/cart.png";

import favorite from "../../assets/icons/heart-good.png";
import favoriteActive from "../../assets/icons/heart-good-filled.png";

import {
  setFavorites,
  setUnFavorites,
} from "../../store/reducers/favoritesSlice";

const Details = () => {
  const [data, setData] = useState([]);
  let { pathname } = useLocation();
  const dispatch = useDispatch();

  const favorites = useSelector((state) => state.favorites);

  const getData = async () => {
    const { data } = await instance.get(`${pathname}`);
    setData(data);
  };

  // Favorite Functions
  const favoriteHandler = (item) => {
    dispatch(setFavorites(item));
  };

  const unFavoriteHandler = (item) => {
    dispatch(setUnFavorites(item));
  };

  useEffect(() => {
    getData();
  }, []);

  const isFavorite = favorites.some((i) => i.id == data.id);
  useEffect(() => {}, [favorites]);

  return (
    <div>
      {!data.title ? (
        <div>Loading</div>
      ) : (
        <div className="details">
          <div className="details__left">
            <div className="details__images">
              {data.src.map((item, index) => {
                return (
                  <div key={index}>
                    <img src={item} alt="Images" />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="details__right">
            <div className="details__title">{data.title}</div>
            <div className="details__code">
              <span>Артикул</span> {data.code}
            </div>
            <div className="details__colors">
              {" "}
              Цвет
              {data.colors.map((color) => {
                return (
                  <div
                    key={color}
                    className="details__color"
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
            <div className="details__prices">
                        {data.isDiscount ? (
                          <>
                            <span className="details__price">
                              {data.price.price} р
                            </span>
                            <span className="details__old-price">
                              {data.price?.oldPrice} р
                            </span>
                          </>
                        ) : (
                          <span className="details__price">
                            {data.price.price} р
                          </span>
                        )}
                      </div>
            <div className="details__description">
              О товаре: <br />
              <span>{data.description}</span>
            </div>
            <div className="details__info">
              <div className="details__item">
                <span>Размерный ряд :</span> {data.sizes}
              </div>
              <div className="details__item">
                <span>Количество в линейке :</span> {data.countInBundle}
              </div>
              <div className="details__item">
                <span>Состав ткани :</span> {data.material}
              </div>
              <div className="details__item">
                <span>Материал :</span> {data.compound}
              </div>
            </div>
            <div className="details__buttons">
              <div className="details__button btn details__button_cart">
                <img src={cartImg} alt="Cart" /> <span>Добавить в корзину</span>
              </div>
              {!isFavorite ? (
                <div
                  onClick={() => favoriteHandler(data)}
                  className="details__button btn details__button_unfavorite favorite-btn"
                >
                  <img src={favorite} alt="favorite" />
                </div>
              ) : (
                <div
                  onClick={() => unFavoriteHandler(data)}
                  className="details__button btn details__button_favorite favorite-btn"
                >
                  <img src={favoriteActive} alt="Favorite" />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;
