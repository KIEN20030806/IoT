
const firebaseConfig = {
  apiKey: "AIzaSyC1_gdvm7YNZt_BJmASGjB-zaJW8afzQT0",
  authDomain: "smarthome-7dd68.firebaseapp.com",
  databaseURL: "https://smarthome-7dd68-default-rtdb.firebaseio.com",
  projectId: "smarthome-7dd68",
  storageBucket: "smarthome-7dd68.appspot.com",
  messagingSenderId: "1007374383118",
  appId: "1:1007374383118:web:2ef7188babbb0a206d645f"
};

  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

  // Firebase



const sideMenu = document.querySelector('aside');
const menuBtn = document.getElementById('menu-btn');
const closeBtn = document.getElementById('close-btn');

const darkMode = document.querySelector('.dark-mode');

menuBtn.addEventListener('click', () => {
    sideMenu.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    sideMenu.style.display = 'none';
});

// Kiểm tra xem dark mode có được bật hay không trong localStorage
const isDarkMode = localStorage.getItem('darkMode') === 'enabled';

// Function để bật hoặc tắt dark mode
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode-variables');
  darkMode.querySelector('span:nth-child(1)').classList.toggle('active');
  darkMode.querySelector('span:nth-child(2)').classList.toggle('active');

  // Lưu trạng thái dark mode vào localStorage
  const isDarkModeEnabled = document.body.classList.contains('dark-mode-variables');
  localStorage.setItem('darkMode', isDarkModeEnabled ? 'enabled' : 'disabled');
}

// Nếu dark mode đã được bật từ trước, kích hoạt nó
if (isDarkMode) {
  toggleDarkMode();
}

// Thêm sự kiện click cho darkMode
darkMode.addEventListener('click', toggleDarkMode);


// Ham chinh aside khi phong to window tro  lai//////////////
window.addEventListener('resize', function() {
  var screenWidth = window.innerWidth;
  var asideElement = document.querySelector('aside');

  if (screenWidth >= 769) {
      asideElement.style.display = 'block';
  } else {
      asideElement.style.display = 'none';
  }
});


/////////////////////////////////////
// chuyen phong ////////
function switchPage(evt, pageName) {
  var i, sections, links;

  // Lấy danh sách các sections
  sections = document.getElementsByTagName("section");

  // Ẩn tất cả các sections
  for (i = 0; i < sections.length; i++) {
      sections[i].style.display = "none";
  }

  // Lấy danh sách các links có class "active"
  links = document.getElementsByClassName("active");

  // Loại bỏ class "active" từ tất cả các links
  for (i = 0; i < links.length; i++) {
      links[i].classList.remove("active");
  }

  // Hiển thị phần tử được chọn và thêm class "active" cho link
  var targetSection = document.getElementById(pageName);
  if (targetSection) {
      if (targetSection.style.display !== "flex") {
          targetSection.style.display = "block";
          evt.currentTarget.classList.add("active");
      }
  }
  // Ngăn chặn mặc định của sự kiện (ví dụ: chặn link từ việc chuyển hướng)
  evt.preventDefault();
}


// Controller /////////////////
// Living room //////////////
var light_01_btn = document.getElementById("light-lr-btn"); 
light_01_btn.onclick = function(){  
      firebase.database().ref("/Living room/Electric devices").once("value").then(function(snapshot) {
        var currentStatus = snapshot.child("Light").val();
    
        // Chuyển đổi trạng thái
        var newStatus = (currentStatus === "OFF") ? "ON" : "OFF";
    
        // Cập nhật trạng thái mới vào Firebase
        firebase.database().ref("/Living room/Electric devices").update({
          "Light": newStatus
        });
      });
};

var lamp_01_btn = document.getElementById("lamp-lr-btn"); 
lamp_01_btn.onclick = function(){  
      firebase.database().ref("/Living room/Electric devices").once("value").then(function(snapshot) {
        var currentStatus = snapshot.child("Lamp").val();
        
            // Chuyển đổi trạng thái
        var newStatus = (currentStatus === "OFF") ? "ON" : "OFF";
        
            // Cập nhật trạng thái mới vào Firebase
        firebase.database().ref("/Living room/Electric devices").update({
          "Lamp": newStatus
        });
      });
};

var ac_01_value = document.getElementById("acValue-lr");
var ac_01_slider = document.getElementById("ac-lr-slider");
var ac_01_unit = document.getElementById("ac_lr_unit")
firebase.database().ref("/Living room/Electric devices/Air conditioner").on("value", function(snapshot) {
    var ac_01 = snapshot.val();
    if (ac_01 == "OFF") {
      var current = 33;
    }
    else {
      current = ac_01;
    }
    // Đặt giá trị từ Firebase cho thanh trượt
    ac_01_slider.value = current;
    // Áp dụng hiệu ứng cho thanh trượt
    var valuePercentage = (ac_01_slider.value - ac_01_slider.min) / (ac_01_slider.max - ac_01_slider.min) * 100;
    ac_01_slider.style.background = 'linear-gradient(to right, #7d8da1 0%, #7d8da1 ' + valuePercentage + '%, #6c9bcf ' + valuePercentage + '%, #6c9bcf 100%)';

    // Cập nhật giá trị hiển thị
    ac_01_value.innerHTML = ac_01;
    ac_01_unit.innerHTML = (ac_01 == "OFF") ? "" : "°C";
});

// Khi thay doi gia tri thanh truot
ac_01_slider.addEventListener("input", function() {
    // Lấy giá trị hiện tại của thanh trượt
    var currentValue = parseFloat(ac_01_slider.value);
    if (currentValue == 33) {
      currentValue = "OFF";
  }
    // Cập nhật giá trị lên Firebase
    firebase.database().ref("/Living room/Electric devices/Air conditioner").set(currentValue);

    // Cập nhật giá trị hiển thị
    ac_01_value.innerHTML = currentValue;
});

var speaker_value = document.getElementById("speakerValue");
var speaker_slider = document.getElementById("speaker-slider");
firebase.database().ref("/Living room/Electric devices/Speaker").on("value", function(snapshot) {
    var spk = snapshot.val();
    // Đặt giá trị từ Firebase cho thanh trượt
    speaker_slider.value = spk;
    // Áp dụng hiệu ứng cho thanh trượt
    var valuePercentage = (speaker_slider.value - speaker_slider.min) / (speaker_slider.max - speaker_slider.min) * 100;
    speaker_slider.style.background = 'linear-gradient(to right, #6c9bcf 0%, #6c9bcf ' + valuePercentage + '%, #7d8da1 ' + valuePercentage + '%, #7d8da1 100%)';

    // Cập nhật giá trị hiển thị
    speaker_value.innerHTML = spk;
});

// Khi thay doi gia tri thanh truot
speaker_slider.addEventListener("input", function() {
    // Lấy giá trị hiện tại của thanh trượt
    var currentValue = parseFloat(speaker_slider.value);
    // Cập nhật giá trị lên Firebase
    firebase.database().ref("/Living room/Electric devices/Speaker").set(currentValue);

    // Cập nhật giá trị hiển thị
    speaker_value.innerHTML = currentValue;
});

var fan_01_btn = document.getElementById("fan-lr-btn"); 
fan_01_btn.onclick = function(){  
      firebase.database().ref("/Living room/Electric devices").once("value").then(function(snapshot) {
        var currentStatus = snapshot.child("Fan").val();
            // Chuyển đổi trạng thái
        var newStatus = (currentStatus === "OFF") ? "ON" : "OFF";
            // Cập nhật trạng thái mới vào Firebase
        firebase.database().ref("/Living room/Electric devices").update({
          "Fan": newStatus
        });
      });
};

