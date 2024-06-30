

  const firebaseConfig = {
    apiKey: "AIzaSyDQRCfqirabDqJSq3yxmxTMDuk145dbqco",
    authDomain: "tt-iot-utek.firebaseapp.com",
    databaseURL: "https://tt-iot-utek-default-rtdb.firebaseio.com",
    projectId: "tt-iot-utek",
    storageBucket: "tt-iot-utek.appspot.com",
    messagingSenderId: "296043246782",
    appId: "1:296043246782:web:2468b601fa5ef1817e9aef"
  };

firebase.initializeApp(firebaseConfig);


// Auto load Temperature-------------------------
firebase.database().ref("/TT_IoT/Temp").on("value",function(snapshot){
  var nd = snapshot.val();  
  document.getElementById("nhietdo").innerHTML = nd;
  console.log(nd);
});

firebase.database().ref("/TT_IoT/Hum").on("value",function(snapshot){
  var nd = snapshot.val();  
  document.getElementById("doam").innerHTML = nd;
  console.log(nd);
});

//Update Bulb status-----when reload website-------
firebase.database().ref("/TT_IoT").get().then((snapshot) => {
  if(snapshot.exists()){
    console.log(snapshot.val())

    var bulb_01_status = snapshot.val()
    if (bulb_01_status["Led 1"] == "1")
      document.getElementById("d01_img").src = "./img/light_bulb_on.png"
    else
      document.getElementById("d01_img").src = "./img/light_bulb_off.png"
    if (bulb_01_status["Led 2"] == "1")
      document.getElementById("d02_img").src = "./img/light_bulb_on.png"
    else
      document.getElementById("d02_img").src = "./img/light_bulb_off.png"
    if (bulb_01_status["Led 3"] == "1")
      document.getElementById("d03_img").src = "./img/light_bulb_on.png"
    else
      document.getElementById("d03_img").src = "./img/light_bulb_off.png"
    if (bulb_01_status["Led 4"] == "1")
      document.getElementById("d04_img").src = "./img/light_bulb_on.png"
    else
      document.getElementById("d04_img").src = "./img/light_bulb_off.png"
  }
  else
    console.log("No data available!")
})

//Den 01-------------------------------------------------------
var d01_on = document.getElementById("d01_on");
var d01_off = document.getElementById("d01_off");

d01_on.onclick = function(){
    document.getElementById("d01_img").src = "./img/light_bulb_on.png"
    
    firebase.database().ref("/TT_IoT").update({
    "Led 1": "1"
  })
}

d01_off.onclick = function(){
	document.getElementById("d01_img").src = "./img/light_bulb_off.png"
	
  firebase.database().ref("/TT_IoT").update({
		"Led 1": "0"
	})
}

var d02_on = document.getElementById("d02_on");
var d02_off = document.getElementById("d02_off");

d02_on.onclick = function(){
    document.getElementById("d02_img").src = "./img/light_bulb_on.png"
    
    firebase.database().ref("/TT_IoT").update({
    "Led 2": "1"
  })
}

d02_off.onclick = function(){
	document.getElementById("d02_img").src = "./img/light_bulb_off.png"
	
  firebase.database().ref("/TT_IoT").update({
		"Led 2": "0"
	})
}

var d03_on = document.getElementById("d03_on");
var d03_off = document.getElementById("d03_off");

d03_on.onclick = function(){
    document.getElementById("d03_img").src = "./img/light_bulb_on.png"
    
    firebase.database().ref("/TT_IoT").update({
    "Led 3": "1"
  })
}

d03_off.onclick = function(){
	document.getElementById("d03_img").src = "./img/light_bulb_off.png"
	
  firebase.database().ref("/TT_IoT").update({
		"Led 3": "0"
	})
}

var d04_on = document.getElementById("d04_on");
var d04_off = document.getElementById("d04_off");

d04_on.onclick = function(){
    document.getElementById("d04_img").src = "./img/light_bulb_on.png"
    
    firebase.database().ref("/TT_IoT").update({
    "Led 4": "1"
  })
}

d04_off.onclick = function(){
	document.getElementById("d04_img").src = "./img/light_bulb_off.png"
	
  firebase.database().ref("/TT_IoT").update({
		"Led 4": "0"
	})
}