import '../pages/index.css';
import { initialCards } from './cards.js';
import {createCard,handleFormSubmitAddCard} from './card.js';
import { closeModal, openModal } from './modal.js';

const templateCard = document.querySelector('#card-template').content;
const list = document.querySelector('.places__list');
const modalTypeEdit = document.querySelector('.popup_type_edit');
const modalProfileOpen = document.querySelector('.profile__edit-button');
const popup = document.querySelectorAll('.popup');
const modalClose = document.querySelectorAll('.popup__close');
const btnAddCard = document.querySelector('.profile__add-button');
const modalAdd = document.querySelector(".popup_type_new-card");
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const formElement = document.forms.edit_profile
const userInput = formElement.elements.name
const jobInput = formElement.elements.description
const formElementAdd = document.forms["new-place"];
const openedPopupPic = document.querySelector('.popup_type_image');
const popupPicImage = document.querySelector('.popup__image');
const pupupPicTitle = document.querySelector('.popup__caption');  

  
initialCards.forEach((el) => {
  const addCard = createCard(el, templateCard, popupPicImage, pupupPicTitle, openedPopupPic);
  list.appendChild(addCard);
});      

modalProfileOpen.addEventListener("click",() => {
  openModal(modalTypeEdit);
});

btnAddCard.addEventListener("click", function () {
  openModal(modalAdd);
});

modalClose.forEach((element, index) => {
  element.addEventListener("click",() => {
    closeModal(popup[index]);
  });
})

formElement.addEventListener("submit",(evt) => {
  evt.preventDefault();
   profileTitle.textContent = userInput.value;
   profileDescription.textContent = jobInput.value;
  closeModal(modalTypeEdit);
});



formElementAdd.addEventListener("submit", (ev) => {
  handleFormSubmitAddCard(ev, formElementAdd, templateCard, list, popupPicImage, pupupPicTitle, openedPopupPic, modalAdd);
  // closeModal(modalAdd);
});
