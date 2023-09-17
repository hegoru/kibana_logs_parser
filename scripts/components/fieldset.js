export const createFieldset = (fieldsetName) => {
  const fieldset = document.createElement("fieldset");
  fieldset.classList.add("fieldset-" + fieldsetName);

  return fieldset;
};
