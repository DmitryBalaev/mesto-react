import React from 'react'
import api from '../utils/Api'
import Card from './Card'

function Main(props) {

  const [userName, setUserName] = React.useState('')
  const [userDescription, setUserDescription] = React.useState('')
  const [userAvatar, setUserAvatar] = React.useState('')
  const [cards, setCards] = React.useState([])

  React.useEffect(() => {
    api.getUserInfo()
      .then((res) => {
        setUserName(res.name)
        setUserDescription(res.about)
        setUserAvatar(res.avatar)
      })
      .catch(err => console.log(err)) 
  }, [])

  React.useEffect(() => {
    api.getInitialCards()
      .then((res) => {
        setCards(res)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__content">
          <div className="profile__user">
            <div className="profile__avatar-container">
              <img
                src={userAvatar}
                alt="Аватар пользователя"
                className="profile__avatar"
                onClick={props.onEditAvatar}
              />
            </div>
            <div className="profile__info">
              <h1 className="profile__user-name">{userName}</h1>
              <button 
                type="button" 
                className="profile__edit-btn"
                onClick={props.onEditProfile}
              />
              <p className="profile__profession">{userDescription}</p>
            </div>
          </div>
          <button 
            type="button" 
            className="profile__add-btn"
            onClick={props.onAddPlace}
          />
        </div>
      </section>
      <section className="cards">
        <ul className="cards__list">
          {
            cards.map((card) => (
              <Card card={card} key={card._id } onCardClick={props.onCardClick}/>
            ))
          }
        </ul>
      </section>
    </main>
  )
}

export default Main