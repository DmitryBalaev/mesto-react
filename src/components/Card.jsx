function Card({card, onCardClick}) {

  function handleClick() {
    onCardClick(card);
  } 

  return (
    <li className="cards__item">
      <button className="card__item-trash-btn"></button>
      <img src={card.link} alt={card.name} className="cards__item-img" onClick={handleClick} />
      <div className="cards__item-description">
        <h2 className="cards__item-title">{card.name}</h2>
        <div className="cards__item-like">
          <button type="button" className="cards__item-btn"></button>
          <span className="cards__item-like-count">{card.likes.length}</span>
        </div>
      </div>
    </li>
  )
}

export default Card