function yourFunction() {
  var url_string = window.location.href;
  var url = new URL(url_string);
  var pdfUrl = url.searchParams.get("pdfUrl");
  pdfUrl = decodeURI(pdfUrl);
  console.log("pdfUrl", pdfUrl);
  // let element = document.getElementById("pdf-iframe");
  // element.src = pdfUrl;

  // If absolute URL from the remote server is provided, configure the CORS
  // header on that server.
  var url =
    "https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/examples/learning/helloworld.pdf";

  fetch(url, {
    cache: "no-cache",
    mode: "no-cors",
    method: "GET",
    redirect: "follow",
  })
    .then(async (res) => {
      console.log("res", res);
      var blob = await res.blob();
      var reader = new FileReader();
      reader.addEventListener(
        "load",
        function () {
          console.log("success", reader.result);
          // setImageBase64(reader.result as any);
        },
        false
      );
      reader.onerror = (err) => {
        console.log("reader.onerror 1", err, src);
        // if (props.onError) {
        //   props.onError();
        // }
      };
      reader.readAsDataURL(blob);
    })
    .catch((err) => {
      console.log("fetch.error 2", err, src);
    });

  var url =
    "https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/examples/learning/helloworld.pdf";

  // Loaded via <script> tag, create shortcut to access PDF.js exports.
  var { pdfjsLib } = globalThis;

  // The workerSrc property shall be specified.
  pdfjsLib.GlobalWorkerOptions.workerSrc = "pdf.worker.mjs";

  // Asynchronous download of PDF
  var loadingTask = pdfjsLib.getDocument(url);
  loadingTask.promise.then(
    function (pdf) {
      console.log("PDF loaded");

      // Fetch the first page
      var pageNumber = 1;
      pdf.getPage(pageNumber).then(function (page) {
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
        renderTask.promise.then(function () {
          console.log("Page rendered");
        });
      });
    },
    function (reason) {
      // PDF loading error
      console.error(reason);
    }
  );
}

window.addEventListener
  ? window.addEventListener("load", yourFunction, false)
  : window.attachEvent && window.attachEvent("onload", yourFunction);
