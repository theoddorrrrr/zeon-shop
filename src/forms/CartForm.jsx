import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCartAction,
  setModalAction,
  setSuccessAction,
} from "../store/reducers/modalSlice";
import { useForm, Controller } from "react-hook-form";
import closeBtn from "../assets/icons/close-btn.png";
import { Link, useLocation, useNavigate } from "react-router-dom";

import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import { postCart } from "../api/API";
import { resetCart } from "../store/reducers/cartSlice";

const CartForm = () => {
  const {
    register: registerCart,
    handleSubmit: handleSubmitCart,
    formState: { errors: errorsCart, isValid },
  } = useForm({ mode: "all" });

  const {cart} = useSelector(state => state)
  const navigate = useNavigate()

  const onSubmitCart = (data) => {
    dispatch(setCartAction());
    dispatch(setSuccessAction());

    data = {...data, goods: cart, id: Date.now()}
    postCart(data)
    console.log(data);

    dispatch(resetCart())
    navigate('/')
    
  };

  const dispatch = useDispatch();

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <form
      key={2}
      className="form"
      onSubmit={handleSubmitCart(onSubmitCart)}
      name="cartForm"
    >
      <div className="form__body cart">
        <div className="form__close" onClick={() => dispatch(setCartAction())}>
          <img src={closeBtn} alt="Close" />
        </div>
        <div className="form__title">Оформление заказа</div>

        <div className="form__inputs">
          <div>
            <span>Ваше имя</span>
            {/* {errorsCart.name && <span>Введите Ваше имя</span>} */}
            <input
              placeholder="Например Иван"
              {...registerCart("name", { required: true, minLength: 2 })}
            />
          </div>

          <div>
            <span>Ваше фамилия</span>
            {/* {errorsCart.number && <span>Введите Ваш номер</span>} */}
            <input
              placeholder="Например Иван"
              {...registerCart("surname", {
                required: true,
                minLength: 2,
              })}
            />
          </div>

          <div>
            <span>Электронная почта</span>
            {/* {errorsCart.number && <span>Введите Ваш номер</span>} */}
            <input
              placeholder="example@mail.com"
              {...registerCart("mail", {
                required: true,
                pattern:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              })}
            />
          </div>

          <div>
            <span>Ваш номер телефона</span>
            {errorsCart.number && <span>Введите Ваш номер</span>}

            <PhoneInput
              defaultCountry="KG"
              placeholder="Введите номер телефона"
              international
              id="number"

              {...registerCart("number", {
                required: true,
                minLength: 6,
              })}
            />
          </div>

          <div>
            <span>Страна</span>
            {/* {errorsCart.number && <span>Введите Ваш номер</span>} */}
            <input
              placeholder="Введите страну"
              {...registerCart("country", {
                required: true,
                minLength: 2,
              })}
            />
          </div>

          <div>
            <span>Город</span>
            {/* {errorsCart.number && <span>Введите Ваш номер</span>} */}
            <input
              placeholder="Введите город"
              {...registerCart("city", {
                required: true,
                minLength: 2,
              })}
            />
          </div>

          <label>
            <input
              type="checkbox"
              {...registerCart("checkbox", { required: true })}
            />
            <span>
              Согласен с условиями{" "}
              <Link to="public-offer" target="_blank" rel="noopener noreferrer">
                публичной оферты
              </Link>
            </span>
          </label>

          <button
            className={isValid ? "form__submit" : "form__submit error"}
            type="submit"
          >
            Продолжить покупки
          </button>
        </div>
      </div>
    </form>
  );
};

export default CartForm;
