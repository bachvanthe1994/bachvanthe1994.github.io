window.onload = (event) => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  console.log("params", params);
  if (params.sdtmb == "") {
    $("#sdtmb").text("<vui lòng kết nối ví>");
  } else {
    $("#sdtmb").text(params.sdtmb);
  }
  if (params.tenmb == "") {
    $("#tenmb").text("<vui lòng kết nối ví>");
  } else {
    $("#tenmb").text(params.tenmb);
  }
};

function previewFile() {
  var preview = document.querySelector("img");
  var file = document.querySelector("input[type=file]").files[0];
  var reader = new FileReader();

  reader.onloadend = function () {
    preview.src = reader.result;
  };

  if (file) {
    reader.readAsDataURL(file);
  } else {
    preview.src = "";
  }
}
function shareText() {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  if (params.os == "ios") {
    window.alert(
      '{"action":"share","data":{"message":"Chia sẻ Ví nội bộ iOS từ Webview"}}'
    );
  } else if (params.os == "android") {
    window.alert(
      '{"action":"share","data":{"message":"Chia sẻ Ví nội bộ Android từ Webview"}}'
    );
  }
}

function doPickContact() {
  window.alert('{"action":"pick_contact","function":"pickContactCallback"}');
}

function pickContactCallback(jsonString) {
  let json = JSON.parse(jsonString);
  console.log("pickContactCallback: ", json);
  $("#contact_sdtpicked").text(json["phone"]);
  $("#contact_namepicked").text(json["name"]);
}

function getDeviceLocation() {
  window.alert(
    '{"action":"get_device_location", "function":"locationCallback"}'
  );
}

function locationCallback(jsonString) {
  let json = JSON.parse(jsonString);
  console.log("locationCallback: ", json);
  if (json["status"] == "SUCCESS") {
    $("#lat").text(json["location"]["lat"]);
    $("#lng").text(json["location"]["lng"]);
  } else {
    $("#lat").text("");
    $("#lng").text("");
  }
  $("#locationstatus").text(json["status"]);
}

function genImageBase64(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    var reader = new FileReader();
    reader.onloadend = function () {
      callback(reader.result);
    };
    reader.readAsDataURL(xhr.response);
  };
  xhr.open("GET", url);
  xhr.responseType = "blob";
  xhr.send();
}

// toDataURL('https://cdn.discordapp.com/attachments/571092147801948204/784586541146177606/6f32c864-985a-481d-8d8e-bd1f14ab9951.png', function(dataUrl) {
//   console.log('RESULT:', dataUrl)
// })

function saveImageToDevice(imageUrl) {
  console.log("imageUrl", imageUrl);
  genImageBase64(imageUrl, function (dataUrl) {
    console.log("RESULT:", dataUrl);
    window.alert("{\"action\":\"save_image\",\"data\":\"" + dataUrl + "\"}\",\"name\":\"ve1.png\"}");
    window.alert("{\"action\":\"save_image\",\"data\":\"DONE\"}")
  });
}
