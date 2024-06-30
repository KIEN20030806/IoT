const sampleData = {
  "Category 1": 30,
  "Category 2": 50,
  "Category 3": 70,
  "Category 4": 90,
  "Category 5": 110
};

// Render biểu đồ
rendermyChart(sampleData);

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
        text: 'Biểu đồ mẫu tĩnh' 
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

function generateRandomColors(numColors) {
  const colors = [];
  for (let i = 0; i < numColors; i++) {
    const color = '#' + Math.floor(Math.random() * 16777215).toString(16); // Tạo mã màu hex ngẫu nhiên
    colors.push(color);
  }
  return colors;
}
