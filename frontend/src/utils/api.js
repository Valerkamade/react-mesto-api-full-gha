import {apiConfig} from './utils'

class Api {
  constructor({ baseUrl, headers, credentials }) {
    this._baseUrl = baseUrl;
    this._authorization = headers['authorization'];
    this._headers = headers;
    this._credentials = credentials;
  }

  // Метод проверки успешности запроса
  _isOk(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Что-то где-то пошло не так... Код ошибки ${res.status}`);
  }

  // Метод запроса с проверкой ответа
  _request(url, options) {
    return fetch(url, options).then(this._isOk)
  }

  // метод запроса данных карточек с сервера
  getInitialCardsApi() {
    return this._request(`${this._baseUrl}/cards`, {
      credentials: this._credentials,
    })
  }

  // Метод запроса данных пользователя с сервера
  getUserInfoApi() {
    return this._request(`${this._baseUrl}/users/me`, {
      credentials: this._credentials,
    })
  }

  // Метот передачи данных пользователя на сервер
  setUserInfoApi({ name, about }) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      credentials: this._credentials,
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
  }

  // Метод передачи на сервер новых данных о пользователе 
  setUserAvatarApi({ avatar }) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      credentials: this._credentials,
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar
      })
    })
  }

  // Метод добавления новой карточки на сервер
  addNewCardApi({ name, link }) {
    return this._request(`${this._baseUrl}/cards`, {
      method: 'POST',
      credentials: this._credentials,
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
  }

  // Метод удаления карточки с сервера
  deleteCardApi(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      credentials: this._credentials,
      headers: this._headers
    })
  }

  // Метод отправки данных об установке/снятии лайка на сервер
  toggleLikeCardApi(cardID, isLiked) {
    if (!isLiked) {
      return this._request(`${this._baseUrl}/cards/${cardID}/likes`, {
        method: 'PUT',
        credentials: this._credentials,
        headers: this._headers
      })
    } else {
      return this._request(`${this._baseUrl}/cards/${cardID}/likes`, {
        method: 'DELETE',
        credentials: this._credentials,
        headers: this._headers
      })
    }
  }
}

export const api = new Api(apiConfig);