var tv_btn = document.getElementById("tv-btn"); 
tv_btn.onclick = function(){  
      firebase.database().ref("/Living room/Electric devices").once("value").then(function(snapshot) {
        var currentStatus = snapshot.child("TV").val();
        
            // Chuyển đổi trạng thái
        var newStatus = (currentStatus === "OFF") ? "ON" : "OFF";
        
            // Cập nhật trạng thái mới vào Firebase
        firebase.database().ref("/Living room/Electric devices").update({
          "TV": newStatus
        });
      });
};

// Kitchen ////////////////////
var light_02_btn = document.getElementById("light-kc-btn"); 
light_02_btn.onclick = function(){  
      firebase.database().ref("/Kitchen/Electric devices").once("value").then(function(snapshot) {
        var currentStatus = snapshot.child("Light").val();
    
        // Chuyển đổi trạng thái
        var newStatus = (currentStatus === "OFF") ? "ON" : "OFF";
    
        // Cập nhật trạng thái mới vào Firebase
        firebase.database().ref("/Kitchen/Electric devices").update({
          "Light": newStatus
        });
      });
};

var ac_02_value = document.getElementById("acValue-kc");
var ac_02_slider = document.getElementById("ac-kc-slider");
var ac_02_unit = document.getElementById("ac_kc_unit")
firebase.database().ref("/Kitchen/Electric devices/Air conditioner").on("value", function(snapshot) {
    var ac_02 = snapshot.val();
    if (ac_02 == "OFF") {
      var current = 33;
    }
    else {
      current = ac_02;
    }
    // Đặt giá trị từ Firebase cho thanh trượt
    ac_02_slider.value = current;
    // Áp dụng hiệu ứng cho thanh trượt
    var valuePercentage = (ac_02_slider.value - ac_02_slider.min) / (ac_02_slider.max - ac_02_slider.min) * 100;
    ac_02_slider.style.background = 'linear-gradient(to right, #7d8da1 0%, #7d8da1 ' + valuePercentage + '%, #6c9bcf ' + valuePercentage + '%, #6c9bcf 100%)';

    // Cập nhật giá trị hiển thị
    ac_02_value.innerHTML = ac_02;
    ac_02_unit.innerHTML = (ac_02 == "OFF") ? "" : "°C";
});

// Khi thay doi gia tri thanh truot
ac_02_slider.addEventListener("input", function() {
    // Lấy giá trị hiện tại của thanh trượt
    var currentValue = parseFloat(ac_02_slider.value);
    if (currentValue == 33) {
      currentValue = "OFF";
  }
    // Cập nhật giá trị lên Firebase
    firebase.database().ref("/Kitchen/Electric devices/Air conditioner").set(currentValue);

    // Cập nhật giá trị hiển thị
    ac_02_value.innerHTML = currentValue;
});

var fridge_value = document.getElementById("fridgeValue");
var fridge_slider = document.getElementById("fridge-slider");
var fridge_unit = document.getElementById("fridge_unit")
firebase.database().ref("/Kitchen/Electric devices/Fridge").on("value", function(snapshot) {
    var fridge = snapshot.val();
    if (fridge == "OFF") {
      var current = 4;
    }
    else {
      current = fridge;
    }
    // Đặt giá trị từ Firebase cho thanh trượt
    fridge_slider.value = current;
    // Áp dụng hiệu ứng cho thanh trượt
    var valuePercentage = (fridge_slider.value - fridge_slider.min) / (fridge_slider.max - fridge_slider.min) * 100;
    fridge_slider.style.background = 'linear-gradient(to right, #7d8da1 0%, #7d8da1 ' + valuePercentage + '%, #6c9bcf ' + valuePercentage + '%, #6c9bcf 100%)';

    // Cập nhật giá trị hiển thị
    fridge_value.innerHTML = fridge;
    fridge_unit.innerHTML = (fridge == "OFF") ? "" : "°C";
});

// Khi thay doi gia tri thanh truot
fridge_slider.addEventListener("input", function() {
    // Lấy giá trị hiện tại của thanh trượt
    var currentValue = parseFloat(fridge_slider.value);
    if (currentValue == 4) {
      currentValue = "OFF";
  }
    // Cập nhật giá trị lên Firebase
    firebase.database().ref("/Kitchen/Electric devices/Fridge").set(currentValue);

    // Cập nhật giá trị hiển thị
    fridge_value.innerHTML = currentValue;
});

var hood_btn = document.getElementById("hood-btn"); 
hood_btn.onclick = function(){  
      firebase.database().ref("/Kitchen/Electric devices").once("value").then(function(snapshot) {
        var currentStatus = snapshot.child("Hood").val();
    
        // Chuyển đổi trạng thái
        var newStatus = (currentStatus === "OFF") ? "ON" : "OFF";
    
        // Cập nhật trạng thái mới vào Firebase
        firebase.database().ref("/Kitchen/Electric devices").update({
          "Hood": newStatus
        });
      });
};

var cooker_btn = document.getElementById("cooker-btn"); 
cooker_btn.onclick = function(){  
      firebase.database().ref("/Kitchen/Electric devices").once("value").then(function(snapshot) {
        var currentStatus = snapshot.child("Cooker").val();
    
        // Chuyển đổi trạng thái
        var newStatus = (currentStatus === "OFF") ? "ON" : "OFF";
    
        // Cập nhật trạng thái mới vào Firebase
        firebase.database().ref("/Kitchen/Electric devices").update({
          "Cooker": newStatus
        });
      });
};

var stove_btn = document.getElementById("stove-btn"); 
stove_btn.onclick = function(){  
      firebase.database().ref("/Kitchen/Electric devices").once("value").then(function(snapshot) {
        var currentStatus = snapshot.child("Stove").val();
    
        // Chuyển đổi trạng thái
        var newStatus = (currentStatus === "OFF") ? "ON" : "OFF";
    
        // Cập nhật trạng thái mới vào Firebase
        firebase.database().ref("/Kitchen/Electric devices").update({
          "Stove": newStatus
        });
      });
};

// Bedroom /////////////
var light_03_btn = document.getElementById("light-br-btn"); 
light_03_btn.onclick = function(){  
      firebase.database().ref("/Bedroom/Electric devices").once("value").then(function(snapshot) {
        var currentStatus = snapshot.child("Light").val();
    
        // Chuyển đổi trạng thái
        var newStatus = (currentStatus === "OFF") ? "ON" : "OFF";
    
        // Cập nhật trạng thái mới vào Firebase
        firebase.database().ref("/Bedroom/Electric devices").update({
          "Light": newStatus
        });
      });
};

var lamp_03_btn = document.getElementById("lamp-br-btn"); 
lamp_03_btn.onclick = function(){  
      firebase.database().ref("/Bedroom/Electric devices").once("value").then(function(snapshot) {
        var currentStatus = snapshot.child("Lamp").val();
        
            // Chuyển đổi trạng thái
        var newStatus = (currentStatus === "OFF") ? "ON" : "OFF";
        
            // Cập nhật trạng thái mới vào Firebase
        firebase.database().ref("/Bedroom/Electric devices").update({
          "Lamp": newStatus
        });
      });
};

var ac_03_value = document.getElementById("acValue-br");
var ac_03_slider = document.getElementById("ac-br-slider");
var ac_03_unit = document.getElementById("ac_br_unit")
firebase.database().ref("/Bedroom/Electric devices/Air conditioner").on("value", function(snapshot) {
    var ac_03 = snapshot.val();
    if (ac_03 == "OFF") {
      var current = 33;
    }
    else {
      current = ac_03;
    }
    // Đặt giá trị từ Firebase cho thanh trượt
    ac_03_slider.value = current;
    // Áp dụng hiệu ứng cho thanh trượt
    var valuePercentage = (ac_03_slider.value - ac_03_slider.min) / (ac_03_slider.max - ac_03_slider.min) * 100;
    ac_03_slider.style.background = 'linear-gradient(to right, #7d8da1 0%, #7d8da1 ' + valuePercentage + '%, #6c9bcf ' + valuePercentage + '%, #6c9bcf 100%)';

    // Cập nhật giá trị hiển thị
    ac_03_value.innerHTML = ac_03;
    ac_03_unit.innerHTML = (ac_03 == "OFF") ? "" : "°C";
});

