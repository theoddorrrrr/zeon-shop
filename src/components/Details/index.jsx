import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { instance } from "../../api/API";
import cartImg from "../../assets/icons/cart.png";

import favorite from "../../assets/icons/heart-good.png";
import favoriteActive from "../../assets/icons/heart-good-filled.png";

import {
  setFavorites,
  setUnFavorites,
} from "../../store/reducers/favoritesSlice";
import { addToCart } from "../../store/reducers/cartSlice";
import Interested from "../Interested";

const Details = () => {
  const [data, setData] = useState([]);
  const [similarGoods, setSimilarGoods] = useState([]);
  const [currentColor, setCurrentColor] = useState("#73A39D");

  let { collection, id } = useParams();
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const favorites = useSelector((state) => state.favorites);
  const isFavorite = favorites.some((i) => i.id == data.id);

  const getData = async (collection) => {
    const { data } = await instance.get(`${collection}/${id}`);
    setData(data);
  };

  const getSimilarGoods = async (collection) => {
    const { data } = await instance.get(`${collection}/?id_ne=${id}&_limit=5`);
    setSimilarGoods(data);
  };

  const cart = useSelector((state) => state.cart);

  // Favorite Functions
  const favoriteHandler = (item) => {
    dispatch(setFavorites(item));
  };

  const unFavoriteHandler = (item) => {
    dispatch(setUnFavorites(item));
  };

  // Get exact good
  useEffect(() => {
    getData(collection);
    getSimilarGoods(collection);
  }, []);

  // If id changed, reload page for search
  useEffect(() => {
    getData(collection);
    getSimilarGoods(collection);
  }, [id]);

  const cartHandler = (item, currentColor) => {
    const newItem = { ...item };
    newItem.selectedColor = currentColor;
    newItem.count = 1;

    dispatch(addToCart(newItem));
  };

  // Check if it exist in cart
  let isInCart =
    cart &&
    cart.some((i) => data.id == i.id && currentColor == i.selectedColor);

  // Set color for good
  const setColor = (color) => {
    setCurrentColor(color);
    isInCart = cart.some(
      (i) => data.id === i.id && currentColor == i.selectedColor
    );
  };

  // Favorites
  const array = [];
  const fav = localStorage.getItem("123")
    ? JSON.parse(localStorage.getItem("123"))
    : localStorage.setItem("123", JSON.stringify(array));

  return (
    <div>
      {!data.title ? (
        <div>Loading</div>
      ) : (
        <>
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
                <h3>Цвет</h3>
                {data.colors.map((color, index) => {
                  return (
                    <div
                      className="details__color details__color-item"
                      onClick={(color) => setColor(color.target.id)}
                      style={
                        color === "#FFFFFF"
                          ? {
                              backgroundColor: color,
                              border: "1px solid #D1D1D1",
                            }
                          : { backgroundColor: color }
                      }
                      key={index}
                    >
                      <input
                        type="radio"
                        id={color}
                        name="color"
                        defaultChecked={color == "#73A39D" && true}
                      />
                      <label htmlFor={color}></label>
                    </div>
                  );
                })}
              </div>
              <div className="details__prices">
                {data.isDiscount ? (
                  <>
                    <span className="details__price">{data.price.price} р</span>
                    <span className="details__old-price">
                      {data.price?.oldPrice} р
                    </span>
                  </>
                ) : (
                  <span className="details__price">{data.price.price} р</span>
                )}
              </div>
              <div className="details__description">
                <h3>О товаре:</h3>
                <span>{data.description}</span>
              </div>
              <div className="details__info">
                <div className="details__item">
                  <span>Размерный ряд :</span> {data.sizes}
                </div>
                <div className="details__item">
                  <span>Состав ткани :</span> {data.material}
                </div>
                <div className="details__item">
                  <span>Количество в линейке :</span> {data.countInBundle}
                </div>

                <div className="details__item">
                  <span>Материал :</span> {data.compound}
                </div>
              </div>
              <div className="details__buttons">
                {isInCart ? (
                  <div
                    onClick={() => navigate(`/cart`)}
                    className="details__button btn details__button_cart"
                  >
                    <span>Перейти в корзину</span>
                  </div>
                ) : (
                  <div
                    onClick={() => cartHandler(data, currentColor)}
                    className="details__button btn details__button_cart"
                  >
                    <img src={cartImg} alt="Cart" />{" "}
                    <span>Добавить в корзину</span>
                  </div>
                )}
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

          <div className="similar">
            <div className="favorites__title interested__title">
              Похожие товары
            </div>

            <div className="goods__items interested__goods similar__goods">
              {similarGoods?.map((item) => {
                const isFavorite = fav && fav.some((i) => i.id === item.id);

                return (
                  <Interested
                    item={item}
                    isFavorite={isFavorite}
                    key={item.id}
                  />
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Details;
