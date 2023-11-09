// @todo: Темплейт карточки

const templateCard = document.querySelector('#card-template').content;


// @todo: DOM узлы

const list = document.querySelector('.places__list');


// @todo: Функция создания карточки

function cardCreate(elem, removeCard) {
    const card = templateCard.querySelector('.card').cloneNode(true);
    const imgCard = card.querySelector('.card__image');
    const descriptCard = card.querySelector('.card__title');
    descriptCard.textContent = elem.name;
    imgCard.src = elem.link;
    
    const dltCardBtn = card.querySelector('.card__delete-button');
    dltCardBtn.addEventListener('click', removeCard);
    return card;
};


// @todo: Функция удаления карточки

function removeCard(event) {
   
    event.target.closest('.card').remove();
  };
  // @todo: Вывести карточки на страницу
  
  initialCards.forEach((el) => {
    const addCard = cardCreate(el, removeCard);
    list.appendChild(addCard);
  });


