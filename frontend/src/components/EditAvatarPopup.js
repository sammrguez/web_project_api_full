import React, { useEffect, useState, useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const currentUser = useContext(CurrentUserContext);

  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    if (currentUser.avatar !== undefined) {
      setAvatar(currentUser.avatar || '');
    }
  }, [currentUser]);

  function handleAvatar(evt) {
    setAvatar(evt.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(avatar); // current nuevo
    onUpdateAvatar(avatar);
  }
  return (
    <PopupWithForm
      name='update-avatar'
      id='avatar'
      header='Editar foto de perfil'
      submitButton='avatar'
      buttonText='guardar'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type='url'
        className='form__input'
        placeholder='Link de foto'
        id='avatar-input'
        name='updateAvatar'
        required
        minLength='4'
        onChange={handleAvatar}
      />

      <span className='form__input-error avatar-input-error'></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
