window.onload = function() {
  var codeElements = document.querySelectorAll('code')
  codeElements.forEach(function(codeElement, i) {
    formatCode(codeElement)
  })

  var xmp = document.querySelectorAll('xmp')
  xmp.forEach(function(xmp, i) {
    var pattern = xmp.innerHTML.match(/\s*\n[\t\s]*/)
    var newHtml = xmp.innerHTML.replace(new RegExp(pattern, "g"),'\n')
    var code = document.createElement('code')

    if (typeof hljs !== 'undefined') {
      code.innerHTML = hljs.highlightAuto(newHtml).value
      xmp.parentNode.insertBefore(code, xmp.nextSibling)
      xmp.parentNode.removeChild(xmp)
    } else {
      xmp.innerHTML = newHtml

    }

  })
}

function formatCode(obj) {
  if(obj.parentNode.nodeName !== 'P') {
    var pattern = obj.innerHTML.match(/\s*\n[\t\s]*/)
    obj.innerHTML = obj.innerHTML.replace(new RegExp(pattern, "g"),'\n')

    if (typeof hljs !== 'undefined')
      obj.innerHTML = hljs.highlightAuto(obj.innerHTML).value
  }
}

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
