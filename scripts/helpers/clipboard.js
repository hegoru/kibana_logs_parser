export const copyTextToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    console.log("Copied successfully");
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
};
