// Функция для показа ошибки
const showInputError = (formElement, inputElement, errorMessage, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    inputElement.classList.add(config.inputErrorClass);  // Добавляем класс для инпута с ошибкой
    errorElement.classList.add(config.errorClass);  // Добавляем класс для отображения ошибки
};
  
  // Функция для скрытия ошибки
const hideInputError = (formElement, inputElement, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = '';
    inputElement.classList.remove(config.inputErrorClass);  // Убираем класс с инпута
    errorElement.classList.remove(config.errorClass);  // Убираем класс с ошибки
};
  
  // Функция для проверки валидности инпута
const checkInputValidity = (formElement, inputElement, config) => {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity('');
    }
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, config);
    } else {
        hideInputError(formElement, inputElement, config);
    }
};
  
  // Функция для проверки, есть ли невалидные инпуты
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => !inputElement.validity.valid);
};
  
  // Функция для включения/выключения кнопки отправки формы
const toggleButtonState = (inputList, buttonElement, config) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add(config.inactiveButtonClass);
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(config.inactiveButtonClass);
    }
};
  
  // Функция для установки обработчиков событий на инпуты
const setEventListeners = (formElement, config) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, config);
            toggleButtonState(inputList, buttonElement, config);
        });
    });
    // Инициализируем состояние кнопки при загрузке страницы
    toggleButtonState(inputList, buttonElement, config);
};
  
  // Основная функция для включения валидации
export const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
      // Останавливаем стандартное поведение формы
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
  
      // Устанавливаем обработчики событий для каждой формы
        setEventListeners(formElement, config);
    });
};
  

export const clearValidation = (formElement, config) => {
    // Находим все элементы ввода и ошибки в текущей форме
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const submitButton = formElement.querySelector(config.submitButtonSelector);
  
    // Очищаем ошибки и стили для каждого инпута
    inputList.forEach((inputElement) => {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(config.inputErrorClass); // Убираем класс с ошибкой
        errorElement.textContent = ''; // Сбрасываем текст ошибки
    });
  
    // Делаем кнопку неактивной
    submitButton.classList.add(config.inactiveButtonClass); // Добавляем класс неактивной кнопки
    submitButton.disabled = true; // Делаем кнопку неактивной
};


  // Конфигурационный объект для валидации
const config = {
    formSelector: '.popup__form',             // Селектор для форм
    inputSelector: '.popup__input',           // Селектор для инпутов
    submitButtonSelector: '.popup__button',   // Селектор для кнопки отправки
    inactiveButtonClass: 'popup__button_disabled', // Класс для отключенной кнопки
    inputErrorClass: 'popup__input_type_error',   // Класс для инпута с ошибкой
    errorClass: 'popup__error_visible'            // Класс для отображаемой ошибки
};
  
 
  