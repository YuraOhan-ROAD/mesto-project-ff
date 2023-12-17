import '../pages/index.css';
import { initialCards } from './cards.js';
import {createCard,handleFormSubmitAddCard} from './card.js';
import { closeModal, openModal } from './modal.js';

const templateCard = document.querySelector('#card-template').content;
const list = document.querySelector('.places__list');
const modalTypeEdit = document.querySelector('.popup_type_edit');
const modalProfileOpen = document.querySelector('.profile__edit-button');
const popups = document.querySelectorAll('.popup');
const modalsClose = document.querySelectorAll('.popup__close');
const btnAddCard = document.querySelector('.profile__add-button');
const modalAdd = document.querySelector(".popup_type_new-card");
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileForm = document.forms.edit_profile
const userInput = profileForm.elements.name
const jobInput = profileForm.elements.description
const formElementAdd = document.forms["new-place"];
const openedPopupPic = document.querySelector('.popup_type_image');
const popupPicImage = document.querySelector('.popup__image');
const popupPicTitle = document.querySelector('.popup__caption');  

  
initialCards.forEach((el) => {
  const obj = {
    element: el,
    template: templateCard,
    picImage: popupPicImage,
    picTitle: popupPicTitle,
    openedPopupPic
  }
  const addCard = createCard(obj);
  list.appendChild(addCard);
});      

modalProfileOpen.addEventListener("click",() => {
  openModal(modalTypeEdit);
   userInput.value = profileTitle.textContent;
   jobInput.value = profileDescription.textContent;
});

btnAddCard.addEventListener("click", function () {
  openModal(modalAdd);
});

modalsClose.forEach((element, index) => {
  element.addEventListener("click",() => {
    closeModal(popups[index]);
  });
})

profileForm.addEventListener("submit",(evt) => {
  evt.preventDefault();
   profileTitle.textContent = userInput.value;
   profileDescription.textContent = jobInput.value;
  closeModal(modalTypeEdit);
});



formElementAdd.addEventListener("submit", (ev) => {
  handleFormSubmitAddCard(ev, formElementAdd, templateCard, list, popupPicImage, pupupPicTitle, openedPopupPic, modalAdd);
});