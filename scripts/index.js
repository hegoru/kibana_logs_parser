import { App } from "./core/app.js";
import {
  removeText,
  removeAllChildNodes,
  checkElement,
  uncheckElement,
  disableElement,
  enableElement,
} from "./helpers/domHelper.js";
import { copyTextToClipboard } from "./helpers/clipboard.js";
import { separatorLong } from "./helpers/textDecorator.js";
import { createFilter } from "./components/filter.js";
import { actionPopularFilters } from "./data.js";
import { isJSON } from "./helpers/jsonValidator.js";
import { createPopup } from "./components/popup.js";

const app = new App();
app.filtersFieldsetWasChanged = false;

const filters = [];

const DOMSwitch = document.querySelector(".switch__element");
const DOMRawLogsForm = document.forms[0];
const DOMParsedLogsForm = document.forms[1];

const init = () => {
  uncheckElement(DOMSwitch);
  disableElement(DOMSwitch);
  DOMSwitch.classList.add("switch--disabled");

  removeText(DOMParsedLogsForm.elements["parsed-logs"]);

  createPopup("AAA");
};

init();

const getCheckedFilters = () => {
  return filters.filter((filter) => filter.checked === true);
};

const updateParsedLogs = () => {
  let processedParsedLogs = "";

  for (const checkedFilter of getCheckedFilters()) {
    const appFilter = app.filters.find(
      (filter) => filter === checkedFilter.name
    );
    processedParsedLogs += `${appFilter}\n${app.parsedLogsSource[appFilter]}\n\n`;
  }

  DOMParsedLogsForm.elements["parsed-logs"].value = processedParsedLogs;
};

const setActionName = (name) => {
  document.querySelector(".action__name").textContent = name;
};

const uncheckAllFilters = () => {
  filters.forEach((filter) => {
    uncheckElement(filter);
  });
};

const checkAllFilters = () => {
  filters.forEach((filter) => {
    checkElement(filter);
  });
};

// TODO: fix checking filters with only 1 loop
const checkCustomFilters = (customFilters) => {
  uncheckAllFilters();

  customFilters.forEach((customFilter) => {
    const foundFilter = filters.find((filter) => filter.name === customFilter);
    checkElement(foundFilter);
  });

  // loop1: for (let i = 0; i < filters.length; i++) {
  //   loop2: for (let j = 0; j < customFilters.length; j++) {
  //     if (filters[i].name !== customFilters[j]) {
  //       console.log(
  //         "Filter: ",
  //         filters[i].name,
  //         "Popular fitler: ",
  //         customFilters[j],
  //         filters[i].name === customFilters[j]
  //       );
  //       uncheckElement(filters[i]);
  //     } else {
  //       continue loop1;
  //     }
  //   }
  // }

  // filters.forEach((filter) => {
  //   currentAction.popularFilters.forEach((popularFilter) => {
  //     console.log(
  //       "Filter: ",
  //       filter.name,
  //       "Popular fitler: ",
  //       popularFilter,
  //       filter.name === popularFilter
  //     );
  //     if (filter.name !== popularFilter) {
  //       uncheckElement(filter);
  //     }
  //   });
  // });
};

const getActionByName = (actionName) =>
  actionPopularFilters.find((action) => action.name === actionName);

const toggleSwitch = (ev) => {
  if (ev.currentTarget.checked) {
    checkCustomFilters(
      getActionByName(app.parsedLogsSource["Action"]).popularFilters
    );
  } else {
    checkAllFilters();
  }

  updateParsedLogs();
};
DOMSwitch.addEventListener("change", toggleSwitch, false);

const rawLogsAreValid = (logs) => {
  if (logs.length < 1) {
    console.error("Raw logs form should not be empty");
    return false;
  }

  if (!isJSON(logs)) {
    console.error("Raw logs in JSON format expected");
    return false;
  }

  return true;
};

const onRawLogsFormSubmit = (ev) => {
  ev.preventDefault();

  if (!rawLogsAreValid(DOMRawLogsForm.elements["raw-logs"].value)) {
    console.log("logs are invalid");
    return;
  }

  app.rawLogs = DOMRawLogsForm.elements["raw-logs"].value;
  app.parseRawLogs();

  app.filters = app.activeFilters = Object.keys(app.parsedLogsSource);
  app.activeFilters.sort();

  // if (filters.length > 0) {
  //   removeAllChildNodes(document.querySelector("fieldset__container"));
  // }
  app.filters.forEach((filter) => {
    createFilter(
      document.querySelector(".fieldset__container"),
      filter,
      filters,
      { checked: true },
      updateParsedLogs
    );
  });

  enableElement(DOMSwitch);

  setActionName(app.parsedLogsSource["Action"]);

  updateParsedLogs();
};
DOMRawLogsForm.addEventListener("submit", onRawLogsFormSubmit, false);

const parsedLogsAreValid = () => {
  if (DOMParsedLogsForm.elements["parsed-logs"].value.length < 1) {
    console.error("Parsed logs field is empty!");
    return false;
  }

  return true;
};

const onParsedLogsFormSubmit = (ev) => {
  ev.preventDefault();

  if (!parsedLogsAreValid()) {
    createPopup("Parsed logs are invalid");
    console.error("Parsed logs are invalid");
    return;
  }

  const decoratedParsedLogs = `${separatorLong()}\nLogs:\n${separatorLong()}\n\n${
    DOMParsedLogsForm.elements["parsed-logs"].value
  }`;
  copyTextToClipboard(decoratedParsedLogs);
};
DOMParsedLogsForm.addEventListener("submit", onParsedLogsFormSubmit, false);
