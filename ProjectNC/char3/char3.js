const sampleData = {
  "Category 1": 10,
  "Category 2": 50,
  "Category 3": 15,
  "Category 4": 20,
  "Category 5": 5
};

// Chart3
renderPieChart(sampleData);

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
