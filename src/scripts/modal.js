
export function openModal(popup) {
    popup.classList.add('popup_is-opened');
    // Добавляем обработчик закрытия попапа при нажатии клавиши Escape
    document.addEventListener('keydown', handleEscClose);
    // Добавляем обработчик закрытия попапа при клике на оверлей
    popup.addEventListener('click', handleOverlayClick);
}

export function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleEscClose);
    popup.removeEventListener('click', handleOverlayClick);
}

// Функция для закрытия попапа при нажатии клавиши Esc
function handleEscClose(evt) {
    if (evt.key === 'Escape') {
        const openPopup = document.querySelector('.popup_is-opened');
        if (openPopup) {
            closeModal(openPopup);
        }
    }
}

// Функция для закрытия попапа при клике на оверлей
function handleOverlayClick(event) {
    if (event.target.classList.contains('popup')) {
        closeModal(event.target);
    }
}
