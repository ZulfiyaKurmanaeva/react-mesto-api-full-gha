import { useEffect } from "react";

import useFormValidation from "../utils/useFormValidation";
import AuthForm from "./AuthForm";

function Login({ onSubmit, onLoading }) {
    const { values, errors, isValid, handleChange, setValue, formRef } =
        useFormValidation();

    useEffect(() => {
        setValue("email", "");
        setValue("password", "");
    }, [setValue]);

    function handleSubmit(evt) {
        evt.preventDefault();

        if (isValid) {
            const { password, email } = values;

            if (!password || !email) {
                return;
            }

            onSubmit(password, email);
        }
    }

    return (
        <AuthForm
            title="Вход"
            name="login"
            buttonText="Войти"
            buttonTextOnLoading="Вхожу"
            handleSubmit={handleSubmit}
            onLoading={onLoading}
            isValid={isValid}
            ref={formRef}
        >
            <input
                type="email"
                minLength="2"
                maxLength="30"
                required
                placeholder="Email"
                className="auth-form__input"
                onChange={handleChange}
                name="email"
                value={values["email"] ?? ""}
            />
            <span className="auth-form__input-error">{errors.email}</span>
            <input
                type="password"
                minLength="5"
                maxLength="30"
                required
                placeholder="Пароль"
                className="auth-form__input"
                onChange={handleChange}
                name="password"
                value={values["password"] ?? ""}
            />
            <span className="auth-form__input-error">{errors.password}</span>
        </AuthForm>
    );
}

export default Login;