import '../pages/index.css';
import {createCard,remCard} from './card.js';
import { closeModal, openModal } from './modal.js';
import {checkResponse, addNewCard, loadData, updateUserData, setNewAvatar,checkLinkType,cardDeleteRequest} from './api.js';
import {enableValidation, clearValidation, checkFormValidity} from './validation.js';

const list = document.querySelector('.places__list');
const modalTypeEdit = document.querySelector('.popup_type_edit');
const modalProfileOpen = document.querySelector('.profile__edit-button');
const popups = document.querySelectorAll('.popup');
const modalsClose = document.querySelectorAll('.popup__close');
const btnAddCard = document.querySelector('.profile__add-button');
const modalAdd = document.querySelector(".popup_type_new-card");
const profileImage = document.querySelector('.profile__image');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileForm = document.forms.edit_profile
const userInput = profileForm.elements.name
const jobInput = profileForm.elements.description
const formElementAdd = document.forms["new-place"];
const openedPopupPic = document.querySelector('.popup_type_image');
const popupPicImage = document.querySelector('.popup__image');
const popupPicTitle = document.querySelector('.popup__caption');  
const modalEditAvatar = document.querySelector('.popup_type_edit-avatar');
const profileAvatarEditButton = document.querySelector('.profile__image-edit-button');
const formEditAvatar = document.forms['edit-avatar'];
const editAvatarInput = formEditAvatar.elements.link;


const cardDeletePopup = document.querySelector('.popup_type_delete');
const deleteButton = cardDeletePopup.querySelector('.popup__button');
let cardToRemoveElement;
let cardId;

function removeCard(cardElement) {
  cardDeleteRequest(cardId.card["_id"])
  .then(() => {
      cardElement.remove();
    });
}

function handleRemove(cardElement, cardData) {
  cardToRemoveElement = cardElement;
  cardId = cardData;
  openModal(cardDeletePopup);
}

deleteButton.addEventListener('click', () => {
  if (cardToRemoveElement) {
    removeCard(cardToRemoveElement);
    closeModal(cardDeletePopup);
  }
});


const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};


loadData().then((res) => {
  if (!res) return;
  if (res[0].length !== 0) {
    res[0].forEach((el) => {
      const addCard = createCard({card: el, user: res[1]},handleRemove, picOpener);
      list.appendChild(addCard)
    })
  };
  setUserData(res[1].avatar)
  profileTitle.textContent = res[1].name;
   profileDescription.textContent = res[1].about;
});

function picOpener(event) {
  popupPicImage.src = event.target.src
  popupPicImage.alt = event.target.alt
  popupPicTitle.textContent = event.target.alt
    openModal(openedPopupPic);
}
function editButtonLoading(buttonElement) {
  if (buttonElement.classList.contains('popup__button_loading')) {
    buttonElement.classList.remove('popup__button_loading');
    buttonElement.textContent = 'Сохранить';
  } else {
    buttonElement.classList.add('popup__button_loading');
    buttonElement.textContent = 'Сохранить...';
  }
}

  function handleEditAvatarForm(evt) {
    evt.preventDefault();
    const link = editAvatarInput.value;
    const err = document.querySelector('.avatar-link-input-error')
    editButtonLoading(evt.target.querySelector('.popup__button'));
    checkLinkType(link, err, editAvatarInput, validationConfig);
    setNewAvatar(link)
      .then((res) => {

        if (res) {
          return res;
        } else {
          return Promise.reject(`Не удалось получить данные: ${res?.status}`);
        }
        
      })
      .then((result) => {
        setUserData(result.avatar);
        closeModal(modalEditAvatar);
      }).catch((err) => {
        console.log(err);
      }).finally(() => {
        editButtonLoading(evt.target.querySelector('.popup__button'));
      });
    
      
  }
  formEditAvatar.addEventListener('submit', handleEditAvatarForm)
  profileAvatarEditButton.addEventListener('click', () => {
    openModal(modalEditAvatar)
  } );




function setUserData(userAvatar) {
  profileImage.style = `background-image: url(${userAvatar})`;
}



modalProfileOpen.addEventListener("click",() => {
  openModal(modalTypeEdit);
   userInput.value = profileTitle.textContent;
   jobInput.value = profileDescription.textContent;
});

btnAddCard.addEventListener("click", function () {
  openModal(modalAdd);
});

formElementAdd.addEventListener("submit", (ev) => {
  ev.preventDefault();
  editButtonLoading(ev.target.querySelector('.popup__button'));
  const contentCard = {
    name: formElementAdd["place-name"].value,
    link: formElementAdd["link"].value,
  };
  addNewCard(contentCard.name, contentCard.link).then((res) => {
    list.prepend(
      createCard({card: res, user: res.owner}, handleRemove, picOpener));
    closeModal(modalAdd);
    editButtonLoading(ev.target.querySelector('.popup__button'));
    formElementAdd.reset();  
  });
});

modalsClose.forEach((element, index) => {
  element.addEventListener("click",() => {
    closeModal(popups[index]);
  });
})

profileForm.addEventListener("submit",(evt) => {
  evt.preventDefault();
  editButtonLoading(evt.target.querySelector('.popup__button'));
  updateUserData(userInput.value,jobInput.value)
  .then((res) => {
  profileTitle.textContent = res.name;
   profileDescription.textContent = res.about;

  closeModal(modalTypeEdit);
  editButtonLoading(evt.target.querySelector('.popup__button'));
  });
});

enableValidation(validationConfig);