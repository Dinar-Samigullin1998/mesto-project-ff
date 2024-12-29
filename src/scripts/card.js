
export function createCard({ name, link }, deleteCardCallback, likeCard, openImagePopup) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardItem = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = cardItem.querySelector('.card__image');
    cardImage.src = link;
    cardImage.alt = name;
    const cardTitle = cardItem.querySelector('.card__title');
    cardTitle.textContent = name;
    const deleteButton = cardItem.querySelector('.card__delete-button');
    const likeButton = cardItem.querySelector('.card__like-button');
    deleteButton.addEventListener('click', () => deleteCardCallback(cardItem));
    likeButton.addEventListener('click', () => likeCard(likeButton));
    cardImage.addEventListener('click', () => openImagePopup({ name, link }));
    return cardItem;
}

export function renderInitialCards(initialCards, openImagePopup, deleteCard, likeCard) {
    const placeList = document.querySelector('.places__list');
    initialCards.forEach(({ name, link }) => {
        const card = createCard({ name, link }, deleteCard, likeCard, openImagePopup);
        placeList.append(card);
    });
}

export function deleteCard(cardItem) {
    cardItem.remove();
}

export function likeCard(likeButton) {
    likeButton.classList.toggle('card__like-button_is-active');
}
 