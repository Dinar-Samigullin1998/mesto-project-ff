import {addLikeCardApi, deleteLikeCardApi} from './api';

// Функция для создания карточки
export function createCard(data, deleteCardHandler, likeCardHandler, openImagePopup, userId) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardItem = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = cardItem.querySelector('.card__image');
    const cardTitle = cardItem.querySelector('.card__title');
    const deleteButton = cardItem.querySelector('.card__delete-button');
    const likeButton = cardItem.querySelector('.card__like-button');
    const likeCounter = cardItem.querySelector('.card__like-counter');
    // Заполняем карточку данными
    cardImage.src = data.link;
    cardImage.alt = data.name;
    cardTitle.textContent = data.name;
    likeCounter.textContent = data.likes.length;
    // Отображаем или скрываем кнопку удаления
    if (data.owner._id !== userId) {
        deleteButton.remove(); // Удаляем кнопку, если карточка не принадлежит пользователю
    } else {
        deleteButton.addEventListener('click', () => deleteCardHandler(cardItem, data._id));
    }
    // Устанавливаем состояние кнопки лайка
    if (data.likes.some((like) => like._id === userId)) {
        likeButton.classList.add('card__like-button_is-active');
    }
    // Обработчики событий
    likeButton.addEventListener('click', () => likeCardHandler(data._id, likeButton, likeCounter));
    cardImage.addEventListener('click', () => openImagePopup({ name: data.name, link: data.link }));
    return cardItem;
};

// Функция для обработки лайка карточки
export function likeCardHandler(cardId, likeButton, likeCounter) {
    if (likeButton.classList.contains('card__like-button_is-active')) {
        // Если лайк установлен, удаляем его
        deleteLikeCardApi(cardId)
        .then((data) => {
            likeButton.classList.remove('card__like-button_is-active');
            likeCounter.textContent = data.likes.length; // Обновляем количество лайков
        })
        .catch((err) => {
            console.log(err);
         });
    } else {
        // Если лайк отсутствует, добавляем его
        addLikeCardApi(cardId)
        .then((data) => {
            likeCounter.textContent = data.likes.length; // Обновляем количество лайков
            likeButton.classList.toggle('card__like-button_is-active');
        })
        .catch((err) => {
            console.log(err);
        });
    };
};

// Функция для удаления карточки
export const deleteCardHandler = (removeCardApi) => (cardElement, cardId) => {
    removeCardApi(cardId)
    .then(() => {
        cardElement.remove(); // Удаляем карточку из DOM 
    })
    .catch((err) => {
        console.log(err);
    });
};



