import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ onClose, isOpen, onAddPlaceSubmit }) {
  const [placeName, setPlaceName] = useState("");
  const [link, setLink] = useState("");

  function handleChange(e) {
    switch (e.target.name) {
      case "place-name":
        setPlaceName(e.target.value);

        break;
      case "link":
        setLink(e.target.value);

        break;
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    onAddPlaceSubmit({
      name: placeName,
      link: link,
    });
  }

  return (
    <PopupWithForm
      name="new-place"
      id="place"
      header="Nuevo Lugar"
      submitButton="place"
      buttonText="crear"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="form__input"
        placeholder="Título"
        id="place-name-input"
        name="place-name"
        minLength="4"
        maxLength="30"
        required
        onChange={handleChange}
        value={placeName}
      />

      <span className="form__input-error place-name-input-error"></span>

      <input
        type="url"
        className="form__input"
        placeholder="Enlace a la Imagen"
        id="photo-link-input"
        name="link"
        required
        minLength="4"
        maxLength="300"
        onChange={handleChange}
        value={link}
      />

      <span className="form__input-error photo-link-input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