// Khi thay doi gia tri thanh truot
ac_03_slider.addEventListener("input", function() {
    // Lấy giá trị hiện tại của thanh trượt
    var currentValue = parseFloat(ac_03_slider.value);
    if (currentValue == 33) {
      currentValue = "OFF";
  }
    // Cập nhật giá trị lên Firebase
    firebase.database().ref("/Bedroom/Electric devices/Air conditioner").set(currentValue);

    // Cập nhật giá trị hiển thị
    ac_03_value.innerHTML = currentValue;
});

var fan_03_btn = document.getElementById("fan-br-btn"); 
fan_03_btn.onclick = function(){  
      firebase.database().ref("/Bedroom/Electric devices").once("value").then(function(snapshot) {
        var currentStatus = snapshot.child("Fan").val();
            // Chuyển đổi trạng thái
        var newStatus = (currentStatus === "OFF") ? "ON" : "OFF";
            // Cập nhật trạng thái mới vào Firebase
        firebase.database().ref("/Bedroom/Electric devices").update({
          "Fan": newStatus
        });
      });
};

var pc_btn = document.getElementById("pc-btn"); 
pc_btn.onclick = function(){  
      firebase.database().ref("/Bedroom/Electric devices").once("value").then(function(snapshot) {
        var currentStatus = snapshot.child("PC").val();
        
            // Chuyển đổi trạng thái
        var newStatus = (currentStatus === "OFF") ? "ON" : "OFF";
        
            // Cập nhật trạng thái mới vào Firebase
        firebase.database().ref("/Bedroom/Electric devices").update({
          "PC": newStatus
        });
      });
};

var curtain_value = document.getElementById("curtainValue");
var curtain_slider = document.getElementById("curtain-slider");
firebase.database().ref("/Bedroom/Electric devices/Curtain").on("value", function(snapshot) {
    var spk = snapshot.val();
    // Đặt giá trị từ Firebase cho thanh trượt
    curtain_slider.value = spk;
    // Áp dụng hiệu ứng cho thanh trượt
    var valuePercentage = (curtain_slider.value - curtain_slider.min) / (curtain_slider.max - curtain_slider.min) * 100;
    curtain_slider.style.background = 'linear-gradient(to right, #6c9bcf 0%, #6c9bcf ' + valuePercentage + '%, #7d8da1 ' + valuePercentage + '%, #7d8da1 100%)';

    // Cập nhật giá trị hiển thị
    curtain_value.innerHTML = spk;
});

// Khi thay doi gia tri thanh truot
curtain_slider.addEventListener("input", function() {
    // Lấy giá trị hiện tại của thanh trượt
    var currentValue = parseFloat(curtain_slider.value);
    // Cập nhật giá trị lên Firebase
    firebase.database().ref("/Bedroom/Electric devices/Curtain").set(currentValue);

    // Cập nhật giá trị hiển thị
    curtain_value.innerHTML = currentValue;
});

// Sensor /////////////
// Living room //////////////
firebase.database().ref("/Living room/Sensors/Temperature").on("value", function(snapshot) {
  var temp_lr = snapshot.val();
  document.getElementById("temp_01").innerHTML = temp_lr;
});
firebase.database().ref("/Living room/Sensors/Humidity").on("value", function(snapshot) {
  var hum_lr = snapshot.val();
  document.getElementById("hum_01").innerHTML = hum_lr;
});
firebase.database().ref("/Living room/Sensors/Gas concentration").on("value", function(snapshot) {
  var gas_lr = snapshot.val();
  document.getElementById("gas_01").innerHTML = gas_lr;
});
firebase.database().ref("/Living room/Sensors/Brightness").on("value", function(snapshot) {
  var bright_lr = snapshot.val();
  document.getElementById("bright_01").innerHTML = bright_lr;
});

// Kitchen ///////////////
firebase.database().ref("/Kitchen/Sensors/Temperature").on("value", function(snapshot) {
  var temp_kc = snapshot.val();
  document.getElementById("temp_02").innerHTML = temp_kc;
});
firebase.database().ref("/Kitchen/Sensors/Humidity").on("value", function(snapshot) {
  var hum_kc = snapshot.val();
  document.getElementById("hum_02").innerHTML = hum_kc;
});
firebase.database().ref("/Kitchen/Sensors/Gas concentration").on("value", function(snapshot) {
  var gas_kc = snapshot.val();
  document.getElementById("gas_02").innerHTML = gas_kc;
});
firebase.database().ref("/Kitchen/Sensors/Brightness").on("value", function(snapshot) {
  var bright_kc = snapshot.val();
  document.getElementById("bright_02").innerHTML = bright_kc;
});

// Bedroom //////////////
firebase.database().ref("/Bedroom/Sensors/Temperature").on("value", function(snapshot) {
  var temp_lr = snapshot.val();
  document.getElementById("temp_03").innerHTML = temp_lr;
});
firebase.database().ref("/Bedroom/Sensors/Humidity").on("value", function(snapshot) {
  var hum_lr = snapshot.val();
  document.getElementById("hum_03").innerHTML = hum_lr;
});
firebase.database().ref("/Bedroom/Sensors/Gas concentration").on("value", function(snapshot) {
  var gas_lr = snapshot.val();
  document.getElementById("gas_03").innerHTML = gas_lr;
});
firebase.database().ref("/Bedroom/Sensors/Brightness").on("value", function(snapshot) {
  var bright_lr = snapshot.val();
  document.getElementById("bright_03").innerHTML = bright_lr;
});

// Electric devices auto update/////////////
// Living room //////////////
firebase.database().ref("/Living room/Electric devices/Light").on("value", function(snapshot) {
  var light_01 = snapshot.val();
  document.getElementById("light-lr-status").innerHTML = light_01;
  document.getElementById("light-timer-state-lr").innerHTML = light_01;
  if (light_01 == 'ON') {
    document.getElementById("light-lr-img").src = "./img/light-on.png";
    document.getElementById("light-lr-btn").checked = true;
  }
  else {
    document.getElementById("light-lr-img").src = "./img/light-off.png";
    document.getElementById("light-lr-btn").checked = false;
  }
});

firebase.database().ref("/Living room/Electric devices/Lamp").on("value", function(snapshot) {
  var lamp_01 = snapshot.val();
  document.getElementById("lamp-lr-status").innerHTML = lamp_01;
  document.getElementById("lamp-timer-state-lr").innerHTML = lamp_01;
  if (lamp_01 == 'ON') {
    document.getElementById("lamp-lr-img").src = "./img/lamp-on.png";
    document.getElementById("lamp-lr-btn").checked = true;
  }
  else {
    document.getElementById("lamp-lr-img").src = "./img/lamp-off.png";
    document.getElementById("lamp-lr-btn").checked = false;
  }
});

firebase.database().ref("/Living room/Electric devices/Air conditioner").on("value", function(snapshot) {
  var ac_01 = snapshot.val();
  if (ac_01 < 21) {
    document.getElementById("ac-lr-img").src = "./img/air-conditioning(16-21).png";
  }
  else if (21 <= ac_01 && ac_01 <= 27) {
    document.getElementById("ac-lr-img").src = "./img/air-conditioning(21-27).png";
  }
  else if (27 < ac_01 && ac_01 <= 32) {
    document.getElementById("ac-lr-img").src = "./img/air-conditioning(27-32).png";
  }
  else {
    document.getElementById("ac-lr-img").src = "./img/air-conditioning-off.png";
  }
});

