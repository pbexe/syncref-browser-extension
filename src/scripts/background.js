import ext from "./utils/ext";
import storage from "./utils/storage";
storage.get('color', function(resp) {
  var color = resp.color;
  if(color) {
    console.log(color);
  } else {
    console.log("No color");
  }
});

ext.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(request.action === "perform-save") {
      var xhr = new XMLHttpRequest();
      var FD  = new FormData();
      FD.append("url", JSON.parse(request.data)["url"]);
      storage.get('color', function(resp) {
        // TODO get key
        FD.append("key", "BYmc4RxDlVMAGijgypImIw");
      });
      xhr.open("POST", "http://127.0.0.1:8000/api/", true);
      xhr.onload = function (e) {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log(xhr.responseText);
            if (xhr.responseText == "OK") {
              sendResponse({ action: "saved" });
            } else {
              sendResponse({ action: "not-saved"});
            }
          } else {
            console.error(xhr.statusText);
            sendResponse({ action: "not-saved" });
          }
        }
      };
      xhr.onerror = function (e) {
        console.error(xhr.statusText);
      };
      xhr.send(FD); 
    }
  return true;
  }
);