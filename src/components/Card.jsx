function Card(props) {

  function handleClick() {
    props.onCardClick(props.card);
  } 

  return (
    <li className="cards__item">
      <button className="card__item-trash-btn"></button>
      <img src={props.card.link} alt={props.card.name} className="cards__item-img" onClick={handleClick} />
      <div className="cards__item-description">
        <h2 className="cards__item-title">{props.card.name}</h2>
        <div className="cards__item-like">
          <button type="button" className="cards__item-btn"></button>
          <span className="cards__item-like-count">{props.card.likes.length}</span>
        </div>
      </div>
    </li>
  )
}

export default Card