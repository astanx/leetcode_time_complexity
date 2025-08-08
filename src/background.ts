import axios from "axios";

console.log("Background script loaded");

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Received message:", message);
  if (message.type === "PROCESS_TEXT") {
    const problem = message.payload.problem;
    const language = message.payload.language;
    const code = message.payload.code;
    console.log("Received text:", problem);

    axios
      .post(
        process.env.GEMINI_API_URL!,
        {
          contents: [
            {
              parts: [
                {
                  text: `solve this problem: ${problem} with language ${language}. its my code rn ${code} so please use my classes and variables dont change them. in your answer send only code without any explanation`,
                },
              ],
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-goog-api-key": process.env.GEMINI_API_KEY!,
          },
        }
      )
      .then((response) => {
        console.log("Response:", response.data);
        // Send the response back to the content script
        sendResponse({ result: response.data });
      })
      .catch((error) => {
        console.error("Error:", error.response?.data || error.message);
        sendResponse({ error: "Request error" });
      });

    return true;
  }
});
