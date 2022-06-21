import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  setLoginAction,
  setRegisterAction,
} from "../store/reducers/modalSlice";
import closeBtn from "../assets/icons/close-btn.png";
import { Controller, useForm } from "react-hook-form";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { setUserAction } from "../store/reducers/userSlice";

const LoginForm = () => {
  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    formState: { errors: errorsLogin, isValid },
    control,
  } = useForm({ mode: "onTouched" });

  const [error, setError] = useState();

  const dispatch = useDispatch();

  const auth = getAuth();

  const onSubmitLogin = (data) => {
    signInWithEmailAndPassword(auth, data.emailLogin, data.passwordLogin)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        dispatch(
          setUserAction({
            email: user.email,
            id: user.uid,
            token: user.accessToken,
          })
        );

        dispatch(setLoginAction());
        console.log(data);
      })
      .catch((error) => setError(error));
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const buttonHandler = () => {
    dispatch(setLoginAction());
  };

  const registerHandler = () => {
    dispatch(setLoginAction());
    dispatch(setRegisterAction());
  };

  return (
    <div className="form">
      <div className="form__body success">
        <form
          key={3}
          onSubmit={handleSubmitLogin(onSubmitLogin)}
          className="form"
          name="loginForm"
        >
          <div className="form__body">
            <div
              className="form__close"
              onClick={() => dispatch(setLoginAction())}
            >
              {" "}
              <img src={closeBtn} alt="Close" />
            </div>

            <div className="form__title" style={{ marginBottom: "20px" }}>
              Login
            </div>

            <div className="form__inputs">
              <div>
                {errorsLogin.emailLogin && <span>Enter your email</span>}
                <input
                  placeholder="email"
                  {...registerLogin("emailLogin", {
                    required: true,
                    pattern:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  })}
                />
              </div>

              <div>
                {errorsLogin.passwordLogin && <span>Enter your password</span>}
                <input
                  placeholder="password"
                  type="password"
                  {...registerLogin("passwordLogin", {
                    required: true,
                    minLength: 6,
                  })}
                />
              </div>

              {error && (
                <div style={{ color: "red", margin: "0 auto" }}>
                  Wrong email or password
                </div>
              )}

              <button
                className={isValid ? "form__submit" : "form__submit error"}
                type="submit"
              >
                Login
              </button>
            </div>
            <div className="form__register" onClick={() => registerHandler()}>
              <div>Dont have account ?</div>
              <div className="form__link">Register now</div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
