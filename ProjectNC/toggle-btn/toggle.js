var btn_btn = document.getElementById("btn-btn"); 
var oldStatus = "OFF";
btn_btn.onclick = function(){  
    var newStatus = (oldStatus == "OFF") ? "ON" : "OFF";
    oldStatus = newStatus;        
    document.getElementById("btn-status").innerHTML = newStatus;
    if (newStatus == 'ON') {
      console.log("ON");
      document.getElementById("btn-img").src = "./img/btn-on.png";
      document.getElementById("btn-btn").checked = true;
    } else {
      console.log("OFF");
      document.getElementById("btn-img").src = "./img/btn-off.png";
      document.getElementById("btn-btn").checked = false;
    }
};
