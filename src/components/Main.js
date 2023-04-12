import React from 'react'
import defaultUserImage from '../images/Custo.jpg'


function Main(props) {
  return (
    <main className="main">
      <section className="profile">
        <div className="profile__content">
          <div className="profile__user">
            <div className="profile__avatar-container">
              <img
                src={defaultUserImage}
                alt="Аватар пользователя"
                className="profile__avatar"
                onClick={props.onEditAvatar}
              />
            </div>
            <div className="profile__info">
              <h1 className="profile__user-name">Жак-Ив Кусто</h1>
              <button 
                type="button" 
                className="profile__edit-btn"
                onClick={props.onEditProfile}
              />
              <p className="profile__profession">Исследователь океана</p>
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
        <ul className="cards__list"></ul>
      </section>
    </main>
  )
}

export default Main