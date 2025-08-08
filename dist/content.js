// src/content.ts
console.log("Content script active");
var observer = new MutationObserver(() => {
  const problemElement = document.querySelector(
    '[data-track-load="description_content"]'
  );
  const selectedLanguage = document.querySelector(
    'div.h-full > button[aria-haspopup="dialog"]'
  );
  const codeElement = document.querySelector(".cm-content.cm-lineWrapping");
  console.log(
    document.querySelector('div.h-full > button[aria-haspopup="dialog"]')
  );
  console.log("Code element:", codeElement);
  console.log("Problem element", problemElement);
  if (problemElement && selectedLanguage && codeElement) {
    observer.disconnect();
    const problem = problemElement.textContent?.trim() ?? "";
    const language = selectedLanguage?.textContent?.trim() ?? "any";
    const code = codeElement.textContent?.trim() ?? "";
    console.log("language", language);
    chrome.runtime.sendMessage(
      {
        type: "PROCESS_TEXT",
        payload: { problem, language, code }
      },
      (response) => {
        console.log("Background response:", response);
      }
    );
  } else {
    console.warn("Element not found");
  }
});
observer.observe(document.body, {
  childList: true,
  subtree: true
});
//# sourceMappingURL=content.js.map
