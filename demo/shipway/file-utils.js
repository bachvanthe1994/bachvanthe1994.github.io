function aa(str) {
    if (str < 10) {
        return "0" + str;
    }
    return str;
}

function readTimeOfFile(id, fileName) {
    var ipaFile = fileName;
    var date = new Date();
    fileName = fileName + "?d=" + date.getTime();
//    alert(fileName);
    var xhr = $.ajax({
        url: ipaFile,
        type: 'HEAD',
        success: function(response) {
            var time = xhr.getResponseHeader("Last-Modified");
            var date = new Date(time);

            var format = aa(date.getDate()) + "/" + aa((date.getMonth() + 1)) + "/" + date.getFullYear() + " " + aa(date.getHours()) + "h" + aa(date.getMinutes());
			var size = (xhr.getResponseHeader('Content-Length')/1048576).toFixed(2)+" MB";
            var text = $(id).text() + format+" <br> "+size;
            $(id).html(text);
        }
    });
}

function getParameterByName(name, url) {
    if (!url) {
        url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return results[2].replace(/\+/g, " ");
}

$(document).ready(function() {

    var links = document.getElementsByTagName('a');

    for(var i = 0; i< links.length; i++){
        var text = $(links[i]).text();
        text = text.replace(/\s/g, '');
        if (text.length > 0) {
            var href = $(links[i]).attr("href");
            if (href.endsWith(".apk")) {
                //android
                if (href.startsWith("http")) {
                    var a = href.split("/");
                    href = a[(a.length - 1)];
                    var apkFolder = a[a.length - 2];
                    if (apkFolder == "apk") {
                        href = "./" + apkFolder + "/" + href;

                    }
                }

                readTimeOfFile(links[i], href);


            } else if (href.endsWith(".plist")) {
                //ios
                var array = href.split("url=");
                var file = array[1];
                file = file + "?i=" + i;
                $.ajax({
                    type: "GET",
                    url: file,
                    dataType: "xml",
                    success: function(xml) {
                        var url = this.url;

                        $(xml).find("string").each(function() {
                            var iosFile = $(this).text();
                            if (iosFile.endsWith(".ipa")) {
                                iosFile = iosFile;

                                var position = parseInt(getParameterByName("i", url));

                                readTimeOfFile(links[position], iosFile);
                            }
                        });

                    },
                    error: function(request, status, error) {
                        console.log("error" + error + status);
                    }
                });
            }
        }
    }
});
