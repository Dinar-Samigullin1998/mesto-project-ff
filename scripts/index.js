// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

function createCard({ name, link }, deleteCardCallback) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardItem = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = cardItem.querySelector('.card__image');
    cardImage.src = link;
    cardImage.alt = name;
    const cardTitle = cardItem.querySelector('.card__title');
    cardTitle.textContent = name;
    const deleteButton = cardItem.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', () => deleteCardCallback(cardItem));
    return cardItem;
}

function renderCard() {
    const placeList = document.querySelector('.places__list');
    initialCards.forEach(({ name, link }) => {
        const card = createCard({ name, link }, deleteCard);
        placeList.append(card);
    });
}

function deleteCard(cardItem) {
    cardItem.remove();
}

renderCard();












 



