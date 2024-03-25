import {closeModal, openModal } from './modal.js'; 
import {deleteCard, addLike, deleteLike} from './api.js'; 

const template = document.querySelector('#card-template').content;
const popupTypeDelete = document.querySelector('.popup_type_delete');
const popupQuestionButton = document.querySelector('.question__remove_button');
const deletedModalClosed = document.querySelector('.deleted-modal-closed');

export function createCard(element, removeCard, picOpener) {
    const card = template.querySelector('.card').cloneNode(true);
    const imgCard = card.querySelector('.card__image');
    const descriptCard = card.querySelector('.card__title');
    const dltCardBtn = card.querySelector('.card__delete-button');
    const likeCount = card.querySelector('.card__like-count');
    const heartButton = card.querySelector('.card__like-button');

    if(element.card.owner._id !== element.user._id) {
      dltCardBtn.remove();
    }
    descriptCard.textContent = element.card.name;
    imgCard.src = element.card.link;
    imgCard.alt = element.card.name;
    likeCount.textContent = element.card.likes.length;
    
    element.card.likes.forEach(el => {
      if (el._id === element.user._id) {
        heartButton.classList.add('card__like-button_is-active');
      }
    });

    imgCard.addEventListener('click', picOpener);
  
    dltCardBtn.addEventListener('click', (e) => {
    questionRemoveCard(e, element);
    });
  
  heartButton.addEventListener('click',(evt) => {
    likeCard(evt, element.card._id, likeCount)
  });
  return card;
};

function questionRemoveCard(e, element) {
  openModal(popupTypeDelete);
  popupQuestionButton.addEventListener('click', () => {
    popupQuestionClick(e, element)
  });
  deletedModalClosed.addEventListener('click', deletedModalClosedClick);
};

function popupQuestionClick (e, element)  {
 deleteCard(element.card._id);
 closeModal(popupTypeDelete);
 popupQuestionButton.removeEventListener('click', popupQuestionClick);
 deletedModalClosed.removeEventListener('click', deletedModalClosedClick);
 removeCard(e);
};

function deletedModalClosedClick ()  {
 popupQuestionButton.removeEventListener('click', popupQuestionClick);
 deletedModalClosed.removeEventListener('click', deletedModalClosedClick);
};

//remove card
export function removeCard(event) {
    event.target.closest('.card').remove();
  };
  // like
  function likeCard (evt, id, likeCount) {
    if(evt.target.classList.toggle('card__like-button_is-active')) {
      addLike(id).then(res => res.json())
      .then((result) => {
        likeCount.textContent = result.likes.length  
      }); 
    } else {
    deleteLike(id)
    .then((res) => res.json())
    .then((result) => {
      likeCount.textContent = result.likes.length  
    });
    }
  };


 

