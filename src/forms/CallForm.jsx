import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import { useDispatch } from "react-redux";
import { setModalAction, setSuccessAction } from "../store/reducers/modalSlice";
import closeBtn from "../assets/icons/close-btn.png";
import user from "../assets/icons/user-outlined.png";
import telephone from "../assets/icons/telephone.png";

export default function App() {
  const {
    register: registerCall,
    handleSubmit: handleSubmitCall,
    watch,
    formState: { errors: errorsCall, isValid },
  } = useForm({ mode: "onTouched" });

  const onSubmitCall = (data) => {
    dispatch(setModalAction());
    dispatch(setSuccessAction());
    console.log(data);
  };

  const dispatch = useDispatch();

  useEffect(()=> {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    }
  }, [])

  console.log(errorsCall);

  return (
    <form key={1} onSubmit={handleSubmitCall(onSubmitCall)} className="form" name="callForm">
      <div className="form__body">
        <div className="form__close" onClick={() => dispatch(setModalAction())}>
          {" "}
          <img src={closeBtn} alt="Close" />
        </div>

        <div className="form__title">Если у вас остались вопросы</div>
        <div className="form__subtitle">
          Оставьте заявку и мы обязательно Вам перезвоним
        </div>


        <div className="form__inputs">
          <div>
            {errorsCall.nameCall && <span>Введите Ваше имя</span>}
            <input
              placeholder="Как к Вам обращаться?"
              {...registerCall("nameCall", { required: true, minLength: 2 })}
            />
          </div>

          <div>
            {errorsCall.numberCall && <span>Введите Ваш номер</span>}
            <input
              placeholder="Номер телефона"
              {...registerCall("numberCall", {
                required: true,
                minLength: 6,
                pattern: /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/,
              })}
            />
          </div>
          <button
            className={isValid ? "form__submit" : "form__submit error"}
            type="submit"
          >
            Заказать звонок
          </button>
        </div>
      </div>
    </form>
  );
}
