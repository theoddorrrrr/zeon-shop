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
import { setCartAction, setLoginAction } from "../../store/reducers/modalSlice";

import {
  setFavorites,
  setUnFavorites,
} from "../../store/reducers/favoritesSlice";

import favorite from "../../assets/icons/heart-good.png";
import favoriteActive from "../../assets/icons/heart-good-filled.png";
import Interested from "../../components/Interested";
import { useAuth } from "../../hooks/use-auth";

const CartPage = () => {
  const dispatch = useDispatch();
  const cartGoods = useSelector((state) => state.cart);
  const interestedGoods = useSelector((state) => state.mainInfo.interested);
  const [isShow, setIsShow] = useState(false);

  const { isAuth } = useAuth();

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

  const buttonHandler = () => {
    isAuth
      ? dispatch(
          setCartAction({
            totalGoods: totalGoods,
            totalLines: totalLines,
            totalPrice: totalPrice,
            discount: discount,
            price: price,
          })
        )
      : dispatch(setLoginAction());
  };

  return (
    <div className="cart-wrapper">
      {!cart || cart.length < 1 ? (
        <div className="cart__empty">
          <div className="cart__title">??????????????</div>
          <div className="cart__text">?? ?????? ???????? ?????? ?????????????? ?? ??????????????</div>

          <div className="cart__title interested__title">
            ???????????????? ?????? ????????????????????????
          </div>

          <div className="goods__items interested__goods">
            {interestedGoods.map((item) => {
              const isFavorite = fav && fav.some((i) => i.id === item.id);

              return (
                <Interested item={item} isFavorite={isFavorite} key={item.id} />
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
                  <div className="goods__body cart__body">
                    <div className="goods__title cart-title">{item.title}</div>
                    <div className="goods__sizes cart__sizes">
                      <span>????????????: </span> {item.sizes}
                    </div>
                    <div className="cart__color">
                      <span>????????:</span>
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
                            {item.price.price.toLocaleString()} ??
                          </span>
                          <span className="goods__old-price">
                            {item.price?.oldPrice.toLocaleString()} ??
                          </span>
                        </>
                      ) : (
                        <span className="goods__price cart__price">
                          {item.price.price.toLocaleString()} ??
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
                      <div className="cart__counts">{item.count}</div>
                      <button
                        onClick={() => itemIncrement(item)}
                        className="cart__button cart__increment"
                      >
                        +
                      </button>
                    </div>
                  </div>
                    <button
                      onClick={() => removeHandler(item)}
                      className="cart__delete"
                    ></button>
                </div>
              );
            })}
          </div>
          <div className="cart__details">
            {!isShow && (
              <div className="cart__details-price">
                <h2>?????????? ????????????</h2>
                <div className="cart__details-item cart__desktop">
                  <h3>???????????????????? ????????????: </h3>
                  <span>{totalLines} ????</span>
                </div>
                <div className="cart__details-item cart__desktop">
                  <h3>???????????????????? ??????????????: </h3>
                  <span>{totalGoods} ????</span>
                </div>
                <div className="cart__details-item cart__mobile">
                  <h3>?????????? ????????????????????: </h3>
                  <div>
                    <span>{totalLines} ???????????? </span>
                    <span>({totalGoods} ????.)</span>
                  </div>
                </div>
                <div className="cart__details-item">
                  <h3>?????????? ????????: </h3>
                  <span>{totalPrice.toLocaleString()} ????????????</span>
                </div>
                <div className="cart__details-item">
                  <h3>????????????: </h3>
                  <span>{discount.toLocaleString()} ????????????</span>
                </div>
                <hr />
              </div>
            )}
            <div className="cart__details-conclusion">
              <h3>?????????? ?? ????????????</h3>
              <span>{price.toLocaleString()} ????????????</span>
            </div>
            {isShow ? (
              <button
                className="btn button cart__details-show"
                onClick={() => setIsShow(false)}
              >
                ???????????????????? ?? ????????????
              </button>
            ) : (
              <button
                className="btn button cart__details-show"
                onClick={() => setIsShow(true)}
              >
                ????????????
              </button>
            )}

            <button
              className="btn button cart__details-button"
              onClick={buttonHandler}
            >
              ???????????????? ??????????
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
