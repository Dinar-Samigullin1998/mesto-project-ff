
import '../pages/index.css'; // добавьте импорт главного файла стилей 

import {initialCards} from './cards.js';

import {openModal, closeModal} from './modal.js';

import {createCard, deleteCard, likeCard, renderInitialCards}  from './card.js';

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
// const buttonSubmitEditProfile =  popupTypeEdit.querySelector('.popup__button');  - Кнопка отправки формы профиля, необходима для валидации
const formElementNewPlace = document.forms["new-place"];
const cardsContainer = document.querySelector('.places__list');
const nameInputForm = formElementNewPlace.querySelector('.popup__input_type_card-name');
const linkInputForm = formElementNewPlace.querySelector('.popup__input_type_url');
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupCaption = popupTypeImage.querySelector('.popup__caption');

renderInitialCards(initialCards, openImagePopup, deleteCard, likeCard);

buttonProfileEdit.addEventListener('click', () => {   
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    openModal(popupTypeEdit); 
});;

buttonAddProfile.addEventListener('click', () => openModal(popupTypeNewCard));

bottonTypeEditPopupClose.addEventListener('click', () => closeModal(popupTypeEdit));

bottonTypeNewCardPopupClose.addEventListener('click', () => closeModal(popupTypeNewCard));

bottonTypeImagePopupClose.addEventListener('click', () => closeModal(popupTypeImage));

function handleFormSubmitEditProfile(evt) {
    evt.preventDefault(); // Отменяем стандартное поведение отправки формы
    // Получаем значения из полей ввода
    const newName = nameInput.value;
    const newJob = jobInput.value;
    // Вставляем новые значения в элементы профиля
    profileName.textContent = newName;
    profileJob.textContent = newJob;
    formElementEditProfile.reset();
    closeModal(popupTypeEdit); // Закрываем попап после сохранения
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElementEditProfile.addEventListener('submit', handleFormSubmitEditProfile);

/* function setSubmitButtonState(isFormValid) {
    if (isFormValid) {
        buttonSubmitEditProfile.removeAttribute('disabled'); // Разблокировать кнопку
        buttonSubmitEditProfile.classList.remove('popup__button_disabled');
    } else {
        buttonSubmitEditProfile.setAttribute('disabled', true); // Заблокировать кнопку
        buttonSubmitEditProfile.classList.add('popup__button_disabled');
    }
}

formElementEditProfile.addEventListener('input', function (evt) {
    const isValid = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/.test(nameInput.value) &&
    /^[a-zA-Zа-яА-ЯёЁ\s-]+$/.test(jobInput.value);
    setSubmitButtonState(isValid);
});
*/

function createNewCard(evt) {
    evt.preventDefault();
    const nameNewCard = nameInputForm.value;
    const linkNewCard = linkInputForm.value;
     // Создаём карточку через createCard
    const newCard = createCard(
        { name: nameNewCard, link: linkNewCard },
        deleteCard,
        likeCard,
        openImagePopup
    );
     // Добавляем новую карточку в начало списка
    cardsContainer.prepend(newCard);
     // Очищаем форму
    formElementNewPlace.reset();
     // Закрываем попап
    closeModal(popupTypeNewCard);
}
 
 // Добавляем обработчик на форму добавления новой карточки
formElementNewPlace.addEventListener('submit', createNewCard);

function openImagePopup({ name, link }) {
    popupImage.src = link;
    popupImage.alt = name;
    popupCaption.textContent = name;
    openModal(popupTypeImage);
}

