import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Card(card) {
  const user = useContext(CurrentUserContext);
  const isOwn = card.owner._id === user._id;
  const isLiked = card.likes.some((like) => like._id === user._id);
  const cardLikeButtonClassName = `elements__like-button ${isLiked && "elements__like-button_active"
    }`;

  function handleCardClick() {
    card.onCardClick(card);
  }

  function handleLikeClick() {
    card.onCardLike(card);
  }

  function handleCardDeleteClick() {
    card.onCardDelete(card);
  }

  return (
    <div className="elements__item">
      {isOwn && (
        <button
          type="button"
          className="elements__delete-button"
          onClick={handleCardDeleteClick}
        ></button>
      )}
      <img
        src={card.link}
        alt={card.name}
        className="elements__image"
        onClick={handleCardClick}
      />
      <div className="elements__caption">
        <h2 className="elements__title">{card.name}</h2>
        <div className="elements__like-group">
          <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick} />
          <div className={`elements__like-count ${card.likes.length > 0 && "elements__like-count_active"}`}>{card.likes.length}</div>
        </div>
      </div>
    </div>
  );
}

export default Card;