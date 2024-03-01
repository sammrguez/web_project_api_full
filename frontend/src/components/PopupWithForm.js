import React from "react";

function PopupWithForm({
  isOpen,
  name,
  id,
  onSubmit,
  onClose,
  header,
  children,
  submitButton,
  buttonText,
}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="overlay"></div>
      <form className="form" id={id} noValidate name={name} onSubmit={onSubmit}>
        <button
          className="form__close-button"
          onClick={onClose}
          type="button"
        ></button>
        <div className="form__container">
          <h3 className="form__header">{header}</h3>
          <fieldset className="form__input-container">
            {children}
            <button
              className={`form__submit-button form__submit-button_${submitButton}`}
              type="submit"
              onClick={onClose}
            >
              {buttonText}
            </button>
          </fieldset>
        </div>
      </form>
    </div>
  );
}

export default PopupWithForm;
