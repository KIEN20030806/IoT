const firebaseConfig = {
  apiKey: "AIzaSyA2yBOHTIgXfhhoROZt9gFA8ATgwW3AFKc",
  authDomain: "smarthome-9f000.firebaseapp.com",
  databaseURL: "https://smarthome-9f000-default-rtdb.firebaseio.com",
  projectId: "smarthome-9f000",
  storageBucket: "smarthome-9f000.appspot.com",
  messagingSenderId: "513961192178",
  appId: "1:513961192178:web:0fef1651a7cb60c32d7e6b",
};

firebase.initializeApp(firebaseConfig);

$("#Tem").roundSlider({
  circleShape: "half",
  min: 0,
  max: 100,
  radius: 80,
  width: 14,
  handleSize: "+8",
  handleShape: "dot",
  sliderType: "min-range",
  value: null, 
  readOnly: true,
});

firebase.database().ref("/Sensors/Temp").on("value",function(snapshot){
  var nd = snapshot.val();  
  $("#Tem").roundSlider("setValue", nd);
  });


$("#Hum").roundSlider({
  circleShape: "half",
  min: 0,
  max: 80,
  radius: 80,
  width: 14,
  handleSize: "+8",
  handleShape: "dot",
  sliderType: "min-range",
  value: null,
  readOnly: true,
});

firebase.database().ref("/Sensors/Hum").on("value",function(snapshot){
  var nd = snapshot.val();  
  $("#Hum").roundSlider("setValue", nd);
  });

$("#Khiga").roundSlider({
  circleShape: "half",
  min: 0,
  max: 10000,
  radius: 80,
  width: 14,
  handleSize: "+8",
  handleShape: "dot",
  sliderType: "min-range",
  value: null,
  readOnly: true,
});

firebase.database().ref("/Sensors/Gas").on("value",function(snapshot){
  var nd = snapshot.val();  
  $("#Khiga").roundSlider("setValue", nd);
  });

  firebase.database().ref("/Sensors/Motion").on("value", function(snapshot) {
    var motionValue = snapshot.val();
    document.getElementById("motionCheckbox").checked = motionValue;
});

document.getElementById("myRange").addEventListener("input", function() {
  var lightValue = this.value;
  firebase.database().ref("/Devices/Light").set(lightValue);
});

function setupCheckboxListener(elementId, firebasePath) {
  const statusRef = firebase.database().ref(firebasePath);

  document.getElementById(elementId).addEventListener('change', (event) => {
    const isChecked = event.target.checked;
    statusRef.set(isChecked);
  });
}
setupCheckboxListener('Fan', '/Devices/Fan');
setupCheckboxListener('Fridge', '/Devices/Fridge');
setupCheckboxListener('Maylanh', '/Devices/Maylanh');
setupCheckboxListener('TV', '/Devices/TV');
setupCheckboxListener('Losuoi', '/Devices/Losuoi');
