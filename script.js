/* ПЕРЕМЕННЫЕ */
const placesList = document.querySelector('.places-list');
const popup = document.querySelector('.popup');
const userInfoButton = document.querySelector('.user-info__button');
const popupCloseButton = document.querySelector('.popup__close');
const form = document.forms.new;
const name = form.elements.name;
const link = form.elements.link;
const formSubmitButton = document.querySelector('.popup__button');

/* ФУНКЦИИ */
// формирует карточку
function createPlaceCard(imageUrl, placeName) {
    const placeCard = document.createElement('div');
    const placeCardImage = document.createElement('div');
    const placeCardDeleteIcon = document.createElement('button');
    const placeCardDescription = document.createElement('div');
    const placeCardName = document.createElement('h3');
    const placeCardLikeIcon = document.createElement('button');

    placeCard.classList.add('place-card');
    placeCardImage.classList.add('place-card__image');
    placeCardDeleteIcon.classList.add('place-card__delete-icon');
    placeCardDescription.classList.add('place-card__description');
    placeCardName.classList.add('place-card__name');
    placeCardLikeIcon.classList.add('place-card__like-icon');
    placeCardImage.style.backgroundImage = `url(${imageUrl})`;
    placeCardName.textContent = placeName;

    placeCardImage.appendChild(placeCardDeleteIcon);
    placeCardDescription.appendChild(placeCardName);
    placeCardDescription.appendChild(placeCardLikeIcon);
    placeCard.appendChild(placeCardImage);
    placeCard.appendChild(placeCardDescription);

    return placeCard;
}

// добавляет на страницу первоначальные карточки
function createInitialCards() {
    initialCards.forEach(function (place) {
        placesList.appendChild(createPlaceCard(place.link, place.name));
    });
}

// Обработчики событий
// открывает форму
function popupShow() {
    // popup.style.display = 'flex';
    popup.classList.add('popup_is-opened');
}

// закрывает форму
function popupClose() {
    popup.classList.remove('popup_is-opened');
    formSubmitButton.setAttribute('disabled', true);
    form.reset();
}

// добавляет на страницу одну карточку
function addPlace(event) {
    event.preventDefault();
    placesList.appendChild(createPlaceCard(link.value, name.value));
    form.reset();
    popupClose();
}

// удаляет со страницы карточку
function removePlace(event) {
    if (event.target.classList.contains('place-card__delete-icon')) {
        placesList.removeChild(event.target.closest('.place-card'));
    }
}

// закрывает форму по Escape
function popupEscHandler(event) {
    if (event.key == 'Escape') {
        popupClose();
    }
}

// ставит/снимает лайк
function likeHandler(event) {
    if (event.target.classList.contains('place-card__like-icon')) {
        event.target.classList.toggle('place-card__like-icon_liked');
    }
}

// активирует кнопку "+" при вводе текста в форму и деактивирует ее при пустых полях
function inputHandler() {
    if (name.value.length === 0 || link.value.length === 0) {
        formSubmitButton.setAttribute('disabled', true);
    } else {
        formSubmitButton.removeAttribute('disabled');
    }
}
/* СЛУШАТЕЛИ СОБЫТИЙ */
userInfoButton.addEventListener('click', popupShow);
popupCloseButton.addEventListener('click', popupClose);
document.addEventListener('keydown', popupEscHandler);
// Отлично: используется делегирование событий
placesList.addEventListener('click', likeHandler);
placesList.addEventListener('click', removePlace);
form.addEventListener('input', inputHandler);
form.addEventListener('submit', addPlace);
/* ВЫЗОВЫ ФУНКЦИЙ */
createInitialCards();
