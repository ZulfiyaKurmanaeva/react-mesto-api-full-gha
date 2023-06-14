import { useEffect } from "react";
import useFormValidation from "../utils/useFormValidation";
import AuthForm from "./AuthForm";

function Register({ onSubmit, onLoading }) {
    const { values, errors, isValid, formRef, handleChange, setValue } =
        useFormValidation();

    useEffect(() => {
        setValue("email", "");
        setValue("password", "");
    }, [setValue]);

    function handleSubmit(evt) {
        evt.preventDefault();
        if (isValid) {
            const { password, email } = values;
            onSubmit(password, email);
        }
    }

    return (
        <AuthForm
            title="Регистрация"
            buttonText="Зарегистрироваться"
            buttonTextOnLoading="Реристрируюсь"
            handleSubmit={handleSubmit}
            onLoading={onLoading}
            isValid={isValid}
            ref={formRef}
        >
            <input
                type="email"
                minLength="2"
                maxLength="30"
                placeholder="Email"
                className="auth-form__input"
                onChange={handleChange}
                name="email"
                value={values["email"] ?? ""}
                required
            />
            <span className="auth-form__input-error">{errors.email}</span>
            <input
                type="password"
                minLength="5"
                maxLength="30"
                placeholder="Пароль"
                className="auth-form__input"
                onChange={handleChange}
                name="password"
                value={values["password"] ?? ""}
                required
            />
            <span className="auth-form__input-error">{errors.password}</span>
        </AuthForm>
    );
}

export default Register;