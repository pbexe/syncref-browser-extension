import ext from "./utils/ext";

ext.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(request.action === "perform-save") {
      console.log("Extension Type: ", "/* @echo extension */");
      console.log("PERFORM AJAX", request.data);
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "http://127.0.0.1:8000/submit_url/1/", true);
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhr.withCredentials = true;
      xhr.onload = function (e) {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log(xhr.responseText);
            sendResponse({ action: "saved" });
          } else {
            console.error(xhr.statusText);
            sendResponse({ action: "not-saved" });
          }
        }
      };
      xhr.onerror = function (e) {
        console.error(xhr.statusText);
      };
      xhr.send("url=" + request.data.url); 
    }
  }
);