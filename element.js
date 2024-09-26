(async function() {
  let currentDomain = new URL(window.location.href).hostname;

  // Check if styles should be applied
  let result = await browser.storage.local.get(currentDomain);
  let isEnabled = result[currentDomain] || false;

  if (isEnabled) {
    let link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = browser.runtime.getURL("element.css");
    document.head.appendChild(link);
  }
})();
