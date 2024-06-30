var btn_btn = document.getElementById("light-lr-btn"); 
var oldStatus = "OFF";
btn_btn.onclick = function(){  
  var newStatus = (oldStatus === "OFF") ? "ON" : "OFF";
  oldStatus = newStatus;
  document.getElementById("light-lr-status").innerHTML = newStatus;
  if (newStatus == 'ON') {
    console.log("ON");
    document.getElementById("light-lr-img").src = "./img/light-on.png";
  }
  else {
    document.getElementById("light-lr-img").src = "./img/light-off.png";
    console.log("OFF");
  }
};

