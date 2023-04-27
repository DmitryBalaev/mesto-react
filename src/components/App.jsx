import React from 'react'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import PopupWithForm from './PopupWithForm'
import ImagePopup from './ImagePopup'
import { api } from '../utils/api'
import { CurrentUserContext } from '../context/CurrentUserContext'

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false)
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false)
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false)
  const [isConfirmPopupOpen, setConfirmPopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState({})
  const [currentUser, setCurrentUser] = React.useState({})
  const [cards, setCards] = React.useState([])

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([user, cards]) => {
        setCurrentUser(user)
        setCards(cards)
      })
      .catch(err => console.log(err))
  }, [])

  function handleImageClick(card) {
    setSelectedCard(card)
    setImagePopupOpen(true)
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true)
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true)
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false)
    setAddPlacePopupOpen(false)
    setEditAvatarPopupOpen(false)
    setImagePopupOpen(false)
    setTimeout(() => {
      setSelectedCard({})
    }, 500)
  }

  function handleTrashIconClick (card) {
    setConfirmPopupOpen(true)
    console.log(isConfirmPopupOpen)
    setSelectedCard(card)
  }

  function handleCardLike (card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id)

    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log(err))
  }

  function handleDeleteClick (card) {
    api.deleteCard(selectedCard._id)
    .then(() => {
      console.log(selectedCard)
      setTimeout(() => {
        setCards(cards.filter((item) => item._id !== selectedCard._id))
      }, 500)
    })
    .catch(err => console.log(err))
    setSelectedCard(card)
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Header />
        <Main
          onCardDelete={handleTrashIconClick}
          onCardLike={handleCardLike}
          onEditAvatar={handleEditAvatarClick}
          onAddPlace={handleAddPlaceClick}
          onEditProfile={handleEditProfileClick}
          onImageClick={handleImageClick}
          onTrashIconClick={handleTrashIconClick}
          cards={cards}
        />
        <Footer />
        <PopupWithForm
          name="edit"
          title="Редактировать профиль"
          btnText="Сохранить"
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        >
          <input
            className="popup__input popup__input_user_name"
            name="name"
            type="text"
            defaultValue=""
            placeholder="Имя"
            minLength={2}
            maxLength={40}
            required=""
            id="name-input"
          />
          <span className="popup__input-error" id="name-input-error" />
          <input
            className="popup__input popup__input_user_profession"
            name="about"
            type="text"
            defaultValue=""
            placeholder="Вид деятельности"
            required=""
            minLength={2}
            maxLength={200}
            id="profession-input"
          />
          <span className="popup__input-error" id="profession-input-error" />
        </PopupWithForm>
        <PopupWithForm
          name="add"
          title="Новое место"
          btnText="Создать"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        >
          <input
            className="popup__input popup__input_new-card_name"
            name="name"
            type="text"
            defaultValue=""
            placeholder="Название"
            required=""
            minLength={2}
            maxLength={30}
            id="card-name-input"
          />
          <span className="popup__input-error" id="card-name-input-error" />
          <input
            className="popup__input popup__input_new-card_link"
            name="link"
            defaultValue=""
            placeholder="Ссылка на картинку"
            required=""
            type="url"
            id="card-link-input"
          />
          <span className="popup__input-error" id="card-link-input-error" />
        </PopupWithForm>
        <PopupWithForm
          name="update"
          title="Обновить аватар"
          btnText="Сохранить"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        >
          <input
            className="popup__input popup__input_update-user-img_link"
            name="avatar"
            defaultValue=""
            placeholder="Ссылка на аватар"
            required=""
            type="url"
            id="user-img-link-input"
          />
          <span className="popup__input-error" id="user-img-link-input-error" />
        </PopupWithForm>
        <PopupWithForm
          isOpen={isConfirmPopupOpen}
          name="confirm"
          title="Вы уверены?"
          btnText="Да"
        />
        <ImagePopup
          onConfirm={handleDeleteClick}
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
