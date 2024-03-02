import React, { useState, useContext, useEffect } from 'react';

import PopupWithForm from './PopupWithForm';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState('');

  const [description, setDescription] = useState('');

  useEffect(() => {
    if (currentUser.name !== undefined || currentUser.about !== undefined) {
      setName(currentUser.name || '');

      setDescription(currentUser.about || '');
    }
  }, [currentUser]);

  function handleName(evt) {
    setName(evt.target.value);
    console.log(name);
  }

  function handleDescription(evt) {
    setDescription(evt.target.value);
    console.log(description);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name: name,

      about: description,
    });
  }

  return (
    <PopupWithForm
      name='edit-profile'
      id='profile'
      header='Editar Perfil'
      submitButton='edit'
      buttonText='actualizar'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type='text'
        className='form__input'
        placeholder='Nombre'
        id='name-input'
        name='name'
        required
        minLength='2'
        maxLength='30'
        onChange={handleName}
        value={name}
      />

      <span className='form__input-error name-input-error'></span>

      <input
        type='text'
        className='form__input'
        placeholder='Acerca de mi'
        id='about-me-input'
        name='about-me'
        required
        minLength='2'
        maxLength='20'
        onChange={handleDescription}
        value={description}
      />

      <span className='form__input-error about-me-input-error'></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
