import React, { useRef, useEffect, useState, useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const currentUser = useContext(CurrentUserContext);

  const avatarRef = useRef(currentUser.avatar);

  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    if (currentUser.avatar !== undefined) {
      setAvatar(currentUser.avatar || '');
    }
  });
  function handleSubmit(e) {
    console.log(currentUser);
    e.preventDefault();

    onUpdateAvatar(avatarRef.current.value);
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
        ref={avatarRef}
      />

      <span className='form__input-error avatar-input-error'></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
