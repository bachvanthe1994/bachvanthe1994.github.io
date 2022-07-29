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

//------- PICK/TAKE A PHOTO ------
function pickPhoto() {
  window.alert('{"action":"pick_a_photo","function":"setPhotoCallback"}');
}
function takeAPhoto() {
  window.alert('{"action":"capture_a_photo","function":"setPhotoCallback"}');
}
function setPhotoCallback(jsonString) {
  let json = JSON.parse(jsonString);
  console.log("setPhotoCallback: ", json);
  if (json.status == "SUCCESS") {
    $("#my_image").attr("src", json.data);
  }
}
//---------------

//------- GET DEVICE LOCATION -----------
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
//-------------------------------------

//----------- PICK CONTACT ------------
function doPickContact() {
  window.alert('{"action":"pick_contact","function":"pickContactCallback"}');
}
function pickContactCallback(jsonString) {
  let json = JSON.parse(jsonString);
  console.log("pickContactCallback: ", json);
  $("#contact_sdtpicked").text(json["phone"]);
  $("#contact_namepicked").text(json["name"]);
}
//-------------------------------

//------------ SAVE IMAGE ------------
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
function saveImageToDevice(imageUrl) {
  console.log("imageUrl", imageUrl);
  genImageBase64(imageUrl, function (dataUrl) {
    console.log("RESULT:", dataUrl);
    window.alert(
      '{"action":"save_image","data":"" + dataUrl + "","name":"ve1.png"}'
    );
    window.alert('{"action":"save_image","data":"DONE"}');
  });
}
//--------------------------------

//--------- OPEN DEVICE SETTING ----------
function openDeviceSetting() {
  window.alert('{"action":"open_device_setting"}');
}
//-------------------------

//---------- STORAGE -----------------
function saveData() {
  let save_data = $("#save_data").val();
  console.log("save_data", save_data);
  window.alert(
    '{"action":"storage_save","field":"user_history_key","value":"' +
      save_data +
      '"}'
  );
}

function getData() {
  window.alert(
    '{"action":"storage_get","field":"user_history_key","function":"setUserHistoryData"}'
  );
}

function setUserHistoryData(value) {
  console.log("setUserHistoryData: ", value);
  $("#get_data").text(value);
}
//-----------------------------------

//------- SHARE ------------
function shareText() {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  let message = $("#share_message").val();
  console.log("message", message);
  if (params.os == "ios") {
    window.alert(
      '{"action":"share","data":{"message":"Chia sẻ Ví nội bộ iOS từ Webview\\n' +
        message +
        '"}}'
    );
  } else if (params.os == "android") {
    window.alert(
      '{"action":"share","data":{"message":"Chia sẻ Ví nội bộ Android từ Webview\\n' +
        message +
        '"}}'
    );
  }
}
//-------------------------

class a {
  static arrObserver = [];

  getDeviceLocaiton(params) {}
}
