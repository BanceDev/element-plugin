document.addEventListener("DOMContentLoaded", async () => {
  const toggleButton = document.getElementById("toggleStyles");

  // Get the active tab
  let [tab] = await browser.tabs.query({ active: true, currentWindow: true });
  let currentDomain = new URL(tab.url).hostname;

  // Check if the styles are already enabled on this site
  let result = await browser.storage.local.get(currentDomain);
  let isEnabled = result[currentDomain] || false;

  toggleButton.textContent = isEnabled ? "Disable Element" : "Enable Element";

  // Handle the button click
  toggleButton.addEventListener("click", async () => {
    // Toggle the enabled state
    isEnabled = !isEnabled;

    // Save the preference in local storage
    await browser.storage.local.set({ [currentDomain]: isEnabled });

    // Inject or remove the CSS
    if (isEnabled) {
      browser.scripting.insertCSS({ target: { tabId: tab.id }, files: ["element.css"] });
    } else {
      browser.scripting.removeCSS({ target: { tabId: tab.id }, files: ["element.css"] });
    }

    await browser.tabs.reload(tab.id);

    toggleButton.textContent = isEnabled ? "Disable Element" : "Enable Element";
  });
});

