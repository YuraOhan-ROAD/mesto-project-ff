
import {addLike, deleteLike} from './api.js'; 

const template = document.querySelector('#card-template').content;
// const popupTypeDelete = document.querySelector('.popup_type_delete');
// const popupQuestionButton = document.querySelector('.question__remove_button');
// const deletedModalClosed = document.querySelector('.deleted-modal-closed');

export function createCard(element, handleRemove, picOpener) {
    const card = template.querySelector('.card').cloneNode(true);
    const imgCard = card.querySelector('.card__image');
    const descriptCard = card.querySelector('.card__title');
    const dltCardBtn = card.querySelector('.card__delete-button');
    const likeCount = card.querySelector('.card__like-count');
    const heartButton = card.querySelector('.card__like-button');

    if(element.card.owner._id !== element.user._id) {
      dltCardBtn.remove();
    } else {
      dltCardBtn.addEventListener('click', (e) => {
        handleRemove(card, element);
        });
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
  
  
  
  heartButton.addEventListener('click',(evt) => {
    likeCard(evt, element.card._id, likeCount)
  });
  return card;
};


  
  // like
  function likeCard (evt, id, likeCount) {
  const likeMethod = evt.target.classList.contains('card__like-button_is-active') ? deleteLike: addLike;
likeMethod(id)
        .then((result) => {
           likeCount.textContent = result.likes.length; 
           evt.target.classList.toggle("card__like-button_is-active"); 
        })
.catch(err => console.log(err));
}

 
