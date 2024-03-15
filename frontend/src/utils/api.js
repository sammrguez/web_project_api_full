class Api {
  constructor({ BASE_URL }) {
    this._URL = BASE_URL;
  }

  // Request Abstraction//
  _makeRequest(endpoint, token = null, method = 'GET', body = null) {
    const options = {
      method,
      headers: {
        Accept: 'application/json',
      },
    };

    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }
    if (body) {
      options.headers['content-Type'] = 'application/json';
      options.body = JSON.stringify(body);
    }
    return fetch(`${this._URL}${endpoint}`, options)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Server error: ${res.status}`);
        }
        return res.json();
      })
      .catch((err) => console.log(`Error: ${err}`));
  }
  //users
  getUserInfo(token) {
    return this._makeRequest('/users/me', token);
  }

  setUserInfo(profile, token) {
    return this._makeRequest('/users/me', token, 'PATCH', profile);
  }

  setUserAvatar(url, token) {
    return this._makeRequest('/users/me/avatar', token, 'PATCH', {
      avatar: url,
    });
  }

  // cards

  cardsAddedRequest(token) {
    return this._makeRequest('/cards', token);
  }

  addCard(card, token) {
    return this._makeRequest('/cards', token, 'POST', card);
  }

  deleteCard(cardId, token) {
    return this._makeRequest(`/cards/${cardId}`, token, 'DELETE');
  }

  changeLikeCardStatus(cardId, isLiked, token) {
    if (isLiked) {
      return this._makeRequest(`/cards/${cardId}/likes`, token, 'DELETE');
    } else {
      return this._makeRequest(`/cards/${cardId}/likes`, token, 'PUT');
    }
  }
}

const api = new Api({
  BASE_URL: 'https://api.aroundtheworld.mooo.com',
});
export default api;
