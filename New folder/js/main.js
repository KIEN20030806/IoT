// Lấy dữ liệu cảm biến
database.ref('sensors').on('value', (snapshot) => {
    const data = snapshot.val();
    const temperature = data.temperature;
    const humidity = data.humidity;
    const light = data.light;

    // Cập nhật nội dung hiển thị
    document.getElementById('temperature').textContent = `Nhiệt độ: ${temperature}°C`;
    document.getElementById('humidity').textContent = `Độ ẩm: ${humidity}%`;
    document.getElementById('light').textContent = `Ánh sáng: ${light} lux`;

    // Cập nhật biểu đồ
    updateTemperatureChart(temperature);
    updateHumidityChart(humidity);
    updateLightChart(light);
});

// Cập nhật biểu đồ nhiệt độ
function updateTemperatureChart(temperature) {
    const data = temperatureChart.data;
    const labels = data.labels;
    const datasets = data.datasets[0].data;

    labels.push(Date.now());
    datasets.push(temperature);

    temperatureChart.update();
}

// Cập nhật biểu đồ độ ẩm
function updateHumidityChart(humidity) {
    const data = humidityChart.data;
    const labels = data.labels;
    const datasets = data.datasets[0].data;

    labels.push(Date.now());
    datasets.push(humidity);

    humidityChart.update();
}

// Cập nhật biểu đồ ánh sáng
function updateLightChart(light) {
    const data = lightChart.data;
    const labels = data.labels;
    const datasets = data.datasets[0].data;

    labels.push(Date.now());
    datasets.push(light);

    lightChart.update();
}
