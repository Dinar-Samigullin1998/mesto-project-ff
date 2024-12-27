
import '../pages/index.css'; // добавьте импорт главного файла стилей 

import {initialCards} from './cards.js';

import {openModal, closeModal} from './modal.js';

import {createCard, deleteCard, likeCard, renderInitialCards}  from './card.js';

const popupTypeEdit = document.querySelector('.popup_type_edit');
const buttonProfileEdit = document.querySelector('.profile__edit-button');
const buttonAddProfile = document.querySelector('.profile__add-button');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const formElementEditProfile = document.querySelector('[name="edit-profile"]');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const popupButtonSubmit =  document.querySelector('.popup__button');
const formElementNewPlace = document.querySelector('[name="new-place"]');
const cardContainer = document.querySelector('.places__list');
const nameInputForm = formElementNewPlace.querySelector('.popup__input_type_card-name');
const linkInputForm = formElementNewPlace.querySelector('.popup__input_type_url');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

renderInitialCards(initialCards, handleCardClick, deleteCard, likeCard);

buttonProfileEdit.addEventListener('click', () => {   
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    openModal(popupTypeEdit); 
});;

buttonAddProfile.addEventListener('click', () => openModal(popupTypeNewCard));

document.addEventListener('click', event => {
    if (event.target.classList.contains('popup__close')) {
      const popup = event.target.closest('.popup');
      if (popup) {
        closeModal(popup); 
      }
    }
});

function handleFormSubmit(evt) {
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
formElementEditProfile.addEventListener('submit', handleFormSubmit);

function setSubmitButtonState(isFormValid) {
    if (isFormValid) {
        popupButtonSubmit.removeAttribute('disabled'); // Разблокировать кнопку
        popupButtonSubmit.classList.remove('popup__button_disabled');
    } else {
        popupButtonSubmit.setAttribute('disabled', true); // Заблокировать кнопку
        popupButtonSubmit.classList.add('popup__button_disabled');
    }
}

formElementEditProfile.addEventListener('input', function (evt) {
    const isValid = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/.test(nameInput.value) &&
    /^[a-zA-Zа-яА-ЯёЁ\s-]+$/.test(jobInput.value);
    setSubmitButtonState(isValid);
});

function createNewCard(evt) {
    evt.preventDefault();
    const nameNewCard = nameInputForm.value;
    const linkNewCard = linkInputForm.value;
     // Создаём карточку через createCard
    const newCard = createCard(
        { name: nameNewCard, link: linkNewCard },
        deleteCard,
        likeCard,
        handleCardClick
    );
     // Добавляем новую карточку в начало списка
    cardContainer.prepend(newCard);
     // Очищаем форму
    formElementNewPlace.reset();
     // Закрываем попап
    closeModal(formElementNewPlace.closest('.popup'));
}
 
 // Добавляем обработчик на форму добавления новой карточки
formElementNewPlace.addEventListener('submit', createNewCard);

function handleCardClick({ name, link }) {
    popupImage.src = link;
    popupImage.alt = name;
    popupCaption.textContent = name;
    openModal(popupTypeImage);
}

