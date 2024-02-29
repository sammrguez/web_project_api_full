import React, { useRef, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const currentUser = useContext(CurrentUserContext);
  const avatarRef = useRef(currentUser.avatar);
  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar(avatarRef.current.value);
  }
  return (
    <PopupWithForm
      name="update-avatar"
      id="avatar"
      header="Editar foto de perfil"
      submitButton="avatar"
      buttonText="guardar"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        className="form__input"
        placeholder="Link de foto"
        id="avatar-input"
        name="updateAvatar"
        required
        minLength="4"
        ref={avatarRef}
      />

      <span className="form__input-error avatar-input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
