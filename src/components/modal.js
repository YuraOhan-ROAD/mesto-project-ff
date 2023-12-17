export function openModal(modal) {
    modal.classList.add("popup_is-opened");
    modal.classList.remove("popup_is-animated")
    document.addEventListener("keydown", closeEsc);
    modal.addEventListener("mousedown", closeOverlay);
}

export function closeModal(modal) {
    modal.classList.remove("popup_is-opened");
    modal.classList.add("popup_is-animated")
    document.removeEventListener("keydown", closeEsc);
    modal.removeEventListener("mousedown", closeOverlay);
}

function closeEsc(evt) {
    if (evt.key === "Escape") {
      const modalOpened = document.querySelector(".popup_is-opened");
      closeModal(modalOpened);
    }
  }

  function closeOverlay(ev) {
    if (ev.target === ev.currentTarget) {
      closeModal(ev.currentTarget);
    }
  }