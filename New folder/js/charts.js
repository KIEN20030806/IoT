const temperatureChart = new Chart(document.getElementById('temperatureChart'), {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Nhiệt độ',
            data: [],
            fill: false,
            borderColor: 'red'
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

const humidityChart = new Chart(document.getElementById('humidityChart'), {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Độ ẩm',
            data: [],
            fill: false,
            borderColor: 'blue'
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

const lightChart = new Chart(document.getElementById('lightChart'), {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Ánh sáng',
            data: [],
            fill: false,
            borderColor: 'green'
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
