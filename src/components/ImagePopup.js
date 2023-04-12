function ImagePopup(props) {
  return (
    <>
      <div className={`popup ${props.isOpen ? 'popup_opened' : ''} popup-image full-screen`}>
        <div className="popup__overlay" />
        <div className="full-screen__container">
          <img src={props.card.link} alt={props.card.name} className="full-screen__image" />
          <button type="button" className="popup__btn-close" onClick={props.onClose}/>
          <p className="full-screen__descriptions">{props.card.name}</p>
        </div>
      </div>
    </>
  )
}

export default ImagePopup;