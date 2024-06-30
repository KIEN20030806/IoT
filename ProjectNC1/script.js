
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
// Control //////////////
var light_01_btn = document.getElementById("light-lr-btn"); 
light_01_btn.onclick = function(){  
      firebase.database().ref("/Control/Sensors").once("value").then(function(snapshot) {
        var currentStatus = snapshot.child("Light").val();
    
        // Chuyển đổi trạng thái
        var newStatus = (currentStatus === "OFF") ? "ON" : "OFF";
    
        // Cập nhật trạng thái mới vào Firebase
        firebase.database().ref("/Control/Sensors").update({
          "Light": newStatus
        });
      });
};


var ac_01_value = document.getElementById("acValue-lr");
var ac_01_slider = document.getElementById("ac-lr-slider");
var ac_01_unit = document.getElementById("ac_lr_unit")
firebase.database().ref("/Control/Slider").on("value", function(snapshot) {
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
    firebase.database().ref("/Control/Slider").set(currentValue);

    // Cập nhật giá trị hiển thị
    ac_01_value.innerHTML = currentValue;
});


var btn_btn = document.getElementById("btn-btn"); 
var oldStatus = "OFF";
btn_btn.onclick = function(){  
      firebase.database().ref("/Control/Button").once("value").then(function(snapshot) {        
            // Chuyển đổi trạng thái
        var newStatus = (oldStatus == "OFF") ? "ON" : "OFF";
        oldStatus = newStatus;        
            // Cập nhật trạng thái mới vào Firebase
        firebase.database().ref("/Control").update({
          "Button": newStatus
        });
      });
};


// Sensor /////////////
// Control //////////////
firebase.database().ref("/Control/Sensors/Temperature").on("value", function(snapshot) {
  var temp_lr = snapshot.val();
  document.getElementById("temp_01").innerHTML = temp_lr;
});
firebase.database().ref("/Control/Sensors/Humidity").on("value", function(snapshot) {
  var hum_lr = snapshot.val();
  document.getElementById("hum_01").innerHTML = hum_lr;
});
firebase.database().ref("/Control/Sensors/Oxi").on("value", function(snapshot) {
  var oxi_lr = snapshot.val();
  document.getElementById("oxi_01").innerHTML = oxi_lr;
});
firebase.database().ref("/Control/Sensors/Brightness").on("value", function(snapshot) {
  var bright_lr = snapshot.val();
  document.getElementById("bright_01").innerHTML = bright_lr;
});


// Control //////////////
firebase.database().ref("/Control/Sensors/Light").on("value", function(snapshot) {
  var light_01 = snapshot.val();
  document.getElementById("light-lr-status").innerHTML = light_01;
  if (light_01 == 'ON') {
    document.getElementById("light-lr-img").src = "./img/light-on.png";
    document.getElementById("light-lr-btn").checked = true;
  }
  else {
    document.getElementById("light-lr-img").src = "./img/light-off.png";
    document.getElementById("light-lr-btn").checked = false;
  }
});



firebase.database().ref("/Control/Button").on("value", function(snapshot) {
  var btn = snapshot.val();
  document.getElementById("btn-status").innerHTML = btn;
  if (btn == 'ON') {
    document.getElementById("btn-img").src = "./img/btn-on.png";
    document.getElementById("btn-btn").checked = true;
  }
  else {
    document.getElementById("btn-img").src = "./img/btn-off.png";
    document.getElementById("btn-btn").checked = false;
  }
});


// round 1
$("#appearance4").roundSlider({
  radius: 60,
  width: 10,
  handleSize: "+10",
  sliderType: "min-range",
  value: "10,60",
  change: function (args) {
    var newValue = args.value; // Lấy giá trị mới từ sự kiện change của RoundSlider
    firebase.database().ref("/Control/Round 1").set(newValue); // Ghi giá trị mới vào cơ sở dữ liệu Firebase
  }
});

firebase.database().ref("/Control/Round 1").on("value",function(snapshot){
  var nd = snapshot.val();  
  $("#appearance4").roundSlider("setValue", nd);
  var r1_01_value = document.getElementById("r1Value-lr");
  r1_01_value.innerHTML = nd;
});
// end round 1

// Round 2
$("#handle1").roundSlider({
  sliderType: "min-range",
  editableTooltip: false,
  radius: 60,
  width: 16,
  value: 75,
  handleSize: 0,
  handleShape: "square",
  circleShape: "pie",
  startAngle: 315,
  tooltipFormat: "changeTooltip",
  change: function (args) {
    var newValue = args.value; // Lấy giá trị mới từ sự kiện change của RoundSlider
    firebase.database().ref("/Control/Round 2").set(newValue); // Ghi giá trị mới vào cơ sở dữ liệu Firebase
  }
});

function changeTooltip(e) {
  var val = e.value, speed;
  if (val < 20) speed = "Slow";
  else if (val < 40) speed = "Normal";
  else if (val < 70) speed = "Speed";
  else speed = "Very Speed";

  return val + " km/h" + "<div>" + speed + "<div>";
}

firebase.database().ref("/Control/Round 2").on("value",function(snapshot){
  var nd = snapshot.val();  
  $("#handle1").roundSlider("setValue", nd);
  var r2_01_value = document.getElementById("r2Value-lr");
  r2_01_value.innerHTML = nd;
 
});
// end Round 2

