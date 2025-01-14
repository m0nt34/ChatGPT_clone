export const copyToClipboard = (text: string) => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).catch((error) => {
      console.error("Failed to copy text: ", error);
    });
  } else {
    console.error("Clipboard API not supported");
  }
};
