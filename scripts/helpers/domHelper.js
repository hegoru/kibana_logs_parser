export const DOMElementHasChild = (elem) => {
  return elem.firstChild;
};

export const removeText = (elem) => {
  if (elem.textContent) {
    elem.textContent = "";
  }

  if (elem.value) {
    elem.value = "";
  }
};

export const removeAllChildNodes = (elem) => {
  while (elem.firstChild) {
    elem.removeChild(elem.firstChild);
  }
};

export const checkElement = (elem) => {
  elem.checked = true;
};
export const uncheckElement = (elem) => {
  elem.checked = false;
};
export const toggleCheckElement = (elem) => {
  elem.checked = !elem.checked;
};

export const enableElement = (elem) => {
  elem.disabled = false;
};
export const disableElement = (elem) => {
  elem.disabled = true;
};
export const toggleEnableElement = (elem) => {
  elem.disabled = !elem.disabled;
};