firebase.database().ref("/Living room/Electric devices/Fan").on("value", function(snapshot) {
  var fan_01 = snapshot.val();
  var fan_01_img = document.getElementById("fan-lr-img");
  document.getElementById("fan-lr-status").innerHTML = fan_01;
  document.getElementById("fan-timer-state-lr").innerHTML = fan_01;
  if (fan_01 == 'ON') {
    document.getElementById("fan-lr-img").src = "./img/fan-on.png";
    fan_01_img.classList.add('rotate');
    document.getElementById("fan-lr-btn").checked = true;
  }
  else {
    document.getElementById("fan-lr-img").src = "./img/fan-off.png";
    fan_01_img.classList.remove('rotate');
    document.getElementById("fan-lr-btn").checked = false;
  }
});

firebase.database().ref("/Living room/Electric devices/TV").on("value", function(snapshot) {
  var tv = snapshot.val();
  document.getElementById("tv-status").innerHTML = tv;
  document.getElementById("tv-timer-state-lr").innerHTML = tv;
  if (tv == 'ON') {
    document.getElementById("tv-img").src = "./img/tv-on.png";
    document.getElementById("tv-btn").checked = true;
  }
  else {
    document.getElementById("tv-img").src = "./img/tv-off.png";
    document.getElementById("tv-btn").checked = false;
  }
});

firebase.database().ref("/Living room/Electric devices/Speaker").on("value", function(snapshot) {
  var spk = snapshot.val();
  if (spk == 0) {
    document.getElementById("speaker-img").src = "./img/loud-speaker.png";
  }
  else if (spk > 0 && spk <= 50) {
    document.getElementById("speaker-img").src = "./img/loud-speaker-50.png";
  }
  else {
    document.getElementById("speaker-img").src = "./img/loud-speaker-100.png";
  }
});

// Kitchen //////////////////////
firebase.database().ref("/Kitchen/Electric devices/Light").on("value", function(snapshot) {
  var light_02 = snapshot.val();
  document.getElementById("light-kc-status").innerHTML = light_02;
  document.getElementById("light-timer-state-kc").innerHTML = light_02;
  if (light_02 == 'ON') {
    document.getElementById("light-kc-img").src = "./img/light-on.png";
    document.getElementById("light-kc-btn").checked = true;
  }
  else {
    document.getElementById("light-kc-img").src = "./img/light-off.png";
    document.getElementById("light-kc-btn").checked = false;
  }
});

firebase.database().ref("/Kitchen/Electric devices/Air conditioner").on("value", function(snapshot) {
  var ac_02 = snapshot.val();
  if (ac_02 < 21) {
    document.getElementById("ac-kc-img").src = "./img/air-conditioning(16-21).png";
  }
  else if (21 <= ac_02 && ac_02 <= 27) {
    document.getElementById("ac-kc-img").src = "./img/air-conditioning(21-27).png";
  }
  else if (27 < ac_02 && ac_02 <= 32) {
    document.getElementById("ac-kc-img").src = "./img/air-conditioning(27-32).png";
  }
  else {
    document.getElementById("ac-kc-img").src = "./img/air-conditioning-off.png";
  }
});

firebase.database().ref("/Kitchen/Electric devices/Fridge").on("value", function(snapshot) {
  var fridge = snapshot.val();
  if (fridge == 'OFF') {
    document.getElementById("fridge-img").src = "./img/refrigerator-off.png";
  }
  else {
    document.getElementById("fridge-img").src = "./img/refrigerator-on.png";
    document.getElementById('fridge-img').style.opacity = (fridge / 100)*4 + 1;
  }
});

firebase.database().ref("/Kitchen/Electric devices/Hood").on("value", function(snapshot) {
  var hood = snapshot.val();
  document.getElementById("hood-status").innerHTML = hood;
  document.getElementById("hood-timer-state-kc").innerHTML = hood;
  if (hood == 'ON') {
    document.getElementById("hood-img").src = "./img/hood-on.png";
    document.getElementById("hood-btn").checked = true;
  }
  else {
    document.getElementById("hood-img").src = "./img/hood-off.png";
    document.getElementById("hood-btn").checked = false;
  }
});

firebase.database().ref("/Kitchen/Electric devices/Cooker").on("value", function(snapshot) {
  var cooker = snapshot.val();
  document.getElementById("cooker-status").innerHTML = cooker;
  document.getElementById("cooker-timer-state-kc").innerHTML = cooker;
  if (cooker == 'ON') {
    document.getElementById("cooker-img").src = "./img/cooker-on.png";
    document.getElementById("cooker-btn").checked = true;
  }
  else {
    document.getElementById("cooker-img").src = "./img/cooker-off.png";
    document.getElementById("cooker-btn").checked = false;
  }
});

firebase.database().ref("/Kitchen/Electric devices/Stove").on("value", function(snapshot) {
  var stove = snapshot.val();
  document.getElementById("stove-status").innerHTML = stove;
  document.getElementById("stove-timer-state-kc").innerHTML = stove;
  if (stove == 'ON') {
    document.getElementById("stove-img").src = "./img/stove-on.png";
    document.getElementById("stove-btn").checked = true;
  }
  else {
    document.getElementById("stove-img").src = "./img/stove-off.png";
    document.getElementById("stove-btn").checked = false;
  }
});

// Bedroom //////////
firebase.database().ref("/Bedroom/Electric devices/Light").on("value", function(snapshot) {
  var light_03 = snapshot.val();
  document.getElementById("light-br-status").innerHTML = light_03;
  document.getElementById("light-timer-state-br").innerHTML = light_03;
  if (light_03 == 'ON') {
    document.getElementById("light-br-img").src = "./img/light-on.png";
    document.getElementById("light-br-btn").checked = true;
  }
  else {
    document.getElementById("light-br-img").src = "./img/light-off.png";
    document.getElementById("light-br-btn").checked = false;
  }
});

firebase.database().ref("/Bedroom/Electric devices/Lamp").on("value", function(snapshot) {
  var lamp_03 = snapshot.val();
  document.getElementById("lamp-br-status").innerHTML = lamp_03;
  document.getElementById("lamp-timer-state-br").innerHTML = lamp_03;
  if (lamp_03 == 'ON') {
    document.getElementById("lamp-br-img").src = "./img/lamp-on.png";
    document.getElementById("lamp-br-btn").checked = true;
  }
  else {
    document.getElementById("lamp-br-img").src = "./img/lamp-off.png";
    document.getElementById("lamp-br-btn").checked = false;
  }
});

firebase.database().ref("/Bedroom/Electric devices/Air conditioner").on("value", function(snapshot) {
  var ac_03 = snapshot.val();
  if (ac_03 < 21) {
    document.getElementById("ac-br-img").src = "./img/air-conditioning(16-21).png";
  }
  else if (21 <= ac_03 && ac_03 <= 27) {
    document.getElementById("ac-br-img").src = "./img/air-conditioning(21-27).png";
  }
  else if (27 < ac_03 && ac_03 <= 32) {
    document.getElementById("ac-br-img").src = "./img/air-conditioning(27-32).png";
  }
  else {
    document.getElementById("ac-br-img").src = "./img/air-conditioning-off.png";
  }
});

firebase.database().ref("/Bedroom/Electric devices/Fan").on("value", function(snapshot) {
  var fan_03 = snapshot.val();
  var fan_03_img = document.getElementById("fan-br-img");
  document.getElementById("fan-br-status").innerHTML = fan_03;
  document.getElementById("fan-timer-state-br").innerHTML = fan_03;
  if (fan_03 == 'ON') {
    document.getElementById("fan-br-img").src = "./img/fan-on.png";
    fan_03_img.classList.add('rotate');
    document.getElementById("fan-br-btn").checked = true;
  }
  else {
    document.getElementById("fan-br-img").src = "./img/fan-off.png";
    fan_03_img.classList.remove('rotate');
    document.getElementById("fan-br-btn").checked = false;
  }
});

