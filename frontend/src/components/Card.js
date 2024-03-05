import { React, useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const handleClick = () => {
    onCardClick(card);
  };

  const handleLikeClick = () => {
    onCardLike(card);
  };
  const handleDeleteClick = () => {
    onCardDelete(card);
  };
  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser?._id;
  const cardDeleteButtonClassName = `trash-button ${
    isOwn ? 'trash-button_visible' : 'trash-button_hidden'
  }`;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  const cardLikeButtonClassName = `like-button  ${
    isLiked ? 'like-button_active' : ''
  }`;

  return (
    <div className='place-card'>
      <img
        className='place-card__photo'
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />

      <button
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
      ></button>

      <div className='place-card__info-container'>
        <h3 className='place-card__name'>{card.name} </h3>

        <button className={cardLikeButtonClassName} onClick={handleLikeClick}>
          <span className='like-button-counter'>{card.likes.length}</span>
        </button>
      </div>
    </div>
  );
}

export default Card;
