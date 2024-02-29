import React from 'react';

function PopupConfirmation() {
  return (
    <div className='popup popup_type_delete'>
      <div className='overlay'></div>

      <div className='form form_action_delete' id='deleteForm' name='delete'>
        <button
          className='form__close-button form__close-button_type_delete'
          type='submit'
        ></button>

        <div className='form__container'>
          <h3 className='form__header'>¿Estás seguro?</h3>

          <button
            type='submit'
            className='form__submit-button form__submit-button_delete'
            id='delete'
          >
            Sí
          </button>
        </div>
      </div>
    </div>
  );
}

export default PopupConfirmation;
