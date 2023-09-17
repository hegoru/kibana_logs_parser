export const createFilter = (parent, name, arr, opts = {}, callback) => {
  const filterContainer = document.createElement("div");

  const filterCheckbox = document.createElement("input");
  filterCheckbox.type = "checkbox";
  filterCheckbox.name = name;
  filterCheckbox.checked = opts.checked;
  filterCheckbox.value = name;
  filterCheckbox.id = name;

  const filterLabel = document.createElement("label");
  filterLabel.htmlFor = name;
  filterLabel.appendChild(document.createTextNode(name));

  const onFilterCheck = () => {
    callback();
  };
  filterCheckbox.addEventListener("change", onFilterCheck, false);

  filterContainer.appendChild(filterCheckbox);
  filterContainer.appendChild(filterLabel);

  parent.appendChild(filterContainer);
  arr.push(filterCheckbox);

  return filterContainer;
};

const createPopupImage = (app, src) => {
  const popupImageContainer = document.createElement("div");
  popupImageContainer.classList.add("popup__img");

  const popupImage = document.createElement("img");
  popupImage.src = src;

  popupImageContainer.appendChild(popupImage);

  return popupImageContainer;
};

export const createPopup = (text, opts = {}) => {
  const popup = document.createElement("div");
  popup.classList.add("popup");

  const popupWrapper = document.createElement("div");
  popupWrapper.classList.add("popup__wrapper");
  popup.appendChild(popupWrapper);

  switch (opts.status) {
    case "success":
      break;
    case "fail":
      break;
    default:
      console.log("Default");
      break;
  }

  return popup;
};

export const createSuccessPopup = (text, opts = {}) => {
  const popupContainer = document.createElement("div");
  popupContainer.classList.add("popup");

  const popupImage = createPopupImage();
  popupContainer.appendChild(popupImage);

  return popupContainer;
};

// const createFieldset = (fieldsetName) => {
//   const fieldset = document.createElement("fieldset");
//   fieldset.classList.add("fieldset-" + fieldsetName);

//   return fieldset;
// };
