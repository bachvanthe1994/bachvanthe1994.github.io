function yourFunction() {
  var url_string = window.location.href;
  var url = new URL(url_string);
  var pdfUrl = url.searchParams.get("pdfUrl");
  pdfUrl = decodeURI(pdfUrl);
  console.log("pdfUrl", pdfUrl);
  let element = document.getElementById("pdf-iframe");
  element.src = pdfUrl;
}

window.addEventListener
  ? window.addEventListener("load", yourFunction, false)
  : window.attachEvent && window.attachEvent("onload", yourFunction);
