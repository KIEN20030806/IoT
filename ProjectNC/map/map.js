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
  
    // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var database = firebase.database();
  

function myMap() {
    var mapProp= {
      center:new google.maps.LatLng(51.508742,-0.120850),
      zoom:5,
    };
    var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
    }