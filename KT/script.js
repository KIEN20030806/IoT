const firebaseConfig = {
    apiKey: "AIzaSyCmLvmIOCbJyvUXJifwLXeSOjiJUJcRSP4",
    authDomain: "kiemtra-dc983.firebaseapp.com",
    databaseURL: "https://kiemtra-dc983-default-rtdb.firebaseio.com",
    projectId: "kiemtra-dc983",
    storageBucket: "kiemtra-dc983.appspot.com",
    messagingSenderId: "458903460126",
    appId: "1:458903460126:web:d8ad2aa9559cbfd14d910f",
    measurementId: "G-31RCQPHV56"
  };

firebase.initializeApp(firebaseConfig);


// Auto load Temperature-------------------------
firebase.database().ref("/cambien/nhietdo").on("value",function(snapshot){
  var nd = snapshot.val();  
  document.getElementById("nhietdo").innerHTML = nd;
  console.log(nd);
});

firebase.database().ref("/cambien/doam").on("value",function(snapshot){
    var nd = snapshot.val();  
    document.getElementById("doam").innerHTML = nd;
    console.log(nd);
  });

firebase.database().ref("/PK/Den").on("value",function(snapshot){
  var newValue = snapshot.val();  
  if (newValue === "ON") {
    document.getElementById("denimg").src = "./img/denon.png"
    document.getElementById("denimg1").src = "./img/denon.png"
  } else {
    nd = false;
    document.getElementById("denimg").src = "./img/denoff.png"
    document.getElementById("denimg1").src = "./img/denoff.png"
  }
});

firebase.database().ref("/PK/Quat").on("value",function(snapshot){
    var newValue = snapshot.val();  
    if (newValue == "ON"){
      document.getElementById("quatimg").src = "./img/quaton.png"
      document.getElementById("quatimg1").src = "./img/quaton.png"
    }
    else {
      document.getElementById("quatimg").src = "./img/quatoff.png"
      document.getElementById("quatimg1").src = "./img/quatoff.png"
    }
  });

var denON = document.getElementById("denon");
var denOFF = document.getElementById("denoff");
denON.onclick = function(){
    document.getElementById("denimg").src = "./img/denon.png"    
    firebase.database().ref("/PK").update({
    "Den" : "ON"
  })
  firebase.database().ref("/PN").update({
    "Den" : "ON"
  })
}

denOFF.onclick = function(){
    document.getElementById("denimg").src = "./img/denoff.png"    
    firebase.database().ref("/PK").update({
      "Den" : "OFF"
    })
    firebase.database().ref("/PN").update({
      "Den" : "OFF"
    })
}

var quatON = document.getElementById("quaton");
var quatOFF = document.getElementById("quatoff");
quatON.onclick = function(){
    document.getElementById("quatimg").src = "./img/quaton.png"    
    firebase.database().ref("/PK").update({
    "Quat" : "ON"
  })
  firebase.database().ref("/PN").update({
    "Quat" : "ON"
  })
}

quatOFF.onclick = function(){
    document.getElementById("quatimg").src = "./img/quatoff.png"    
    firebase.database().ref("/PK").update({
      "Quat" : "OFF"
    })
    firebase.database().ref("/PN").update({
      "Quat" : "OFF"
    })
}

var slider = document.getElementById("myRange");
var slider1 = document.getElementById("myRange1");
var image = document.getElementById("pic");
var image1 = document.getElementById("pic1");

slider.oninput = function() {
  firebase.database().ref("/PK").update({
    "Maylanh" : this.value
  })
  firebase.database().ref("/PN").update({
    "Maylanh" : this.value
  })
    var opacityValue = (20 + (this.value - 15) * 4) / 100;
      image.style.opacity = opacityValue;
      image1.style.opacity = opacityValue; 
};

firebase.database().ref("/PK/Maylanh").on("value",function(snapshot){
  var newValue = snapshot.val();  
  slider.value = newValue;
  slider1.value = newValue;
  firebase.database().ref("/PN").update({
    "Maylanh" : newValue
  })
});