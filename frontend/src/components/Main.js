import { useContext } from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Main({ cards, onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete }) {
    const user = useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar">
                    <div className="profile__image-container">
                        <button className="profile__avatar-button" onClick={() => { onEditAvatar(true) }}>
                            <img src={user.avatar} alt='Avatar' className="profile__image" />
                        </button>
                    </div>

                    <div className="profile__info">
                        <h1 className="profile__name">{user.name}</h1>
                        <button
                            type="button"
                            className="profile__edit-button"
                            onClick={() => {
                                onEditProfile(true);
                            }}
                        ></button>
                        <p className="profile__about">{user.about}</p>
                    </div>
                </div>
                <button
                    type="button"
                    className="profile__add-button"
                    onClick={() => {
                        onAddPlace(true);
                    }}
                />
            </section>

            <section className="elements">

                {cards.map((card) => (
                    <Card
                        card={card}
                        name={card.name}
                        link={card.link}
                        likes={card.likes}
                        key={card._id}
                        id={card._id}
                        owner={card.owner}
                        onCardClick={onCardClick}
                        onCardLike={onCardLike}
                        onCardDelete={onCardDelete}
                    />
                ))}

            </section>
        </main>
    );
}

export default Main;