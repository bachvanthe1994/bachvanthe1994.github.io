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
  window.alert(
    '{"action":"pick_contact","function":"pickContactCallback"}'
  );
}

function pickContactCallback(jsonString) {
  let json = JSON.parse(jsonString)
  console.log("pickContactCallback: ", json)
  $("#contact_sdtpicked").text(json["phone"]);
  $("#contact_namepicked").text(json["name"]);
}

function getDeviceLocation() {
  window.alert('{"action":"get_device_location", "function":"locationCallback"}')
}

function locationCallback(jsonString) {
  let json = JSON.parse(jsonString)
  console.log("locationCallback: ", json)
  if (json["status"] == "SUCCESS") {
    $("#lat").text(json["location"]["lat"]);
    $("#lng").text(json["location"]["lng"]);
  } else {
    $("#lat").text("");
    $("#lng").text("");
  }
  $("#locationstatus").text(json["status"]);
}