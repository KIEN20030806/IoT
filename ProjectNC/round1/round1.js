var r1_01_value = document.getElementById("r1Value-lr");
$("#appearance4").roundSlider({
  radius: 60,
  width: 10,
  handleSize: "+10",
  sliderType: "min-range",
  value: "10,60",
  change: function (args) {
    var newValue = args.value; // Lấy giá trị mới từ sự kiện change của RoundSlider
    r1_01_value.innerHTML = newValue;
    console.log(newValue);
  }
  });
  
  // firebase.database().ref("/Control/Round 1").on("value",function(snapshot){
  //   var nd = snapshot.val();  
  //   $("#appearance4").roundSlider("setValue", nd);
  //   var r1_01_value = document.getElementById("r1Value-lr");
  //   r1_01_value.innerHTML = nd;
  // });