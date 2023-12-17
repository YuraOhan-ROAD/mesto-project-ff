import { openModal, closeModal} from "./modal.js";

export function createCard(elem, templateCard, img, title, openElementModal) {
    const card = templateCard.querySelector('.card').cloneNode(true);
    const imgCard = card.querySelector('.card__image');
    const descriptCard = card.querySelector('.card__title');
    descriptCard.textContent = elem.name;
    imgCard.src = elem.link;
    imgCard.alt = elem.name;
    picOpener(imgCard, img, title, openElementModal)

  const dltCardBtn = card.querySelector('.card__delete-button');
  dltCardBtn.addEventListener('click', removeCard); 


  const heartButton = card.querySelector('.card__like-button');
  heartButton.addEventListener('click', likeCard);

  return card;
};

//remove card
function removeCard(event) {
   
    event.target.closest('.card').remove();
  };

  // like

function likeCard (evt) {
    if(evt.target.classList.contains('card__like-button')) {
      evt.target.classList.toggle('card__like-button_is-active');
    }
  }


  export function handleFormSubmitAddCard(evt, formElementAdd, templateCard, list, popupImg, pupupTitle, openedPopupPic, modalAdd) {
    evt.preventDefault();
    const contentCard = {
      name: formElementAdd["place-name"].value,
      link: formElementAdd["link"].value,
    };
    list.prepend(
      createCard(contentCard, templateCard, popupImg, pupupTitle, openedPopupPic)
    );
    closeModal(modalAdd);
    
    formElementAdd.reset();
  }

  export function picOpener(image, popupImg, pupupTitle, openedPopupPic) {
    image.addEventListener('click', (event) => {
      const src = event.target.src
      const alt = event.target.alt
      const popupName = event.target.closest('.popup_type_image');
      popupImg.src = src
      pupupTitle.textContent = alt
      openModal(openedPopupPic);
    });
  };

