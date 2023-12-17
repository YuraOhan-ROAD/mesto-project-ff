export function openModal(modal) {
    modal.classList.add("popup_is-opened");
    modal.classList.remove("popup_is-animated")
    document.addEventListener("keydown", closeEsc);
}

export function closeModal(modal) {
    modal.classList.remove("popup_is-opened");
    modal.classList.add("popup_is-animated")
    document.removeEventListener("keydown", closeEsc);
}

function closeEsc(evt) {
    if (evt.key === "Escape") {
      const modalOpened = document.querySelector(".popup_is-opened");
      closeModal(modalOpened);
    }
  }