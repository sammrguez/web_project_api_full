class Api {
  constructor({ BASE_URL }) {
    this._URL = BASE_URL;
  }

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
        console.log('llego la soli de actualozar ');
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })

      .catch((error) => {
        console.log(`Error: ${error}`);
      });
  }
  // cardsAddedRequest(token) {
  //   return fetch(`${this._URL}/cards`, {
  //     headers: {
  //       authorization: `Bearer ${token}`,
  //       'content-Type': 'application/json',
  //     },
  //   })
  //     .then((res) => {
  //       if (res.ok) {
  //         return res.json();
  //       }
  //       return Promise.reject(res.status);
  //     })
  //     .catch((error) => {
  //       console.log(`Error: ${error}`);
  //     });
  // }

  // changeLikeCardStatus(cardId, isLiked, token) {
  //   if (isLiked) {
  //     return fetch(`${this._URL}/cards/likes/${cardId}`, {
  //       method: 'DELETE',
  //       headers: {
  //         authorization: token,
  //         'content-Type': 'application/json',
  //       },
  //     })
  //       .then((res) => {
  //         if (res.ok) {
  //           return res.json();
  //         }
  //         return Promise.reject(res.status);
  //       })

  //       .catch((error) => {
  //         console.log(`Error: ${error}`);
  //       });
  //   } else {
  //     return fetch(`${this._URL}/cards/likes/${cardId}`, {
  //       method: 'PUT',
  //       headers: {
  //         authorization: this._token,
  //         'content-Type': 'application/json',
  //       },
  //     })
  //       .then((res) => {
  //         if (res.ok) {
  //           return res.json();
  //         }
  //         return Promise.reject(res.status);
  //       })

  //       .catch((error) => {
  //         console.log(`Error: ${error}`);
  //       });
  //   }
  // }
  // deleteCard(cardId, token) {
  //   return fetch(`${this._URL}/cards/${cardId}`, {
  //     method: 'DELETE',
  //     headers: {
  //       authorization: token,
  //       'content-Type': 'application/json',
  //     },
  //   })
  //     .then((res) => {
  //       if (res.ok) {
  //         return res.json();
  //       }
  //       return Promise.reject(res.status);
  //     })

  //     .catch((error) => {
  //       console.log(`Error: ${error}`);
  //     });
  // }
  setUserInfo(profile, token) {
    console.log(token);
    console.log(profile);
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
        console.log(res);
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })

      .catch((error) => {
        console.log(error);
        console.log(`Error: ${error}`);
      });
  }

  setUserAvatar(url, token) {
    console.log(url);
    console.log(token);
    return fetch(`${this._URL}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        authorization: `Bearer ${token}`,
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
  BASE_URL: 'http://localhost:3000',
});
export default api;
