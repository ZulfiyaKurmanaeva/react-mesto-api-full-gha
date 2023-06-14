import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";

import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup.js";
import DeleteCardPopup from "./DeleteCardPopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import InfoTooltip from "./InfoTooltip.js";
import * as auth from "../utils/auth.js";
import ImagePopup from "./ImagePopup.js";
import Register from "./Register.js";
import api from "../utils/api.js";
import Header from "./Header.js";
import Footer from "./Footer.js";
import Login from "./Login.js";
import Main from "./Main.js";

import resolve from '../images/success.png';
import reject from '../images/failed.png';

/*constants*/

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [tooltipTitle, setTooltipTitle] = useState('');
  const [tooltipImage, setTooltipImage] = useState('');
  const [registered, setRegistered] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();

  const isPopupOpen =
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isEditAvatarPopupOpen ||
    isConfirmPopupOpen ||
    isImagePopupOpen ||
    isInfoTooltipOpen;

  /*handle userinfo*/
  useEffect(() => {
    if (loggedIn === true) {
      navigate("/");
    }
  }, [loggedIn, navigate]);

  useEffect(() => {
    if (loggedIn) {
      api.getUserInfo()
        .then((userInfo) => {
          setCurrentUser(userInfo);
        })
        .catch((err) => console.log(err));

      api.getInitialCards()
        .then((cardList) => {
          setCards(cardList);
        })
        .catch((err) => console.log(err));

    }
  }, [loggedIn]);

  function handleUpdateUser(newUserInfo) {
    setIsLoading(true);
    api.setUserInfo(newUserInfo)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function handleUpdateAvatar(newUserAvatar) {
    setIsLoading(true);
    api.setUserAvatar(newUserAvatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  /*handle tokencheck*/

  useEffect(() => {
    handleTokenCheck()
    return () => { }
  }, [])

  function handleTokenCheck() {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }

    auth
      .getContent(token)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          handleLogin(res.data.email);
          navigate("/");
        }
      })
      .catch((err) => console.log(err));

  }

  /*handle authorization*/

  function handleRegistration(password, email) {
    setIsLoading(true);
    auth
      .register(password, email)
      .then(() => {
        navigate("/sign-in");
        setRegistered(true);
        setTooltipImage(resolve);
        setTooltipTitle("Вы успешно зарегистрировались!");
      })
      .catch((err) => {
        setRegistered(false);
        setTooltipImage(reject);
        setTooltipTitle("Что-то пошло не так! Попробуйте ещё раз.");
      })
      .finally(() => {
        setIsLoading(false);
        handleTooltipOpen();
      });
  }

  function handleLogin(email) {
    setUserEmail(email);
    setLoggedIn(true);
  }

  function handleLoginSubmit(password, email) {
    setIsLoading(true);
    auth
      .authorize(password, email)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          handleLogin(email);
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
        handleTooltipOpen();
        setTooltipImage(reject);
        setTooltipTitle("Что-то пошло не так! Попробуйте ещё раз.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setLoggedIn(false);
    setUserEmail("");
  }

  function handleTooltipOpen() {
    setIsInfoTooltipOpen(true);
  }

  /*handle card close */

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsConfirmPopupOpen(false);
    setIsInfoTooltipOpen(false);
  }

  const handleEscClose = useCallback((evt) => {
    if (evt.key === 'Escape') {
      closeAllPopups();
    }
  }, []);

  useEffect(() => {
    if (isPopupOpen) {
      document.addEventListener('keydown', handleEscClose);
      return () => {
        document.removeEventListener('keydown', handleEscClose);
      }
    }
  }, [isPopupOpen, handleEscClose]);

  function closeOnOverlayClick(e) {
    if (e.target === e.currentTarget) {
      closeAllPopups();
    }
  }

  /*handle card click/like/delete*/

  function handleAddPlaceSubmit(newCard) {
    setIsLoading(true);
    api.createCard(newCard)
      .then((card) => {
        setCards([card, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleCardDeleteClick(card) {
    setIsConfirmPopupOpen(true);
    setSelectedCard(card);
  }

  function handleCardImageClick(card) {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((like) => like._id === currentUser._id);
    api.changeLikeCardStatus(card.id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card.id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    const isOwn = card.owner._id === currentUser._id;
    setIsLoading(true);

    if (isOwn) {
      api
        .deleteCard(card.id)
        .then(() => {
          setCards((state) => state.filter((item) => item._id !== card.id));
          closeAllPopups();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setIsLoading(false));
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Header
            userEmail={userEmail}
            isLoggedIn={loggedIn}
            onLogout={handleLogout}
          />

          <Routes>
            <Route
              path="/"
              element={
                loggedIn ? (
                  <Main
                    cards={cards}
                    onEditProfile={setIsEditProfilePopupOpen}
                    onAddPlace={setIsAddPlacePopupOpen}
                    onEditAvatar={setIsEditAvatarPopupOpen}
                    onCardClick={handleCardImageClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDeleteClick}
                  />
                ) : (
                  <Navigate to="/sign-in" replace />
                )
              }
            />

            <Route
              path="/sign-up"
              element={
                <Register
                  onSubmit={handleRegistration}
                  onTokenCheck={handleTokenCheck}
                  onLoading={isLoading}
                />
              }
            />
            <Route
              path="/sign-in"
              element={
                <Login
                  onSubmit={handleLoginSubmit}
                  onTokenCheck={handleTokenCheck}
                  onLoading={isLoading}
                />
              }
            />
            <Route path="*" element={<Navigate to={loggedIn ? "/" : "/sign-in"} />} />
          </Routes>

          {loggedIn && <Footer />}

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onOverlayClick={closeOnOverlayClick}
            onUpdateUser={handleUpdateUser}
            onLoading={isLoading}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onOverlayClick={closeOnOverlayClick}
            onUpdateAvatar={handleUpdateAvatar}
            onLoading={isLoading}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onOverlayClick={closeOnOverlayClick}
            onAddPlace={handleAddPlaceSubmit}
            onLoading={isLoading}
          />

          <ImagePopup
            card={selectedCard}
            isOpen={isImagePopupOpen}
            onClose={closeAllPopups}
            onOverlayClick={closeOnOverlayClick}
          />

          <DeleteCardPopup
            card={selectedCard}
            isOpen={isConfirmPopupOpen}
            onClose={closeAllPopups}
            onOverlayClick={closeOnOverlayClick}
            onCardDelete={handleCardDelete}
            onLoading={isLoading}
          />

          <InfoTooltip
            name="info-tooltip"
            isOpen={isInfoTooltipOpen}
            tooltipImage={tooltipImage}
            tooltipTitle={tooltipTitle}
            registered={registered}
            onClose={closeAllPopups}
            onOverlayClick={closeOnOverlayClick}
          />
        </div>
      </div>
    </CurrentUserContext.Provider >
  );
}

export default App;