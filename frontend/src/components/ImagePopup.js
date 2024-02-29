function ImagePopup({ name, selectedCard, onClose }) {
  return (
    <>
      <div
        className={`popup popup_type_${name} ${
          selectedCard ? "popup_opened" : ""
        }`}
      >
        <div className="popup__photo-container">
          {selectedCard && (
            <>
              <button
                className="popup__close-button"
                onClick={onClose}
              ></button>
              <img
                className="popup__photo"
                src={selectedCard.link}
                alt={selectedCard.name}
              />

              <h4 className="popup__photo-caption">{selectedCard.name} </h4>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default ImagePopup;
