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
