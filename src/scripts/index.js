
import '../pages/index.css'; // добавьте импорт главного файла стилей 

import {openModal, closeModal} from './modal.js';

import {createCard, deleteCardHandler, likeCardHandler}  from './card.js';

import {enableValidation, clearValidation} from './validation.js';

import {getUserInfo, getCardsLink, updateUserInfo, addNewCardApi, removeCardApi, updateAvatarUser} from './api.js'

const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');
const buttonProfileEdit = document.querySelector('.profile__edit-button');
const buttonAddProfile = document.querySelector('.profile__add-button');
const bottonTypeEditPopupClose = popupTypeEdit.querySelector('.popup__close');
const bottonTypeNewCardPopupClose = popupTypeNewCard.querySelector('.popup__close');
const bottonTypeImagePopupClose = popupTypeImage.querySelector('.popup__close');
const formElementEditProfile = document.forms["edit-profile"];
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const formElementNewPlace = document.forms["new-place"];
const cardsContainer = document.querySelector('.places__list');
const nameInputForm = formElementNewPlace.querySelector('.popup__input_type_card-name');
const linkInputForm = formElementNewPlace.querySelector('.popup__input_type_url');
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupCaption = popupTypeImage.querySelector('.popup__caption');
const profileAvatar = document.querySelector('.profile__image');
const popupAvatar =  document.querySelector('.popup_type_avatar');
const formElementAvatar = document.forms["avatar"];
const bottonAvatarPopupClose = popupAvatar.querySelector('.popup__close');
let userId = '';
const newProfileEditButton = popupTypeEdit.querySelector('.popup__button');
const avatarInput = formElementAvatar.querySelector('.popup__input_avatar');
const newAvatarButton = popupAvatar.querySelector('.popup__button');
const profileImage = document.querySelector('.profile__image');
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
};

profileAvatar.addEventListener('click', () => {
    formElementAvatar.reset();
    clearValidation(formElementAvatar, validationConfig);
    openModal(popupAvatar);
});

buttonProfileEdit.addEventListener('click', () => {   
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    clearValidation(formElementEditProfile, validationConfig);
    openModal(popupTypeEdit); 
});

buttonAddProfile.addEventListener('click', () => {
    formElementNewPlace.reset(); // Сбрасываем значения формы
    clearValidation(formElementNewPlace, validationConfig); // Очищаем валидацию формы карточки
    openModal(popupTypeNewCard);
});

bottonTypeEditPopupClose.addEventListener('click', () => closeModal(popupTypeEdit));

bottonTypeNewCardPopupClose.addEventListener('click', () => closeModal(popupTypeNewCard));

bottonTypeImagePopupClose.addEventListener('click', () => closeModal(popupTypeImage));

bottonAvatarPopupClose.addEventListener('click', () => closeModal(popupAvatar));

function handleFormSubmitEditProfile(evt) {
    evt.preventDefault(); // Отменяем стандартное поведение отправки формы
    newProfileEditButton.textContent = 'Сохранение...' ;
    // Получаем значения из полей ввода
    const newName = nameInput.value;
    const newJob = jobInput.value;
    updateUserInfo(newName, newJob)
    .then((data) => {
      // Обновляем данные на странице
        profileName.textContent = data.name;
        profileJob.textContent = data.about;
        closeModal(popupTypeEdit); 
        clearValidation(formElementEditProfile, validationConfig);
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => {
        newProfileEditButton.textContent = 'Сохранить';
    });
};

formElementEditProfile.addEventListener('submit', handleFormSubmitEditProfile);

function handleFormSubmitAvatar(evt) {
    evt.preventDefault();
    newAvatarButton.textContent = 'Сохранение...' ;
    // Получаем значения из полей ввода
    const newAvatar = avatarInput.value;
    updateAvatarUser(newAvatar)
    .then((data) => {
      // Обновляем данные на странице
        profileImage.style.backgroundImage = `url(${data.avatar})`;
        closeModal(popupAvatar); 
        clearValidation(formElementAvatar, validationConfig);
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => {
        newAvatarButton.textContent = 'Сохранить';
    });
};

formElementAvatar.addEventListener('submit', handleFormSubmitAvatar);

function createNewCard(evt) {
    evt.preventDefault();
    const newCardButton = popupTypeNewCard.querySelector('.popup__button');
    newCardButton.textContent = 'Создание...';
    // Обновляем данные на странице
    const name = nameInputForm.value.trim();
    const link = linkInputForm.value.trim();
    addNewCardApi({
        name,
        link
    })
    .then((cardData) => {
        const cardElement = createCard(
            cardData,
             deleteCardHandler(removeCardApi), 
             likeCardHandler, 
             openImagePopup, 
             userId
        );
         // Добавляем новую карточку в начало списка
        cardsContainer.prepend(cardElement);
        formElementNewPlace.reset();
        closeModal(popupTypeNewCard);
        clearValidation(formElementNewPlace, validationConfig);
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => {
        newCardButton.textContent = 'Создать';
      });
};
 
formElementNewPlace.addEventListener('submit', createNewCard);

function openImagePopup({ name, link }) {
    popupImage.src = link;
    popupImage.alt = name;
    popupCaption.textContent = name;
    openModal(popupTypeImage);
};

enableValidation(validationConfig);

Promise.all([getUserInfo(), getCardsLink()])
    .then(([userData, cards]) => {
        userId = userData._id;
        profileName.textContent = userData.name;
        profileJob.textContent = userData.about;
        profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
        cards.forEach((data) => {
            const cardElement = createCard(
                data,
                deleteCardHandler(removeCardApi), 
                likeCardHandler, 
                openImagePopup, 
                userId
            );
            cardsContainer.prepend(cardElement);
        });
    })
    .catch((err) => {
        console.log(err);
    });