firebase.database().ref("/Bedroom/Electric devices/PC").on("value", function(snapshot) {
  var pc = snapshot.val();
  document.getElementById("pc-status").innerHTML = pc;
  document.getElementById("pc-timer-state-br").innerHTML = pc;
  if (pc == 'ON') {
    document.getElementById("pc-img").src = "./img/pc-on.png";
    document.getElementById("pc-btn").checked = true;
  }
  else {
    document.getElementById("pc-img").src = "./img/pc-off.png";
    document.getElementById("pc-btn").checked = false;
  }
});

firebase.database().ref("/Bedroom/Electric devices/Curtain").on("value", function(snapshot) {
  var curtain = snapshot.val();
  if (curtain == 1) {
    document.getElementById("curtain-img").src = "./img/curtains.png";
  }
  else if (curtain == 2) {
    document.getElementById("curtain-img").src = "./img/curtains1.png";
  }
  else if (curtain == 3) {
    document.getElementById("curtain-img").src = "./img/curtains2.png";
  }
  else {
    document.getElementById("curtain-img").src = "./img/curtains3.png";
  }
});

// Set timeeeeeeeeeeeeeee
function switchTab(event, tabId) {
  var i, tabcontent, tablinks;

  // Ẩn tất cả các nội dung tab
  tabcontent = document.getElementsByClassName("tab-content");
  for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("select");

  // Loại bỏ class "active" từ tất cả các links
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].classList.remove("select");
  }

  // Hiển thị phần tử được chọn và thêm class "active" cho link
  var targetTab = document.getElementById(tabId);
  if (targetTab) {
      if (targetTab.style.display !== "flex") {
          targetTab.style.display = "block";
          event.currentTarget.classList.add("select");
      }
  }
  // Ngăn chặn mặc định của sự kiện (ví dụ: chặn link từ việc chuyển hướng)
  event.preventDefault();
}

