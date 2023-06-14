import { useContext, useEffect } from "react";

import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import useFormValidation from "../utils/useFormValidation.js";

function EditProfilePopup({ isOpen, onClose, onLoading, onOverlayClick, onUpdateUser }) {
    const { values, errors, isValid, formRef, handleChange, setValue, reset } =
        useFormValidation();
    const currentUser = useContext(CurrentUserContext);

    useEffect(() => {
        setValue("name", currentUser.name);
        setValue("about", currentUser.about);
    }, [currentUser, isOpen, setValue]);

    function handleSubmit(evt) {
        evt.preventDefault();

        if (isValid) {
            onUpdateUser({
                name: values["name"],
                about: values["about"],
            });
        }
    }

    const onClosePopup = () => {
        onClose();
        reset({ name: currentUser.name, about: currentUser.about });
    };

    return (
        <PopupWithForm
            title="Редактировать профиль"
            isOpen={isOpen}
            onLoading={onLoading}
            isValid={isValid}
            onClose={onClosePopup}
            onOverlayClick={onOverlayClick}
            onSubmit={handleSubmit}
            ref={formRef}
        >
            <input
                name="name"
                value={values["name"] ?? ""}
                onChange={handleChange}
                type="text"
                placeholder="Напишите Ваше имя"
                minLength="2"
                maxLength="40"
                required
                id="username"
                className="popup__input popup__input_type_name"
            />
            <span className="profile-name-error popup__input-error">{errors.name}</span>
            <input
                name="about"
                value={values["about"] ?? ""}
                onChange={handleChange}
                type="text"
                placeholder="Расскажите немного о себе"
                minLength="2"
                maxLength="200"
                required
                id="about"
                className="popup__input popup__input_type_about"
            />
            <span className="profile-about-error popup__input-error">{errors.about}</span>
        </PopupWithForm>
    );
}

export default EditProfilePopup;