// Clock
function showTime(){
  var date = new Date();
  var h = date.getHours(); // 0 - 23
  var m = date.getMinutes(); // 0 - 59
  var s = date.getSeconds(); // 0 - 59
  var session = "AM";
  
  if(h == 0){
      h = 12;
  }
  
  if(h > 12){
      h = h - 12;
      session = "PM";
  }
  
  h = (h < 10) ? "0" + h : h;
  m = (m < 10) ? "0" + m : m;
  s = (s < 10) ? "0" + s : s;
  
  var time = h + ":" + m + ":" + s + " " + session;
  document.getElementById("MyClockDisplay").innerText = time;
  document.getElementById("MyClockDisplay").textContent = time;
  
  setTimeout(showTime, 1000);
  
}

showTime();

// END clock

// MAP
function myMap() {
  var mapProp= {
    center:new google.maps.LatLng(51.508742,-0.120850),
    zoom:5,
  };
  var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
  }
// END MAP

// Màu
const redInput = document.getElementById('red');
const greenInput = document.getElementById('green');
const blueInput = document.getElementById('blue');
const hexVal = document.getElementById('hex-val');

redInput.addEventListener('input', updateColor);
greenInput.addEventListener('input', updateColor);
blueInput.addEventListener('input', updateColor);

function updateColor() {
  let red = parseInt(redInput.value);
  let green = parseInt(greenInput.value);
  let blue = parseInt(blueInput.value);

  // Đảm bảo giá trị nằm trong phạm vi từ 0 đến 255
  red = Math.min(255, Math.max(0, red));
  green = Math.min(255, Math.max(0, green));
  blue = Math.min(255, Math.max(0, blue));

  const hex = `#${red.toString(16).padStart(2, '0')}${green.toString(16).padStart(2, '0')}${blue.toString(16).padStart(2, '0')}`;
  hexVal.textContent = hex;
  // Cập nhật giá trị hiển thị
  redInput.nextElementSibling.textContent = red;
  greenInput.nextElementSibling.textContent = green;
  blueInput.nextElementSibling.textContent = blue;
  const mauHienThi = document.querySelector('.mau-hien-thi');
  mauHienThi.style.backgroundColor = hex;
  firebase.database().ref("/Control/Color").set(hex);
}


updateColor(); // Khởi tạo màu ban đầu

// End màu

// Chart1
firebase.database().ref("/Control/Chart").on("value", function(snapshot) {
    const data = snapshot.val();
    // Xử lý dữ liệu và cập nhật biểu đồ
    renderChart(data);
  });

function renderChart(data) {
  const dataPoints = [];
  // Xử lý dữ liệu từ Firebase và tạo dataPoints
  for (let key in data) {
    dataPoints.push({ y: data[key] });
  }
  // Tạo biểu đồ CanvasJS
  const chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    theme: "light2",
    title: {
      text: "Chart"
    },
    data: [{
      type: "line",
      dataPoints: dataPoints
    }]
  });
  chart.render();
}
// End Chart1

// chart2
firebase.database().ref("/Control/Chart2").on("value", function(snapshot) {
  const data = snapshot.val(); 
  rendermyChart(data); 
});

function rendermyChart(data) {
  const xValues = Object.keys(data); 
  const yValues = Object.values(data); 

  const barColors = generateRandomColors(xValues.length);

  new Chart("myChart", { 
    type: "bar",
    data: {
      labels: xValues,
      datasets: [{
        backgroundColor: barColors,
        data: yValues
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true 
        }
      },
      title: {
        display: true,
        text: 'Biểu đồ từ Firebase' 
      },
      tooltips: {
        enabled: true 
      },
      animation: {
        duration: 2000, 
        easing: 'easeInOutQuad' 
      },
      layout: {
        padding: {
          left: 20,
          right: 20,
          top: 0,
          bottom: 20
        }
      }
    }
  });
}

// End chart2

// Chart3
firebase.database().ref("/Control/Chart3").on("value", function(snapshot) {
  const data = snapshot.val(); 
  renderPieChart(data); 
});

function renderPieChart(data) {
  const xValues = Object.keys(data); 
  const yValues = Object.values(data); 

  const pieColors = generateRandomColors(xValues.length);

  new Chart("myPieChart", {
    type: "pie",
    data: {
      labels: xValues,
      datasets: [{
        backgroundColor: pieColors,
        data: yValues
      }]
    },
    options: {
      title: {
        display: true,
        text: "Chart 3"
      }
    }
  });
}

function generateRandomColors(numColors) {
  const colors = [];
  for (let i = 0; i < numColors; i++) {
    const color = '#' + Math.floor(Math.random() * 16777215).toString(16); // Tạo mã màu hex ngẫu nhiên
    colors.push(color);
  }
  return colors;
}

// end chart3

// Chart 4
const xValues = [100,200,300,400,500,600,700,800,900,1000];

firebase.database().ref("/Control/Chart4").on("value", function(snapshot) {
  const data = snapshot.val(); 
  renderLineChart(data); 
});

function renderLineChart(data) {
  new Chart("linechart", { 
    type: "line",
    data: {
      labels: xValues,
      datasets: [{
        data: data.data1,
        borderColor: "red",
        fill: false
      },{
        data: data.data2,
        borderColor: "green",
        fill: false
      },{
        data: data.data3,
        borderColor: "blue",
        fill: false
      }]
    },
    options: {
      legend: {display: false}
    }
  });
}
// end chart 4