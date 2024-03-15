import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ onClose, isOpen, onAddPlaceSubmit }) {
  const [placeName, setPlaceName] = useState('');
  const [link, setLink] = useState('');

  function handleChangeName(e) {
    setPlaceName(e.target.value);
  }
  function handleChangeLink(e) {
    setLink(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    onAddPlaceSubmit({
      name: placeName,
      link: link,
    });
    setPlaceName('');
    setLink('');
  }

  return (
    <PopupWithForm
      name='new-place'
      id='place'
      header='Nuevo Lugar'
      submitButton='place'
      buttonText='crear'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type='text'
        className='form__input'
        placeholder='Título'
        id='place-name-input'
        name='place-name'
        minLength='4'
        maxLength='30'
        required
        onChange={handleChangeName}
        value={placeName}
      />

      <span className='form__input-error place-name-input-error'></span>

      <input
        type='url'
        className='form__input'
        placeholder='Enlace a la Imagen'
        id='photo-link-input'
        name='link'
        required
        minLength='4'
        maxLength='300'
        onChange={handleChangeLink}
        value={link}
      />

      <span className='form__input-error photo-link-input-error'></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
