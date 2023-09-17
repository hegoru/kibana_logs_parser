export const separatorShort = (char = "=") => {
  let separator = "";

  for (let i = 0; i < 20; i++) {
    separator += char;
  }

  return separator;
};

export const separatorLong = (char = "=") => {
  let separator = "";

  for (let i = 0; i < 40; i++) {
    separator += char;
  }

  return separator;
};

export const separatorCustom = (char = "=", opts = {}) => {
  let separator = "";

  for (let i = 0; i < opts.charactersAmount; i++) {
    separator += char;
  }

  return separator;
};
