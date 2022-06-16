import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addToCart,
  decrementCart,
  incrementCart,
  removeFromCart,
} from "../../store/reducers/cartSlice";
import { setCartAction } from "../../store/reducers/modalSlice";

import {
  setFavorites,
  setUnFavorites,
} from "../../store/reducers/favoritesSlice";

import favorite from "../../assets/icons/heart-good.png";
import favoriteActive from "../../assets/icons/heart-good-filled.png";

const CartPage = () => {
  const dispatch = useDispatch();
  const cartGoods = useSelector((state) => state.cart);
  const [isShow, setIsShow] = useState(false);
  const interestedGoods = useSelector((state) => state.mainInfo.interested);
  let navigate = useNavigate();

  const ref=useRef();

  const array = [];

   // Takes goods from local storage
   const fav = localStorage.getItem("123")
   ? JSON.parse(localStorage.getItem("123"))
   : localStorage.setItem("123", []);

 const favorites = useSelector((state) => state.favorites);
  const cart = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : localStorage.setItem("cart", JSON.stringify(array));

  const removeHandler = (item) => {
    dispatch(removeFromCart(item));
  };

  const itemIncrement = (item) => {
    dispatch(incrementCart(item));
  };

  const itemDecrement = (item) => {
    dispatch(decrementCart(item));
  };

  const totalGoods = cart.reduce((prev, curr) => {
    return prev + curr?.count * curr?.countInBundle;
  }, 0);

  const totalLines = cart.reduce((prev, curr) => {
    return prev + curr?.count;
  }, 0);

  const totalPrice = cart.reduce((prev, curr) => {
    return (
      prev +
      (curr?.price?.oldPrice
        ? curr?.price?.oldPrice * curr?.count
        : curr?.price?.price * curr?.count)
    );
  }, 0);

  const discount = cart.reduce((prev, curr) => {
    return (
      prev +
      (curr?.price?.discount
        ? (curr.price.oldPrice - curr.price.price) * curr?.count
        : 0)
    );
  }, 0);

  const price = totalPrice - discount;

   // Favorite Functions
   const favoriteHandler = (e, item) => {
    e.stopPropagation();
    dispatch(setFavorites(item));
  };

  const unFavoriteHandler = (e, item) => {
    e.stopPropagation();
    dispatch(setUnFavorites(item));
  };

  const mouseHandler = (e) => {
    // console.log(e);
  };

  const mouseMoveHandler = (e) => {
    // console.log(ref.current);

    // console.log(e);
  };
  // console.log(hover);

  return (
    <div className="cart-wrapper">
      {!cart || cart.length < 1 ? (
        <div>
          <div className="cart__title">Корзина</div>
          <div className="cart__text">У вас пока нет товаров в корзине</div>

          <div className="cart__title interested__title">Возможно Вас заинтересует</div>

          <div className="goods__items interested__goods">
              {interestedGoods.map((item) => {
                const isFavorite = fav && fav.some((i) => i.id === item.id);

                return (
                  <div
                    className="goods__item"
                    onClick={() => navigate(`/collections/hot/${item.id}`)}
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

                      <img
                        // onMouseOver={(e)=> mouseHandler(e)}
                        onMouseMove={(e) => mouseMoveHandler(e)}
                        className="goods__img"
                        src={item.src[0]}
                        alt={item.title}
                      />

                      <div ref={ref} className="hover"></div>
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
              })}
            </div>
        </div>
      ) : (
        <>
          <div className="goods__items cart__items">
            {cart.map((item) => {
              return (
                <div
                  key={item.id + item.selectedColor}
                  className="goods__item cart__item"
                >
                  <div className="cart__img">
                    <img src={item.src[0]} alt={item.title} />
                  </div>
                  <div className="goods__body">
                    <div className="goods__title cart-title">{item.title}</div>
                    <div className="goods__sizes cart__sizes">
                      <span>Размер: </span> {item.sizes}
                    </div>
                    <div className="cart__color">
                      <span>Цвет:</span>
                      <div
                        className="goods__color"
                        style={
                          item.selectedColor === "#FFFFFF"
                            ? {
                                backgroundColor: item.selectedColor,
                                border: "1px solid #D1D1D1",
                              }
                            : { backgroundColor: item.selectedColor }
                        }
                      ></div>
                    </div>
                    <div className="goods__prices">
                      {item.isDiscount ? (
                        <>
                          <span className="goods__price cart__price">
                            {item.price.price.toLocaleString()} р
                          </span>
                          <span className="goods__old-price">
                            {item.price?.oldPrice.toLocaleString()} р
                          </span>
                        </>
                      ) : (
                        <span className="goods__price cart__price">
                          {item.price.price.toLocaleString()} р
                        </span>
                      )}
                    </div>
                    <div className="cart__counter">
                      <button
                        onClick={() => itemDecrement(item)}
                        className="cart__button cart__decrement"
                      >
                        <span>_</span>
                      </button>
                      <div className="cart__count">{item.count}</div>
                      <button
                        onClick={() => itemIncrement(item)}
                        className="cart__button cart__increment"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeHandler(item)}
                        className="cart__delete"
                      ></button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="cart__details">
            {!isShow && (
              <div className="cart__details-price">
                <h2>Сумма заказа</h2>
                <div className="cart__details-item">
                  <h3>Количество линеек: </h3>
                  <span>{totalLines} шт</span>
                </div>
                <div className="cart__details-item">
                  <h3>Количество товаров: </h3>
                  <span>{totalGoods} шт</span>
                </div>
                <div className="cart__details-item">
                  <h3>Общая цена: </h3>
                  <span>{totalPrice.toLocaleString()} рублей</span>
                </div>
                <div className="cart__details-item">
                  <h3>Скидка: </h3>
                  <span>{discount.toLocaleString()} рублей</span>
                </div>
                <hr />
              </div>
            )}
            <div className="cart__details-conclusion">
              <h3>Итого к оплате</h3>
              <span>{price.toLocaleString()} рублей</span>
            </div>
            {isShow ? (
              <button
                className="btn button cart__details-show"
                onClick={() => setIsShow(false)}
              >
                Информация о заказе
              </button>
            ) : (
              <button
                className="btn button cart__details-show"
                onClick={() => setIsShow(true)}
              >
                Скрыть
              </button>
            )}

            <button
              className="btn button cart__details-button"
              onClick={() => dispatch(setCartAction())}
            >
              Оформить заказ
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
