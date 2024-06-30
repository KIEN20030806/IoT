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
  console.log(hex);
}


updateColor(); // Khởi tạo màu ban đầu
