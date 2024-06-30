var r2_01_value = document.getElementById("r2Value-lr");
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
      r2_01_value.innerHTML = newValue; 
      console.log(newValue); 
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

  // end Round 2