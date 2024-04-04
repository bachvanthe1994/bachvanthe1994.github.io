function yourFunction() {
  // If absolute URL from the remote server is provided, configure the CORS
  // header on that server.
  var url =
    "https://partner.vnticketonline.vn/Resource/PDF/Ticket/20240511/9Y5IHV/69052197/80/A142899F45C799AF15DD2A7EFFED3F23/1712223136";

  // Loaded via <script> tag, create shortcut to access PDF.js exports.
  var { pdfjsLib } = globalThis;

  // The workerSrc property shall be specified.
  pdfjsLib.GlobalWorkerOptions.workerSrc = "pdf.worker.mjs";

  // Asynchronous download of PDF
  var loadingTask = pdfjsLib.getDocument(url);
  loadingTask.promise.then(
    function(pdf) {
      console.log("PDF loaded");

      // Fetch the first page
      var pageNumber = 1;
      pdf.getPage(pageNumber).then(function(page) {
        console.log("Page loaded");

        var scale = 1.5;
        var viewport = page.getViewport({ scale: scale });

        // Prepare canvas using PDF page dimensions
        var canvas = document.getElementById("the-canvas");
        var context = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        // Render PDF page into canvas context
        var renderContext = {
          canvasContext: context,
          viewport: viewport,
        };
        var renderTask = page.render(renderContext);
        renderTask.promise.then(function() {
          console.log("Page rendered");
        });
      });
    },
    function(reason) {
      // PDF loading error
      console.error(reason);
    }
  );
}

window.addEventListener
  ? window.addEventListener("load", yourFunction, false)
  : window.attachEvent && window.attachEvent("onload", yourFunction);
