const fanButton = document.getElementById('fanButton');
const lightSwitch = document.getElementById('lightSwitch');
const fanSlider = document.getElementById('fanSlider');
const brightnessKnob = document.getElementById('brightnessKnob');

// Xử lý sự kiện cho nút nhấn quạt
fanButton.addEventListener('click', () => {
    // Gửi tín hiệu điều khiển quạt
});

// Xử lý sự kiện cho công tắc đèn
lightSwitch.addEventListener('change', () => {
    // Gửi tín hiệu điều khiển đèn
});

// Xử lý sự kiện thay đổi giá trị thanh trượt tốc độ quạt
fanSlider.addEventListener('input', () => {
    // Gửi tín hiệu điều khiển tốc độ quạt
});

// Xử lý sự kiện thay đổi giá trị núm xoay độ sáng đèn
brightnessKnob.addEventListener('input', () => {
    // Gửi tín hiệu điều khiển độ sáng đèn
});
