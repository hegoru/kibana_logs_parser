export const createPopupImage = (app, src) => {
  const popupImageContainer = document.createElement("div");
  popupImageContainer.classList.add("popup__img");

  const popupImage = document.createElement("img");
  popupImage.src = src;

  popupImageContainer.appendChild(popupImage);

  return popupImageContainer;
};

export const createPopup = (text, opts = {}, callback) => {
  const popup = document.createElement("div");
  popup.classList.add("popup");

  const popupWrapper = document.createElement("div");
  popupWrapper.classList.add("popup__wrapper");
  popup.appendChild(popupWrapper);

  const popupBody = document.createElement("div");
  popupBody.classList.add("popup__container");
  popupWrapper.appendChild(popupBody);

  const popupContext = document.createElement("span");
  popupContext.classList.add("popup__context");
  popupContext.textContent = text;
  popupBody.appendChild(popupContext);

  document.querySelector(".popup-container").appendChild(popup);

  popup.addEventListener(
    "click",
    () => {
      popup.remove();
    },
    false
  );

  // switch (opts.status) {
  //   case "success":
  //     break;
  //   case "fail":
  //     break;
  //   default:
  //     console.log("Default");
  //     break;
  // }

  return popup;
};

export const createSuccessPopup = (text, opts = {}) => {
  const popupContainer = document.createElement("div");
  popupContainer.classList.add("popup");

  const popupImage = createPopupImage();
  popupContainer.appendChild(popupImage);

  return popupContainer;
};