// Livingroom
$(document).ready(function() {
  var circleLength = 2 * Math.PI * 110; // Độ dài vòng tròn
  var timer_light_lr = null;
  var timer_lamp_lr = null;
  var timer_fan_lr = null;
  var timer_tv_lr = null;
  var timer_light_kc = null;
  var timer_hood_kc = null;
  var timer_cooker_kc = null;
  var timer_stove_kc = null;
  var timer_light_br = null;
  var timer_lamp_br = null;
  var timer_fan_br = null;
  var timer_pc_br = null;
  // Sự kiện click cho nút bắt đầu
  $("#play_btn-light-lr").click(function() {
      if (timer_light_lr) {
          clearInterval(timer_light_lr);
          timer_light_lr = null;
      }

      var minutes = parseInt($("#minutesInput-light-lr").val());
      var totalTime = minutes * 60; // Chuyển đổi phút thành giây
      // Thiết lập độ dài và offset của dash trong circle
      $("#animate-circle-light-lr").css({
          "stroke-dasharray": circleLength,
          "stroke-dashoffset": circleLength
      });

      // Bắt đầu thời gian đếm ngược
      var startTime = Date.now(); // Thời gian bắt đầu đếm ngược
      timer_light_lr = setInterval(function() {
          var elapsedTime = (Date.now() - startTime) / 1000; // Thời gian đã trôi qua tính bằng giây
          var remainingTime = totalTime - elapsedTime;

          if (remainingTime <= 0) {
              clearInterval(timer_light_lr);
              $(".hdisplay-light-lr").text('00');
              $(".mdisplay-light-lr").text('00');
              $(".sdisplay-light-lr").text('00');
              var deviceState = $("#light-timer-state-lr").text();
                deviceState = (deviceState === "ON") ? "OFF" : "ON";
                $("#light-timer-state-lr").text(deviceState); // Thay đổi trạng thái của thiết bị

                // Cập nhật trạng thái mới lên Firebase
                firebase.database().ref("/Living room/Electric devices").update({
                    "Light": deviceState
                });
            return;
        }

          // Tính toán giờ, phút và giây từ thời gian còn lại
          var hours = Math.floor(remainingTime / 3600);
          var minutes = Math.floor((remainingTime % 3600) / 60);
          var seconds = Math.floor(remainingTime % 60);

          // Hiển thị giờ, phút và giây
          $(".hdisplay-light-lr").text(hours < 10 ? "0" + hours : hours);
          $(".mdisplay-light-lr").text(minutes < 10 ? "0" + minutes : minutes);
          $(".sdisplay-light-lr").text(seconds < 10 ? "0" + seconds : seconds);

          $("#light-timeremain-lr").text(hours + "h" + minutes + "m" + seconds + "s");

          // Tính toán và cập nhật vị trí của đường tròn
          var progress = (remainingTime / totalTime);
          var dashOffset = circleLength * progress;
          $("#animate-circle-light-lr").css("stroke-dashoffset", dashOffset);

      }, 1000); // Cập nhật mỗi giây
  });

  $("#play_btn-lamp-lr").click(function() {
    if (timer_lamp_lr) {
        clearInterval(timer_lamp_lr);
        timer_lamp_lr = null;
    }

    var minutes = parseInt($("#minutesInput-lamp-lr").val());
    var totalTime = minutes * 60; // Chuyển đổi phút thành giây
    // Thiết lập độ dài và offset của dash trong circle
    $("#animate-circle-lamp-lr").css({
        "stroke-dasharray": circleLength,
        "stroke-dashoffset": circleLength
    });

    // Bắt đầu thời gian đếm ngược
    var startTime = Date.now(); // Thời gian bắt đầu đếm ngược
    timer_lamp_lr = setInterval(function() {
        var elapsedTime = (Date.now() - startTime) / 1000; // Thời gian đã trôi qua tính bằng giây
        var remainingTime = totalTime - elapsedTime;

        if (remainingTime <= 0) {
            clearInterval(timer_lamp_lr);
            $(".hdisplay-lamp-lr").text('00');
            $(".mdisplay-lamp-lr").text('00');
            $(".sdisplay-lamp-lr").text('00');
            var deviceState = $("#lamp-timer-state-lr").text();
              deviceState = (deviceState === "ON") ? "OFF" : "ON";
              $("#lamp-timer-state-lr").text(deviceState); // Thay đổi trạng thái của thiết bị

              // Cập nhật trạng thái mới lên Firebase
              firebase.database().ref("/Living room/Electric devices").update({
                  "Lamp": deviceState
              });
          return;
      }

        // Tính toán giờ, phút và giây từ thời gian còn lại
        var hours = Math.floor(remainingTime / 3600);
        var minutes = Math.floor((remainingTime % 3600) / 60);
        var seconds = Math.floor(remainingTime % 60);

        // Hiển thị giờ, phút và giây
        $(".hdisplay-lamp-lr").text(hours < 10 ? "0" + hours : hours);
        $(".mdisplay-lamp-lr").text(minutes < 10 ? "0" + minutes : minutes);
        $(".sdisplay-lamp-lr").text(seconds < 10 ? "0" + seconds : seconds);

        $("#lamp-timeremain-lr").text(hours + "h" + minutes + "m" + seconds + "s");

        // Tính toán và cập nhật vị trí của đường tròn
        var progress = (remainingTime / totalTime);
        var dashOffset = circleLength * progress;
        $("#animate-circle-lamp-lr").css("stroke-dashoffset", dashOffset);

    }, 1000); // Cập nhật mỗi giây
});

$("#play_btn-fan-lr").click(function() {
  if (timer_fan_lr) {
      clearInterval(timer_fan_lr);
      timer_fan_lr = null;
  }

  var minutes = parseInt($("#minutesInput-fan-lr").val());
  var totalTime = minutes * 60; // Chuyển đổi phút thành giây
  // Thiết lập độ dài và offset của dash trong circle
  $("#animate-circle-fan-lr").css({
      "stroke-dasharray": circleLength,
      "stroke-dashoffset": circleLength
  });

  // Bắt đầu thời gian đếm ngược
  var startTime = Date.now(); // Thời gian bắt đầu đếm ngược
  timer_fan_lr = setInterval(function() {
      var elapsedTime = (Date.now() - startTime) / 1000; // Thời gian đã trôi qua tính bằng giây
      var remainingTime = totalTime - elapsedTime;

      if (remainingTime <= 0) {
          clearInterval(timer_fan_lr);
          $(".hdisplay-fan-lr").text('00');
          $(".mdisplay-fan-lr").text('00');
          $(".sdisplay-fan-lr").text('00');
          var deviceState = $("#fan-timer-state-lr").text();
            deviceState = (deviceState === "ON") ? "OFF" : "ON";
            $("#fan-timer-state-lr").text(deviceState); // Thay đổi trạng thái của thiết bị

            // Cập nhật trạng thái mới lên Firebase
            firebase.database().ref("/Living room/Electric devices").update({
                "Fan": deviceState
            });
        return;
    }

      // Tính toán giờ, phút và giây từ thời gian còn lại
      var hours = Math.floor(remainingTime / 3600);
      var minutes = Math.floor((remainingTime % 3600) / 60);
      var seconds = Math.floor(remainingTime % 60);

      // Hiển thị giờ, phút và giây
      $(".hdisplay-fan-lr").text(hours < 10 ? "0" + hours : hours);
      $(".mdisplay-fan-lr").text(minutes < 10 ? "0" + minutes : minutes);
      $(".sdisplay-fan-lr").text(seconds < 10 ? "0" + seconds : seconds);

      $("#fan-timeremain-lr").text(hours + "h" + minutes + "m" + seconds + "s");

      // Tính toán và cập nhật vị trí của đường tròn
      var progress = (remainingTime / totalTime);
      var dashOffset = circleLength * progress;
      $("#animate-circle-fan-lr").css("stroke-dashoffset", dashOffset);

  }, 1000); // Cập nhật mỗi giây
});

$("#play_btn-tv-lr").click(function() {
  if (timer_tv_lr) {
      clearInterval(timer_tv_lr);
      timer_tv_lr = null;
  }

  var minutes = parseInt($("#minutesInput-tv-lr").val());
  var totalTime = minutes * 60; // Chuyển đổi phút thành giây
  // Thiết lập độ dài và offset của dash trong circle
  $("#animate-circle-tv-lr").css({
      "stroke-dasharray": circleLength,
      "stroke-dashoffset": circleLength
  });

  // Bắt đầu thời gian đếm ngược
  var startTime = Date.now(); // Thời gian bắt đầu đếm ngược
  timer_tv_lr = setInterval(function() {
      var elapsedTime = (Date.now() - startTime) / 1000; // Thời gian đã trôi qua tính bằng giây
      var remainingTime = totalTime - elapsedTime;

      if (remainingTime <= 0) {
          clearInterval(timer_tv_lr);
          $(".hdisplay-tv-lr").text('00');
          $(".mdisplay-tv-lr").text('00');
          $(".sdisplay-tv-lr").text('00');
          var deviceState = $("#tv-timer-state-lr").text();
            deviceState = (deviceState === "ON") ? "OFF" : "ON";
            $("#tv-timer-state-lr").text(deviceState); // Thay đổi trạng thái của thiết bị

            // Cập nhật trạng thái mới lên Firebase
            firebase.database().ref("/Living room/Electric devices").update({
                "TV": deviceState
            });
        return;
    }

      // Tính toán giờ, phút và giây từ thời gian còn lại
      var hours = Math.floor(remainingTime / 3600);
      var minutes = Math.floor((remainingTime % 3600) / 60);
      var seconds = Math.floor(remainingTime % 60);

      // Hiển thị giờ, phút và giây
      $(".hdisplay-tv-lr").text(hours < 10 ? "0" + hours : hours);
      $(".mdisplay-tv-lr").text(minutes < 10 ? "0" + minutes : minutes);
      $(".sdisplay-tv-lr").text(seconds < 10 ? "0" + seconds : seconds);

      $("#tv-timeremain-lr").text(hours + "h" + minutes + "m" + seconds + "s");

      // Tính toán và cập nhật vị trí của đường tròn
      var progress = (remainingTime / totalTime);
      var dashOffset = circleLength * progress;
      $("#animate-circle-tv-lr").css("stroke-dashoffset", dashOffset);

  }, 1000); // Cập nhật mỗi giây
});

$("#play_btn-light-kc").click(function() {
  if (timer_light_kc) {
      clearInterval(timer_light_kc);
      timer_light_kc = null;
  }

  var minutes = parseInt($("#minutesInput-light-kc").val());
  var totalTime = minutes * 60; // Chuyển đổi phút thành giây
  // Thiết lập độ dài và offset của dash trong circle
  $("#animate-circle-light-kc").css({
      "stroke-dasharray": circleLength,
      "stroke-dashoffset": circleLength
  });

  // Bắt đầu thời gian đếm ngược
  var startTime = Date.now(); // Thời gian bắt đầu đếm ngược
  timer_light_kc = setInterval(function() {
      var elapsedTime = (Date.now() - startTime) / 1000; // Thời gian đã trôi qua tính bằng giây
      var remainingTime = totalTime - elapsedTime;

      if (remainingTime <= 0) {
          clearInterval(timer_light_kc);
          $(".hdisplay-light-kc").text('00');
          $(".mdisplay-light-kc").text('00');
          $(".sdisplay-light-kc").text('00');
          var deviceState = $("#light-timer-state-kc").text();
            deviceState = (deviceState === "ON") ? "OFF" : "ON";
            $("#light-timer-state-kc").text(deviceState); // Thay đổi trạng thái của thiết bị

            // Cập nhật trạng thái mới lên Firebase
            firebase.database().ref("/Kitchen/Electric devices").update({
                "Light": deviceState
            });
        return;
    }

      // Tính toán giờ, phút và giây từ thời gian còn lại
      var hours = Math.floor(remainingTime / 3600);
      var minutes = Math.floor((remainingTime % 3600) / 60);
      var seconds = Math.floor(remainingTime % 60);

      // Hiển thị giờ, phút và giây
      $(".hdisplay-light-kc").text(hours < 10 ? "0" + hours : hours);
      $(".mdisplay-light-kc").text(minutes < 10 ? "0" + minutes : minutes);
      $(".sdisplay-light-kc").text(seconds < 10 ? "0" + seconds : seconds);

      $("#light-timeremain-kc").text(hours + "h" + minutes + "m" + seconds + "s");

      // Tính toán và cập nhật vị trí của đường tròn
      var progress = (remainingTime / totalTime);
      var dashOffset = circleLength * progress;
      $("#animate-circle-light-kc").css("stroke-dashoffset", dashOffset);

  }, 1000); // Cập nhật mỗi giây
});

$("#play_btn-hood-kc").click(function() {
  if (timer_hood_kc) {
      clearInterval(timer_hood_kc);
      timer_hood_kc = null;
  }

  var minutes = parseInt($("#minutesInput-hood-kc").val());
  var totalTime = minutes * 60; // Chuyển đổi phút thành giây
  // Thiết lập độ dài và offset của dash trong circle
  $("#animate-circle-hood-kc").css({
      "stroke-dasharray": circleLength,
      "stroke-dashoffset": circleLength
  });

  // Bắt đầu thời gian đếm ngược
  var startTime = Date.now(); // Thời gian bắt đầu đếm ngược
  timer_hood_kc = setInterval(function() {
      var elapsedTime = (Date.now() - startTime) / 1000; // Thời gian đã trôi qua tính bằng giây
      var remainingTime = totalTime - elapsedTime;

      if (remainingTime <= 0) {
          clearInterval(timer_hood_kc);
          $(".hdisplay-hood-kc").text('00');
          $(".mdisplay-hood-kc").text('00');
          $(".sdisplay-hood-kc").text('00');
          var deviceState = $("#hood-timer-state-kc").text();
            deviceState = (deviceState === "ON") ? "OFF" : "ON";
            $("#hood-timer-state-kc").text(deviceState); // Thay đổi trạng thái của thiết bị

            // Cập nhật trạng thái mới lên Firebase
            firebase.database().ref("/Kitchen/Electric devices").update({
                "Hood": deviceState
            });
        return;
    }

      // Tính toán giờ, phút và giây từ thời gian còn lại
      var hours = Math.floor(remainingTime / 3600);
      var minutes = Math.floor((remainingTime % 3600) / 60);
      var seconds = Math.floor(remainingTime % 60);

      // Hiển thị giờ, phút và giây
      $(".hdisplay-hood-kc").text(hours < 10 ? "0" + hours : hours);
      $(".mdisplay-hood-kc").text(minutes < 10 ? "0" + minutes : minutes);
      $(".sdisplay-hood-kc").text(seconds < 10 ? "0" + seconds : seconds);

      $("#hood-timeremain-kc").text(hours + "h" + minutes + "m" + seconds + "s");

      // Tính toán và cập nhật vị trí của đường tròn
      var progress = (remainingTime / totalTime);
      var dashOffset = circleLength * progress;
      $("#animate-circle-hood-kc").css("stroke-dashoffset", dashOffset);

  }, 1000); // Cập nhật mỗi giây
});

$("#play_btn-cooker-kc").click(function() {
  if (timer_cooker_kc) {
      clearInterval(timer_cooker_kc);
      timer_cooker_kc = null;
  }

  var minutes = parseInt($("#minutesInput-cooker-kc").val());
  var totalTime = minutes * 60; // Chuyển đổi phút thành giây
  // Thiết lập độ dài và offset của dash trong circle
  $("#animate-circle-cooker-kc").css({
      "stroke-dasharray": circleLength,
      "stroke-dashoffset": circleLength
  });

  // Bắt đầu thời gian đếm ngược
  var startTime = Date.now(); // Thời gian bắt đầu đếm ngược
  timer_cooker_kc = setInterval(function() {
      var elapsedTime = (Date.now() - startTime) / 1000; // Thời gian đã trôi qua tính bằng giây
      var remainingTime = totalTime - elapsedTime;

      if (remainingTime <= 0) {
          clearInterval(timer_cooker_kc);
          $(".hdisplay-cooker-kc").text('00');
          $(".mdisplay-cooker-kc").text('00');
          $(".sdisplay-cooker-kc").text('00');
          var deviceState = $("#cooker-timer-state-kc").text();
            deviceState = (deviceState === "ON") ? "OFF" : "ON";
            $("#cooker-timer-state-kc").text(deviceState); // Thay đổi trạng thái của thiết bị

            // Cập nhật trạng thái mới lên Firebase
            firebase.database().ref("/Kitchen/Electric devices").update({
                "Cooker": deviceState
            });
        return;
    }

      // Tính toán giờ, phút và giây từ thời gian còn lại
      var hours = Math.floor(remainingTime / 3600);
      var minutes = Math.floor((remainingTime % 3600) / 60);
      var seconds = Math.floor(remainingTime % 60);

      // Hiển thị giờ, phút và giây
      $(".hdisplay-cooker-kc").text(hours < 10 ? "0" + hours : hours);
      $(".mdisplay-cooker-kc").text(minutes < 10 ? "0" + minutes : minutes);
      $(".sdisplay-cooker-kc").text(seconds < 10 ? "0" + seconds : seconds);

      $("#cooker-timeremain-kc").text(hours + "h" + minutes + "m" + seconds + "s");

      // Tính toán và cập nhật vị trí của đường tròn
      var progress = (remainingTime / totalTime);
      var dashOffset = circleLength * progress;
      $("#animate-circle-cooker-kc").css("stroke-dashoffset", dashOffset);

  }, 1000); // Cập nhật mỗi giây
});

$("#play_btn-stove-kc").click(function() {
  if (timer_stove_kc) {
      clearInterval(timer_stove_kc);
      timer_stove_kc = null;
  }

  var minutes = parseInt($("#minutesInput-stove-kc").val());
  var totalTime = minutes * 60; // Chuyển đổi phút thành giây
  // Thiết lập độ dài và offset của dash trong circle
  $("#animate-circle-stove-kc").css({
      "stroke-dasharray": circleLength,
      "stroke-dashoffset": circleLength
  });

  // Bắt đầu thời gian đếm ngược
  var startTime = Date.now(); // Thời gian bắt đầu đếm ngược
  timer_stove_kc = setInterval(function() {
      var elapsedTime = (Date.now() - startTime) / 1000; // Thời gian đã trôi qua tính bằng giây
      var remainingTime = totalTime - elapsedTime;

      if (remainingTime <= 0) {
          clearInterval(timer_stove_kc);
          $(".hdisplay-stove-kc").text('00');
          $(".mdisplay-stove-kc").text('00');
          $(".sdisplay-stove-kc").text('00');
          var deviceState = $("#stove-timer-state-kc").text();
            deviceState = (deviceState === "ON") ? "OFF" : "ON";
            $("#stove-timer-state-kc").text(deviceState); // Thay đổi trạng thái của thiết bị

            // Cập nhật trạng thái mới lên Firebase
            firebase.database().ref("/Kitchen/Electric devices").update({
                "Stove": deviceState
            });
        return;
    }

      // Tính toán giờ, phút và giây từ thời gian còn lại
      var hours = Math.floor(remainingTime / 3600);
      var minutes = Math.floor((remainingTime % 3600) / 60);
      var seconds = Math.floor(remainingTime % 60);

      // Hiển thị giờ, phút và giây
      $(".hdisplay-stove-kc").text(hours < 10 ? "0" + hours : hours);
      $(".mdisplay-stove-kc").text(minutes < 10 ? "0" + minutes : minutes);
      $(".sdisplay-stove-kc").text(seconds < 10 ? "0" + seconds : seconds);

      $("#stove-timeremain-kc").text(hours + "h" + minutes + "m" + seconds + "s");

      // Tính toán và cập nhật vị trí của đường tròn
      var progress = (remainingTime / totalTime);
      var dashOffset = circleLength * progress;
      $("#animate-circle-stove-kc").css("stroke-dashoffset", dashOffset);

  }, 1000); // Cập nhật mỗi giây
});

$("#play_btn-light-br").click(function() {
  if (timer_light_br) {
      clearInterval(timer_light_br);
      timer_light_br = null;
  }

  var minutes = parseInt($("#minutesInput-light-br").val());
  var totalTime = minutes * 60; // Chuyển đổi phút thành giây
  // Thiết lập độ dài và offset của dash trong circle
  $("#animate-circle-light-br").css({
      "stroke-dasharray": circleLength,
      "stroke-dashoffset": circleLength
  });

  // Bắt đầu thời gian đếm ngược
  var startTime = Date.now(); // Thời gian bắt đầu đếm ngược
  timer_light_br = setInterval(function() {
      var elapsedTime = (Date.now() - startTime) / 1000; // Thời gian đã trôi qua tính bằng giây
      var remainingTime = totalTime - elapsedTime;

      if (remainingTime <= 0) {
          clearInterval(timer_light_br);
          $(".hdisplay-light-br").text('00');
          $(".mdisplay-light-br").text('00');
          $(".sdisplay-light-br").text('00');
          var deviceState = $("#light-timer-state-br").text();
            deviceState = (deviceState === "ON") ? "OFF" : "ON";
            $("#light-timer-state-br").text(deviceState); // Thay đổi trạng thái của thiết bị

            // Cập nhật trạng thái mới lên Firebase
            firebase.database().ref("/Bedroom/Electric devices").update({
                "Light": deviceState
            });
        return;
    }

      // Tính toán giờ, phút và giây từ thời gian còn lại
      var hours = Math.floor(remainingTime / 3600);
      var minutes = Math.floor((remainingTime % 3600) / 60);
      var seconds = Math.floor(remainingTime % 60);

      // Hiển thị giờ, phút và giây
      $(".hdisplay-light-br").text(hours < 10 ? "0" + hours : hours);
      $(".mdisplay-light-br").text(minutes < 10 ? "0" + minutes : minutes);
      $(".sdisplay-light-br").text(seconds < 10 ? "0" + seconds : seconds);

      $("#light-timeremain-br").text(hours + "h" + minutes + "m" + seconds + "s");

      // Tính toán và cập nhật vị trí của đường tròn
      var progress = (remainingTime / totalTime);
      var dashOffset = circleLength * progress;
      $("#animate-circle-light-br").css("stroke-dashoffset", dashOffset);

  }, 1000); // Cập nhật mỗi giây
});

$("#play_btn-lamp-br").click(function() {
if (timer_lamp_br) {
    clearInterval(timer_lamp_br);
    timer_lamp_br = null;
}

var minutes = parseInt($("#minutesInput-lamp-br").val());
var totalTime = minutes * 60; // Chuyển đổi phút thành giây
// Thiết lập độ dài và offset của dash trong circle
$("#animate-circle-lamp-br").css({
    "stroke-dasharray": circleLength,
    "stroke-dashoffset": circleLength
});

// Bắt đầu thời gian đếm ngược
var startTime = Date.now(); // Thời gian bắt đầu đếm ngược
timer_lamp_br = setInterval(function() {
    var elapsedTime = (Date.now() - startTime) / 1000; // Thời gian đã trôi qua tính bằng giây
    var remainingTime = totalTime - elapsedTime;

    if (remainingTime <= 0) {
        clearInterval(timer_lamp_br);
        $(".hdisplay-lamp-br").text('00');
        $(".mdisplay-lamp-br").text('00');
        $(".sdisplay-lamp-br").text('00');
        var deviceState = $("#lamp-timer-state-br").text();
          deviceState = (deviceState === "ON") ? "OFF" : "ON";
          $("#lamp-timer-state-br").text(deviceState); // Thay đổi trạng thái của thiết bị

          // Cập nhật trạng thái mới lên Firebase
          firebase.database().ref("/Bedroom/Electric devices").update({
              "Lamp": deviceState
          });
      return;
  }

    // Tính toán giờ, phút và giây từ thời gian còn lại
    var hours = Math.floor(remainingTime / 3600);
    var minutes = Math.floor((remainingTime % 3600) / 60);
    var seconds = Math.floor(remainingTime % 60);

    // Hiển thị giờ, phút và giây
    $(".hdisplay-lamp-br").text(hours < 10 ? "0" + hours : hours);
    $(".mdisplay-lamp-br").text(minutes < 10 ? "0" + minutes : minutes);
    $(".sdisplay-lamp-br").text(seconds < 10 ? "0" + seconds : seconds);

    $("#lamp-timeremain-br").text(hours + "h" + minutes + "m" + seconds + "s");

    // Tính toán và cập nhật vị trí của đường tròn
    var progress = (remainingTime / totalTime);
    var dashOffset = circleLength * progress;
    $("#animate-circle-lamp-br").css("stroke-dashoffset", dashOffset);

}, 1000); // Cập nhật mỗi giây
});

$("#play_btn-fan-br").click(function() {
if (timer_fan_br) {
  clearInterval(timer_fan_br);
  timer_fan_br = null;
}

var minutes = parseInt($("#minutesInput-fan-br").val());
var totalTime = minutes * 60; // Chuyển đổi phút thành giây
// Thiết lập độ dài và offset của dash trong circle
$("#animate-circle-fan-br").css({
  "stroke-dasharray": circleLength,
  "stroke-dashoffset": circleLength
});

// Bắt đầu thời gian đếm ngược
var startTime = Date.now(); // Thời gian bắt đầu đếm ngược
timer_fan_br = setInterval(function() {
  var elapsedTime = (Date.now() - startTime) / 1000; // Thời gian đã trôi qua tính bằng giây
  var remainingTime = totalTime - elapsedTime;

  if (remainingTime <= 0) {
      clearInterval(timer_fan_br);
      $(".hdisplay-fan-br").text('00');
      $(".mdisplay-fan-br").text('00');
      $(".sdisplay-fan-br").text('00');
      var deviceState = $("#fan-timer-state-br").text();
        deviceState = (deviceState === "ON") ? "OFF" : "ON";
        $("#fan-timer-state-br").text(deviceState); // Thay đổi trạng thái của thiết bị

        // Cập nhật trạng thái mới lên Firebase
        firebase.database().ref("/Bedroom/Electric devices").update({
            "Fan": deviceState
        });
    return;
}

  // Tính toán giờ, phút và giây từ thời gian còn lại
  var hours = Math.floor(remainingTime / 3600);
  var minutes = Math.floor((remainingTime % 3600) / 60);
  var seconds = Math.floor(remainingTime % 60);

  // Hiển thị giờ, phút và giây
  $(".hdisplay-fan-br").text(hours < 10 ? "0" + hours : hours);
  $(".mdisplay-fan-br").text(minutes < 10 ? "0" + minutes : minutes);
  $(".sdisplay-fan-br").text(seconds < 10 ? "0" + seconds : seconds);

  $("#fan-timeremain-br").text(hours + "h" + minutes + "m" + seconds + "s");

  // Tính toán và cập nhật vị trí của đường tròn
  var progress = (remainingTime / totalTime);
  var dashOffset = circleLength * progress;
  $("#animate-circle-fan-br").css("stroke-dashoffset", dashOffset);

}, 1000); // Cập nhật mỗi giây
});

$("#play_btn-pc-br").click(function() {
if (timer_pc_br) {
  clearInterval(timer_pc_br);
  timer_pc_br = null;
}

var minutes = parseInt($("#minutesInput-pc-br").val());
var totalTime = minutes * 60; // Chuyển đổi phút thành giây
// Thiết lập độ dài và offset của dash trong circle
$("#animate-circle-pc-br").css({
  "stroke-dasharray": circleLength,
  "stroke-dashoffset": circleLength
});

// Bắt đầu thời gian đếm ngược
var startTime = Date.now(); // Thời gian bắt đầu đếm ngược
timer_pc_br = setInterval(function() {
  var elapsedTime = (Date.now() - startTime) / 1000; // Thời gian đã trôi qua tính bằng giây
  var remainingTime = totalTime - elapsedTime;

  if (remainingTime <= 0) {
      clearInterval(timer_pc_br);
      $(".hdisplay-pc-br").text('00');
      $(".mdisplay-pc-br").text('00');
      $(".sdisplay-pc-br").text('00');
      var deviceState = $("#pc-timer-state-br").text();
        deviceState = (deviceState === "ON") ? "OFF" : "ON";
        $("#pc-timer-state-br").text(deviceState); // Thay đổi trạng thái của thiết bị

        // Cập nhật trạng thái mới lên Firebase
        firebase.database().ref("/Bedroom/Electric devices").update({
            "PC": deviceState
        });
    return;
}

  // Tính toán giờ, phút và giây từ thời gian còn lại
  var hours = Math.floor(remainingTime / 3600);
  var minutes = Math.floor((remainingTime % 3600) / 60);
  var seconds = Math.floor(remainingTime % 60);

  // Hiển thị giờ, phút và giây
  $(".hdisplay-pc-br").text(hours < 10 ? "0" + hours : hours);
  $(".mdisplay-pc-br").text(minutes < 10 ? "0" + minutes : minutes);
  $(".sdisplay-pc-br").text(seconds < 10 ? "0" + seconds : seconds);

  $("#pc-timeremain-br").text(hours + "h" + minutes + "m" + seconds + "s");

  // Tính toán và cập nhật vị trí của đường tròn
  var progress = (remainingTime / totalTime);
  var dashOffset = circleLength * progress;
  $("#animate-circle-pc-br").css("stroke-dashoffset", dashOffset);

}, 1000); // Cập nhật mỗi giây
});
});
