import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import SuccessImg from "../assets/icons/check1.png"
import { setSuccessAction } from '../store/reducers/modalSlice';

const Success = () => {
  const dispatch = useDispatch();

  useEffect(()=> {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    }
  }, [])

  return (
    <div className="form">
      <div className="form__body success">
          <img src={SuccessImg} alt="Close" />

        <div className="form__title">Спасибо!</div>
        <div className="form__subtitle">
        Ваша заявка была принята ожидайте, скоро Вам перезвонят
        </div>

          <button className="form__submit"  onClick={() => dispatch(setSuccessAction())}>
            Продолжить покупки
          </button>
      </div>
    </div>
  )
}

export default Success