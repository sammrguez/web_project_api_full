import React, { useContext } from 'react';
import PopupConfirmation from './PopupConfirmation';
import Profile from './Profile';
import ImagePopup from './ImagePopup';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({
  onEditProfileClick,
  onAddPlaceClick,
  onEditAvatarClick,
  onClose,
  onCardClick,
  selectedCard,
  children,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <main className='content'>
      <Profile
        onEditAvatarClick={onEditAvatarClick}
        userAvatar={
          currentUser && currentUser.avatar ? currentUser.avatar : ' '
        }
        onEditProfileClick={onEditProfileClick}
        userName={currentUser && currentUser.name ? currentUser.name : ' '}
        userDescrprion={
          currentUser && currentUser.about ? currentUser.about : ' '
        }
        onAddPlaceClick={onAddPlaceClick}
      />

      <section className='card-container'>
        {Array.isArray(cards) &&
          cards
            .slice()
            .reverse()
            .map((card) => {
              if (card && card._id) {
                return (
                  <Card
                    key={card._id}
                    card={card}
                    onCardClick={onCardClick}
                    onCardLike={onCardLike}
                    onCardDelete={onCardDelete}
                  />
                );
              }
              return null;
            })}
      </section>

      <ImagePopup name='photo' onClose={onClose} selectedCard={selectedCard} />

      <PopupConfirmation />

      {children}
    </main>
  );
}

export default Main;
