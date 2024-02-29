import React from 'react';

import addIcon from '../images/add_button.svg';

import editIcon from '../images/edit_button.png';

function Profile({
  onEditAvatarClick,
  userAvatar,
  onEditProfileClick,
  userName,
  userDescrprion,
  onAddPlaceClick,
}) {
  return (
    <section className='profile'>
      <div
        className='profile__avatar-overlay'
        onClick={onEditAvatarClick}
      ></div>

      <img
        className='profile__avatar'
        src={userAvatar}
        alt='aquí está tu foto de perfil'
      />

      <div className='profile__info'>
        <div className='edit-button' onClick={onEditProfileClick}>
          <img
            className='edit-button__icon'
            src={editIcon}
            alt='ícono de editar'
          />
        </div>
        <h1 className='profile__user-name'>{userName}</h1>
        <h2 className='profile__user-profession'>{userDescrprion} </h2>
      </div>
      <div className='add-button' onClick={onAddPlaceClick}>
        <img
          className='add-button__icon'
          src={addIcon}
          alt='ícono de agregar'
        />
      </div>
    </section>
  );
}

export default Profile;
