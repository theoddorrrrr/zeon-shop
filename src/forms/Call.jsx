import React from "react";
import { useForm } from "react-hook-form";

import { useDispatch } from "react-redux";
import { setModalAction } from "../store/reducers/modalSlice";
import closeBtn from "../assets/icons/close-btn.png";
import user from "../assets/icons/user-outlined.png";
import telephone from "../assets/icons/telephone.png";

export default function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  console.log(watch("example"));

  const dispatch = useDispatch();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
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
            {errors.example && <span>Заполните ваше имя</span>}
            <input
              placeholder="Как к Вам обращаться?"
              {...register("example", { required: true })}
            />
          </div>

          <div>
            {errors.exampleRequired && <span>Заполните ваш номер</span>}
            <input
              placeholder="Номер телефона"
              {...register("exampleRequired", { required: true })}
            />
          </div>

          <button className="form__submit" type="submit">
            Заказать звонок
          </button>
        </div>
      </div>
    </form>
  );
}
