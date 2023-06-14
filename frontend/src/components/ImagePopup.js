function ImagePopup({ card, isOpen, onClose, onOverlayClick, }) {
    return (
        <div
            className={`popup ${isOpen && "popup_opened"}`}
            onClick={onOverlayClick}
        >
            <div className="popup_type_big-picture ">
                <figure className="popup__picture-container">
                    <button className="popup__close popup__close-button" type="button" onClick={() => { onClose(true); }} />
                    <img src={card.link} alt={card.name} className="popup__big-picture" />
                    <figcaption className="popup__picture-caption">{card.name}</figcaption>
                </figure>
            </div>
        </div>
    );
}

export default ImagePopup;