import PopupWithForm from "./PopupWithForm.js";

function DeleteCardPopup({ card, isOpen, onClose, onLoading, onOverlayClick, onCardDelete }) {
    function handleSubmit(evt) {
        evt.preventDefault();
        onCardDelete(card);
    }

    return (
        <PopupWithForm
            title="Вы уверены?"
            buttonText="Да"
            onLoading={onLoading}
            buttonTextOnLoading="Удаление"
            onSubmit={handleSubmit}
            isValid="true"
            isOpen={isOpen}
            onClose={onClose}
            onOverlayClick={onOverlayClick}
        />
    );
}

export default DeleteCardPopup;