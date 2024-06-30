const firebaseConfig = {
  apiKey: "AIzaSyDSynnhNO1brGvIH529L7HaRduWxklSOZc",
  authDomain: "projectcb-6d87a.firebaseapp.com",
  databaseURL: "https://projectcb-6d87a-default-rtdb.firebaseio.com",
  projectId: "projectcb-6d87a",
  storageBucket: "projectcb-6d87a.appspot.com",
  messagingSenderId: "95249017802",
  appId: "1:95249017802:web:706743708a78c1fef63d33",
  measurementId: "G-QYE1JNE85Z"
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

firebase.database().ref("/Livingroom/Tem").on("value",function(snapshot){
  var nd = snapshot.val();  
  $("#Tem").roundSlider("setValue", nd);
  });

  $("#Hum").roundSlider({
    circleShape: "full",
    min: 0,
    max: 80,
    radius: 80,
    width: 14,
    handleSize: "+8",
    handleShape: "dot",
    sliderType: "min-range",
    value: 30, 
    readOnly: false,
    change: function (args) {
    var newValue = args.value; // Lấy giá trị mới từ sự kiện change của RoundSlider
    firebase.database().ref("/Livingroom/Hum").set(newValue); // Ghi giá trị mới vào cơ sở dữ liệu Firebase
  }
  });  

  document.addEventListener('DOMContentLoaded', function() {
    const minusButton = document.querySelector('.minus');
    const plusButton = document.querySelector('.plus');
    const quantityInput = document.querySelector('.quantity');

    minusButton.addEventListener('click', function() {
        let currentValue = parseInt(quantityInput.value);
        if (currentValue > 0) {
            quantityInput.value = currentValue - 1;
            // Ghi dữ liệu vào Firebase khi giá trị thay đổi
            firebase.database().ref("/Livingroom/Soluong").set(currentValue - 1);
        }
    });

    plusButton.addEventListener('click', function() {
        let currentValue = parseInt(quantityInput.value);
        quantityInput.value = currentValue + 1;
        // Ghi dữ liệu vào Firebase khi giá trị thay đổi
        firebase.database().ref("/Livingroom/Soluong").set(currentValue + 1);
    });
});

motionCheckbox.addEventListener("change", function() {
      if (this.checked) {
        document.getElementById("Quat").src = "./img/quaton.png";
        firebase.database().ref("/Livingroom/Quat").set("ON");
      } else {
        document.getElementById("Quat").src = "./img/quatoff.png";
        firebase.database().ref("/Livingroom/Quat").set("OFF");
      }
  });

var image = document.getElementById("Den");

document.getElementById("myRange").addEventListener("input", function() {
  var lightValue = this.value;
  firebase.database().ref("/Livingroom/Light").set(lightValue);
  image.style.opacity = lightValue/100;
});


function setupCheckboxListener(elementId, firebasePath) {
  const statusRef = firebase.database().ref(firebasePath);

  document.getElementById(elementId).addEventListener('change', (event) => {
    const isChecked = event.target.checked;
    statusRef.set(isChecked);
  });
}
// setupCheckboxListener('Fan', '');
// setupCheckboxListener('Fridge', '/Devices/Fridge');
// setupCheckboxListener('Maylanh', '/Devices/Maylanh');
// setupCheckboxListener('TV', '/Devices/TV');
// setupCheckboxListener('Losuoi', '/Devices/Losuoi');

function toggleLED() {
    var ledIndicator = document.getElementById("ledIndicator");
    // Kiểm tra lớp CSS hiện tại của ledIndicator
    if (ledIndicator.classList.contains("led-red")) {
        // Nếu đang là đỏ, chuyển thành xanh
        ledIndicator.classList.remove("led-red");
        firebase.database().ref("/Livingroom/LED").set(0);
    } else {
        // Nếu không, chuyển về đỏ
        ledIndicator.classList.add("led-red");
        firebase.database().ref("/Livingroom/LED").set(1);
    }
}
