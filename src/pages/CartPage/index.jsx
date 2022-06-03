import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart, removeFromCart } from "../../store/reducers/cartSlice";

const CartPage = () => {
  const dispatch = useDispatch();
  const cartGoods = useSelector((state) => state.cart);

  let navigate = useNavigate();

  const array = [];
  const cart = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : localStorage.setItem("cart", JSON.stringify(array));

  console.log(cart);

  // const addHandler = (e, item) => {
  //   e.stopPropagation();
  //   console.log("ZDAROVA");
  //   dispatch(addToCart(item));
  // };

  const deleteAllGoods = (item) => {
    // console.log(item)
    dispatch(removeFromCart(item))
  }

  const itemIncrement = (item) => {
    console.log('Increment');
  };

  const itemDecrement = (item) => {
    console.log('decrement');
  };

  // itemIncrement

  return (
    <div className="cart-wrapper">
      {!cart || cart.length < 1 ? (
        <>
          <div className="cart__title">Корзина</div>
          <div className="cart__text">У вас пока нет товаров в корзине</div>
        </>
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
                    <div className="goods__title cart__title">{item.title}</div>
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
                          <span className="goods__price">
                            {item.price.price} р
                          </span>
                          <span className="goods__old-price">
                            {item.price?.oldPrice} р
                          </span>
                        </>
                      ) : (
                        <span className="goods__price">
                          {item.price.price} р
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
                      <button onClick={() => deleteAllGoods(item)} className="cart__delete"></button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
