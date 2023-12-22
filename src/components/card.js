const template = document.querySelector('#card-template').content;

export function createCard(element, removeCard, likeCard, picOpener) {
    const card = template.querySelector('.card').cloneNode(true);
    const imgCard = card.querySelector('.card__image');
    const descriptCard = card.querySelector('.card__title');
    descriptCard.textContent = element.name;
    imgCard.src = element.link;
    imgCard.alt = element.name;

    imgCard.addEventListener('click', picOpener)

  const dltCardBtn = card.querySelector('.card__delete-button');
  dltCardBtn.addEventListener('click', removeCard); 


  const heartButton = card.querySelector('.card__like-button');
  heartButton.addEventListener('click', likeCard);

  return card;
};


//remove card
export function removeCard(event) {
    event.target.closest('.card').remove();
  };

  // like

export function likeCard (evt) {
    if(evt.target.classList.contains('card__like-button')) {
      evt.target.classList.toggle('card__like-button_is-active');
    }
  }



 

