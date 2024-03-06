class Api {
  constructor({ BASE_URL }) {
    this._URL = BASE_URL;
  }

  //users
  getUserInfo(token) {
    return fetch(`${this._URL}/users/me`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
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

  setUserInfo(profile, token) {
    return fetch(`${this._URL}/users/me`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
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

  setUserAvatar(url, token) {
    return fetch(`${this._URL}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'content-Type': 'application/json',
        authorization: `Bearer ${token}`,
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

  // cards

  cardsAddedRequest(token) {
    return fetch(`${this._URL}/cards`, {
      headers: {
        Accept: 'application/json',
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

  addCard(card, token) {
    return fetch(`${this._URL}/cards`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'content-Type': 'application/json',
        authorization: `Bearer ${token}`,
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

  deleteCard(cardId, token) {
    return fetch(`${this._URL}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
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
  changeLikeCardStatus(cardId, isLiked, token) {
    if (isLiked) {
      return fetch(`${this._URL}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
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
    } else {
      return fetch(`${this._URL}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
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
  }
}

const api = new Api({
  BASE_URL: 'http://localhost:3000',
});
export default api;
