const firebaseConfig = {
    apiKey: "AIzaSyC9EswSO-fPTruUFMtQIJ1HcZ7zIjoaj3U",
    authDomain: "buoi4-5d3df.firebaseapp.com",
    databaseURL: "https://buoi4-5d3df-default-rtdb.firebaseio.com",
    projectId: "buoi4-5d3df",
    storageBucket: "buoi4-5d3df.appspot.com",
    messagingSenderId: "552075200398",
    appId: "1:552075200398:web:ceaaf2d27fc9babc3ec6df",
    measurementId: "G-ZM2RKD9MRM"
  };

firebase.initializeApp(firebaseConfig);


// Auto load Temperature-------------------------
firebase.database().ref("/Count").on("value",function(snapshot){
  var nd = snapshot.val();  
  document.getElementById("count").innerHTML = nd;
  console.log(nd);
});

firebase.database().ref("/LED").on("value",function(snapshot){
  var nd = snapshot.val();  
  var checkbox = document.querySelector('input[type="checkbox"]');
  checkbox.checked = nd; 
  if (nd == true)
  {
    document.getElementById("d01_img").src = "./img/light_bulb_on.png"
  }
  else
  {
    document.getElementById("d01_img").src = "./img/light_bulb_off.png"
  }
  console.log(nd);
});

var checkbox = document.querySelector('input[type="checkbox"]');
checkbox.addEventListener('change', function(event) {
    var isChecked = event.target.checked;
    firebase.database().ref("/LED").set(isChecked);
});

