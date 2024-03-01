class Api {
  constructor({ BASE_URL }) {
    this._URL = BASE_URL;
  }

  getUserInfo(token) {
    console.log(token);
    return fetch(`${this._URL}/users/me`, {
      headers: {
        authorization: `Bearer ${token}`,
        'content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })

      .catch((error) => {
        console.log(`Error: ${error}`);
      });
  }
  cardsAddedRequest() {
    return fetch(`${this._URL}/cards`, {
      headers: {
        authorization: this._token,
        'content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
      .catch((error) => {
        console.log(`Error: ${error}`);
      });
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return fetch(`${this._URL}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: {
          authorization: this._token,
          'content-Type': 'application/json',
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(res.status);
        })

        .catch((error) => {
          console.log(`Error: ${error}`);
        });
    } else {
      return fetch(`${this._URL}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: {
          authorization: this._token,
          'content-Type': 'application/json',
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(res.status);
        })

        .catch((error) => {
          console.log(`Error: ${error}`);
        });
    }
  }
  deleteCard(cardId) {
    return fetch(`${this._URL}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })

      .catch((error) => {
        console.log(`Error: ${error}`);
      });
  }
  setUserInfo(profile) {
    return fetch(`${this._URL}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: profile.name,
        about: profile.about,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })

      .catch((error) => {
        console.log(`Error: ${error}`);
      });
  }

  setUserAvatar(url) {
    return fetch(`${this._URL}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar: url,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })

      .catch((error) => {
        console.log(`Error: ${error}`);
      });
  }

  addCard(card) {
    return fetch(`${this._URL}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: card.name,
        link: card.link,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
      .catch((error) => {
        console.log(`Error: ${error}`);
      });
  }
}

const api = new Api({
  BASE_URL: 'https://localhost:3000',
});
export default api;
