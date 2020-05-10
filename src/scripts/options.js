import ext from "./utils/ext";
import storage from "./utils/storage";

// var colorSelectors = document.querySelectorAll(".js-radio");

// var setColor = (color) => {
//   document.body.style.backgroundColor = color;
// };

// storage.get('color', function(resp) {
//   var color = resp.color;
//   var option;
//   if(color) {
//     option = document.querySelector(`.js-radio.${color}`);
//     setColor(color);
//   } else {
//     option = colorSelectors[0]
//   }

//   option.setAttribute("checked", "checked");
// });

// colorSelectors.forEach(function(el) {
//   el.addEventListener("click", function(e) {
//     var value = this.value;
//     storage.set({ color: value }, function() {
//       setColor(value);
//     });
//   })
// })

storage.get('base_url', function(resp) {
  console.log("Loading base")
  var url = resp.base_url;
  console.log(url);
  if(url) {
    document.getElementById("base_url").value = url;
  }
});

document.getElementById("base_url").addEventListener("change", function(e) {
  var value = this.value;
  storage.set({ base_url: value }, function() {
    console.log("Updated base_url to " + value);
  });
})

storage.get('key', function(resp) {
  console.log("Loading key")
  var key = resp.key;
  console.log(key);
  if(key) {
    document.getElementById("key").value = key;
  }
});

document.getElementById("key").addEventListener("change", function(e) {
  var value = this.value;
  storage.set({ key: value }, function() {
    console.log("Updated key to " + value);
  });
})