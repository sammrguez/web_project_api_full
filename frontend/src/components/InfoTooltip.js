import React from 'react';
import iconSuccesss from '../images/success_message.svg';
import iconError from '../images/error_message.svg';

function InfoTooltip({ isSuccess, shoulBeInfoOpen, onCloseBtn }) {
  const icon = isSuccess ? iconSuccesss : iconError;
  const messagge = isSuccess
    ? '¡Correcto! Ya estás registrado.'
    : 'Uy, algo salió mal. Por favor, inténtalo de nuevo.';

  return (
    <div className={`popup ${shoulBeInfoOpen ? 'popup_opened' : ''}`}>
      <div className='overlay'></div>

      <div className='infoTool'>
        <img
          src={icon}
          className='infoTool__image'
          alt={'icono que indica el estado del registro'}
        />
        <p className='infoTool__text'>{messagge}</p>
      </div>
      <button
        className='infoTool__close-button'
        type='button'
        onClick={onCloseBtn}
      ></button>
    </div>
  );
}

export default InfoTooltip;
