import React from 'react'

function PopupWithForm(props) {
  
  const className = `popup popup-${props.name} ${props.isOpen ? 'popup_opened' : ''}`

  return (
    <>
    <div className={className}>
      <div className="popup__overlay" />
      <div className="popup__container">
        <h2 className="popup__title">{props.title}</h2>
        <form
          className={`popup__form popup__form_${props.name}`}
          name={props.name}
          noValidate=""
        >
          {props.children}
          <button className="popup__btn-submit" type="submit">
            {props.btnText}
          </button>
        </form>
        <button 
          className="popup__btn-close" 
          type="button"
          onClick={props.onClose}
        />
      </div>
    </div>
    </>
  )
}

export default PopupWithForm;