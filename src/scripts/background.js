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
      var key_val;
      var base_url_val;
      storage.get('key', function(resp) {
        console.log("Loading key")
        var key = resp.key;
        console.log(key);
        if(key) {
          key_val = key;
        } else {
          sendResponse({ action: "Please enter your API key in the settings menu"})
        }
        storage.get('base_url', function(resp) {
          console.log("Loading URL")
          var url = resp.base_url;
          console.log(url);
          if(url) {
            base_url_val = url;
          } else {
            sendResponse({ action: "Please enter your base URL in the settings menu"})
          }
          ///////

          FD.append("url", JSON.parse(request.data)["url"]);
          FD.append("key", key_val);

          xhr.open("POST", base_url_val + "/api/", true);
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
                sendResponse({ action: "Server not reachable" });
              }
            }
          };
          xhr.onerror = function (e) {
            console.error(xhr.statusText);
            sendResponse({ action: "Server not reachable" });
          };
          xhr.send(FD); 

          ///////
        });
      });
    }
  return true;
  }
);