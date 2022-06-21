import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setRegisterAction } from "../store/reducers/modalSlice";
import { setLoginAction } from "../store/reducers/modalSlice";
import closeBtn from "../assets/icons/close-btn.png";
import { useForm } from "react-hook-form";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { setUserAction } from "../store/reducers/userSlice";

const RegisterForm = () => {
  const {
    register: registerRegister,
    handleSubmit: handleSubmitRegister,
    formState: { errors: errorsRegister, isValid },
  } = useForm({ mode: "all" });

  const dispatch = useDispatch();
  const auth = getAuth();

  const onSubmitRegister = (data) => {
    createUserWithEmailAndPassword(
      auth,
      data.emailRegister,
      data.passwordRegister
    ).then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);

      dispatch(
        setUserAction({
          email: user.email,
          id: user.uid,
          token: user.accessToken,
        })
      );

      dispatch(setRegisterAction());
      console.log(data);
      // ...
    });
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const buttonHandler = () => {
    dispatch(setRegisterAction());
  };

  const loginHandler = () => {
    dispatch(setLoginAction());
    dispatch(setRegisterAction());
  };

  return (
    <div className="form">
      <div className="form__body success">
        <form
          key={4}
          onSubmit={handleSubmitRegister(onSubmitRegister)}
          className="form"
          name="loginForm"
        >
          <div className="form__body">
            <div
              className="form__close"
              onClick={() => dispatch(setRegisterAction())}
            >
              {" "}
              <img src={closeBtn} alt="Close" />
            </div>

            <div className="form__title" style={{ marginBottom: "20px" }}>
              Register
            </div>

            <div className="form__inputs">
              <div>
                {errorsRegister.emailRegister && <span>Enter your email</span>}
                <input
                  placeholder="email"
                  {...registerRegister("emailRegister", {
                    required: true,
                    pattern:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  })}
                />
              </div>

              <div>
                {errorsRegister.passwordRegister && (
                  <span>Enter your password</span>
                )}
                <input
                  placeholder="password"
                  type="password"
                  {...registerRegister("passwordRegister", {
                    required: true,
                    minLength: 6,
                  })}
                />
              </div>
              <button
                className={isValid ? "form__submit" : "form__submit error"}
                type="submit"
              >
                Register
              </button>
            </div>
            <div className="form__register" onClick={() => loginHandler()}>
              <div>Already have an acoount ?</div>
              <div className="form__link">Login now</div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
