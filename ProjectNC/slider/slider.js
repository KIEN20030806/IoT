
// Control //////////////
var ac_01_value = document.getElementById("acValue-lr");
var ac_01_slider = document.getElementById("ac-lr-slider");
var ac_01_unit = document.getElementById("ac_lr_unit")

ac_01_slider.addEventListener("input", function() {
    var currentValue = parseFloat(ac_01_slider.value);
    if (currentValue == 33) {
        currentValue = "OFF";
    }
    ac_01_value.innerHTML = currentValue;
    console.log(currentValue);
});