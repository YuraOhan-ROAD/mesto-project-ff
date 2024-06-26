import { showInputError } from './validation.js';




const apiConfig = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-9',
    headers: {
      authorization: '6ad6acad-99eb-47bd-a368-4655cfbe89ff',
      'Content-Type': 'application/json'
    }
  }

  function checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Не удалось получить данные: ${res.status}`);
  }

  function checkLinkType(link, avatarErrorElement, editAvatarInput, validationConfig) {
    return fetch(link, {
      method: 'HEAD'
    })
      .then((res) => {
        if (res.ok) {
          if (res.headers.has('Content-Type')) {
            const contentType = res.headers.get('Content-Type');
            if (contentType.includes('image')) {
              return true;
            } else {
              showInputError(avatarErrorElement, editAvatarInput, 'Ссылка не ведет на изображение.', validationConfig);
            }
          } else {
            showInputError(avatarErrorElement, editAvatarInput, 'Не удалось определить тип контента.', validationConfig);
          }
        }
        showInputError(avatarErrorElement, editAvatarInput, 'Не удалось получить данные.', validationConfig);
        return false;
      }).catch((err) => {
        console.log(err)
        return false;
      });
  }
  
  function getUserData() {
     return fetch(apiConfig.baseUrl + '/users/me', {
          headers: apiConfig.headers
      }).then((res) => {
        return checkResponse(res);
      }).catch((err)=> {
        console.log(err)
      });
  }
  function updateUserData(userName, userDesctiption) {
    return fetch(apiConfig.baseUrl + '/users/me', {
          method: 'PATCH',
          headers: apiConfig.headers,
          body: JSON.stringify({
              name: userName,
              about: userDesctiption
          })
      }).then((res) => {
        return checkResponse(res);
      }).catch((err)=> {
        console.log(err)
      });
  }
  

  function getCardsData() {
    return fetch(apiConfig.baseUrl + '/cards', {
          method: 'GET',
          headers: apiConfig.headers,
      }).then((res) => {
        return checkResponse(res);
      }).catch((err)=> {
        console.log(err)
      });
    }

  function addNewCard(cardName, cardLink) {
    return fetch(apiConfig.baseUrl + '/cards', {
          method: 'POST',
          headers: apiConfig.headers,
          body: JSON.stringify({
            name:cardName,
            link:cardLink
          })
      }).then((res) => {
        return checkResponse(res);
      }).catch((err)=> {
        console.log(err)
      });
      
  }

  function cardDeleteRequest(cardId) {
    return fetch(`${apiConfig.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: apiConfig.headers
    }).then((res) => {
           return checkResponse(res);
         }).catch((err)=> {
          console.log(err)
        });
  }

  function addLike(id) {
    return fetch(`${apiConfig.baseUrl}/cards/likes/${id}`, {
      method: 'PUT',
      headers: apiConfig.headers
    }).then((res) => {
      return checkResponse(res);
    }).catch((err)=> {
      console.log(err)
    });
  }

  function deleteLike(id) {
    return fetch(`${apiConfig.baseUrl}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: apiConfig.headers
    }).then((res) => {
      return checkResponse(res);
    }).catch((err)=> {
      console.log(err)
    });
  }

  function setNewAvatar(link) {
    return fetch(apiConfig.baseUrl + '/users/me/avatar', {
      method: 'PATCH',
      headers: apiConfig.headers,
      body: JSON.stringify({
        avatar: link
      })
    }).then((res) => {
      return checkResponse(res);
    }).catch((err)=> {
      console.log(err)
    });
  }



  function loadData() {
     return Promise.all([getCardsData(), getUserData()]);
  }

  export{checkResponse, setNewAvatar, updateUserData, getCardsData, getUserData, loadData, addNewCard, cardDeleteRequest, addLike, deleteLike, checkLinkType}








  