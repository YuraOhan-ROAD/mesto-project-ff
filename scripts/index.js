//edit button func
let edit = document.querySelector('.profile__edit-button');
let modal = document.querySelector('.popup');
let modalAdd = document.querySelector('.popup-add');

//close buttom func
let closer = document.querySelectorAll('.popup__button-cross');

//profile username func
let username = document.querySelector('.profile__user');
let job = document.querySelector('.profile__job-title');

//popUP input
let userInput = document.querySelector('.popup .popup__input_data_username');
let jobInput = document.querySelector('.popup .popup__input_data_job');
let nameInputAdd = document.querySelector('.popup-add .popup__input_data_username');
let linkInputAdd = document.querySelector('.popup-add .popup__input_data_job');

let formElement = document.querySelector('.popup .popup__description');
let formElementAdd = document.querySelector('.popup-add .popup__description');

let cardAdd = document.querySelector('.profile__add-button');




edit.addEventListener("click",() => {
    modal.classList.add("popup_opened");
    userInput.value = username.textContent;
    jobInput.value = job.textContent;
});

cardAdd.addEventListener("click",() => {
    modalAdd.classList.add("popup_opened");
});



closer.forEach((el) =>{
  el.addEventListener("click", closePopup);
});

formElement.addEventListener("submit", handleFormSubmit);

formElementAdd.addEventListener("submit", (e) =>{
  e.preventDefault();
  if (nameInputAdd.value && linkInputAdd.value) {
    let obj = {
      name: nameInputAdd.value,
      link: linkInputAdd.value
    }

    addCard(obj);
    nameInputAdd.value = '';
    linkInputAdd.value = ''; 
    closePopup();
  } 
});


//adding new card 
function addCard(obj) {
  const cards = document.getElementById('cards');
  const template = document.getElementById('elements').content;
  const elementsCardfirst = document.querySelector('.elements__card')
  const elementsCard = template.querySelector('.elements__card').cloneNode(true);
      elementsCard.querySelector('.elements__text').textContent = obj.name;
      elementsCard.querySelector('.elements__image').src = obj.link;
      cards.insertBefore(elementsCard ,elementsCardfirst);
      addHeart(); 
      deleteCard();
      picOpener();
}

function handleFormSubmit(evt) {
    evt.preventDefault();
    username.textContent = userInput.value;
    job.textContent = jobInput.value;
     closePopup();
}


function closePopup() {
    modal.classList.remove("popup_opened");
    modalAdd.classList.remove("popup_opened");

}

//Вывести карточки на страницу
function createCard(array) {
    const template = document.getElementById('elements').content;
    const cards = document.getElementById('cards');  
    for (let i = 0; i < array.length; i++) {
      const elementsCard = template.querySelector('.elements__card').cloneNode(true);
      elementsCard.querySelector('.elements__text').textContent = array[i].name;
      elementsCard.querySelector('.elements__image').src = array[i].link;
      cards.appendChild(elementsCard);
    }
};
createCard(initialCards);
//Создание like 
function addHeart() {
  const heartButtons = document.querySelectorAll('.elements__heart-button');
  heartButtons.forEach((button) => {
    button.addEventListener('click', addHeartButton);
  });
}

function addHeartButton(event) {
  event.target.classList.toggle('elements__heart-button_active');
};
addHeart()



function deleteCard() {
  const trashButtons = document.querySelectorAll('.elements__delete-button');
  trashButtons.forEach((button) => {
      button.addEventListener('click', removeCardHandle)
  })
  
}
function removeCardHandle(event) {
  event.target.closest('.elements__card').remove();
};
deleteCard()



function picOpener() {
  let openedPopupPic = document.querySelector('.popup-pic');
  let popupPicImage = document.querySelector('.popup-pic__image');
  let popupImg = document.querySelectorAll('.elements__image');
  let closePopupPicButton = document.querySelector('.popup-pic__button-cross');
  let pupupPicTitle = document.querySelector('.popup-pic__title');
  
  popupImg.forEach((img) => {
    img.addEventListener('click', (event) => {
      let src = event.target.src
      let popupName = event.target.nextElementSibling.children[0].innerText
      
      openedPopupPic.style.visibility = 'visible'
      popupPicImage.src = src
      pupupPicTitle.textContent = popupName
    });
  })
  
  closePopupPicButton.addEventListener("click",() => {
    openedPopupPic.style.visibility = 'hidden'
  });
};
picOpener();


