import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCartAction,
  setModalAction,
  setSuccessAction,
} from "../store/reducers/modalSlice";
import { useForm, Controller } from "react-hook-form";
import closeBtn from "../assets/icons/close-btn.png";
import { Link, useNavigate } from "react-router-dom";

import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import { postCart } from "../api/API";
import { resetCart } from "../store/reducers/cartSlice";
import { useAuth } from "../hooks/use-auth";

const CartForm = () => {
  const {
    register: registerCart,
    handleSubmit: handleSubmitCart,
    formState: { errors: errorsCart, isValid },
    control,
  } = useForm({ mode: "onTouched" });

  const { cart } = useSelector((state) => state);
  const navigate = useNavigate();

  const cartDetails = useSelector((state) => state.modal.cart);
  const { email, id } = useAuth();

  const userState = useSelector(state => state.userState)
  console.log(userState);

  const onSubmitCart = (data) => {
    dispatch(setCartAction());
    dispatch(setSuccessAction());

    data = {
      goods: cart,
      cartDetails: cartDetails,
      formDetails: data,
    };

    console.log({...userState, orders: [...userState.orders, data]});

    postCart({...userState, orders: [...userState.orders, data]}, id);

    dispatch(resetCart());
    navigate("/");
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
            <span style={errorsCart.name && { color: "red" }}>Ваше имя</span>
            {/* {errorsCart.name && <span>Введите Ваше имя</span>} */}
            <input
              placeholder="Например Иван"
              style={
                errorsCart.name && {
                  border: "1px solid red",
                  borderRadius: "5px",
                }
              }
              {...registerCart("name", { required: true, minLength: 2 })}
            />
          </div>
          <div>
            <span style={errorsCart.surname && { color: "red" }}>
              Ваше фамилия
            </span>
            {/* {errorsCart.number && <span>Введите Ваш номер</span>} */}
            <input
              placeholder="Например Иван"
              style={
                errorsCart.surname && {
                  border: "1px solid red",
                  borderRadius: "5px",
                }
              }
              {...registerCart("surname", {
                required: true,
                minLength: 2,
              })}
            />
          </div>
          <div>
            <span style={errorsCart.mail && { color: "red" }}>
              Электронная почта
            </span>
            {/* {errorsCart.number && <span>Введите Ваш номер</span>} */}
            <input
              placeholder="example@mail.com"
              style={
                errorsCart.mail && {
                  border: "1px solid red",
                  borderRadius: "5px",
                }
              }
              {...registerCart("mail", {
                required: true,
                pattern:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              })}
            />
          </div>
          <div>
            <span style={errorsCart["phone-input"] && { color: "red" }}>
              Ваш номер телефона
            </span>

            <Controller
              control={control}
              {...registerCart("phone-input", {
                required: true,
                minLength: 6,
              })}
              rules={{
                validate: (value) => isValidPhoneNumber(value),
              }}
              render={({ field: { onChange, value } }) => (
                <PhoneInput
                  value={value}
                  international
                  onChange={onChange}
                  placeholder="Введите номер телефона"
                  defaultCountry="KG"
                  id="phone-input"
                  style={
                    errorsCart["phone-input"] && {
                      border: "1px solid red",
                      borderRadius: "5px",
                    }
                  }
                />
              )}
            />
          </div>
          <div>
            <span style={errorsCart.country && { color: "red" }}>Страна</span>
            {/* {errorsCart.number && <span>Введите Ваш номер</span>} */}
            <input
              placeholder="Введите страну"
              style={
                errorsCart.country && {
                  border: "1px solid red",
                  borderRadius: "5px",
                }
              }
              {...registerCart("country", {
                required: true,
                minLength: 2,
              })}
            />
          </div>
          <div>
            <span style={errorsCart.city && { color: "red" }}>Город</span>
            {/* {errorsCart.number && <span>Введите Ваш номер</span>} */}
            <input
              placeholder="Введите город"
              style={
                errorsCart.city && {
                  border: "1px solid red",
                  borderRadius: "5px",
                }
              }
              {...registerCart("city", {
                required: true,
                minLength: 2,
              })}
            />
          </div>
          <label>
            <input
              type="checkbox"
              style={errorsCart.checkbox && { boxShadow: "0 0 5px 1px red" }}
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
            Оформление заказа
          </button>
        </div>
      </div>
    </form>
  );
};

export default CartForm;
