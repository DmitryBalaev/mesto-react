function ImagePopup() {
  return (
    <>
      <div className="popup popup-image full-screen">
        <div className="popup__overlay" />
        <div className="full-screen__container">
          <img src="#" alt="" className="full-screen__image" />
          <button type="button" className="popup__btn-close" />
          <p className="full-screen__descriptions" />
        </div>
      </div>
    </>
  )
}

export default ImagePopup;