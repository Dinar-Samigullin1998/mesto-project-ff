const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-30',
    headers: {
      authorization: '0ab4c9cd-2905-462f-b972-f5c51f2695c1',
      'Content-Type': 'application/json',
    },
};

const getResponseData =  (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

export const getUserInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'GET',
        headers: config.headers,
    })
    .then(getResponseData);
};

export const getCardsLink = (res) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'GET',
        headers: config.headers,
    })
    .then(getResponseData);
};

export const updateUserInfo = (name, about) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({ name, about }),
    })
    .then(getResponseData);
};
  
export const addLikeCardApi = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers,
    })
    .then(getResponseData);
};

export const deleteLikeCardApi = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    })
    .then(getResponseData);
};

export const addNewCardApi = ({name, link}) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({name, link}),
    })
    .then(getResponseData);
};

export const removeCardApi = (_id) => {
    return fetch(`${config.baseUrl}/cards/${_id}`, {
        method: 'DELETE',
        headers: config.headers,
    })
    .then(getResponseData);
};

export const updateAvatarUser = (avatar) => {
    return fetch(`${config.baseUrl}/users/me/avatar`,  {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({avatar}),
    })
    .then(getResponseData);
};