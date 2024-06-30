const sampleData = {
  "data1": 10,
  "data2": 30,
  "data3": 40,
  "data4": 20,
  "data5": 50
};

// Render biểu đồ
renderChart(sampleData);

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
      text: "Biểu đồ mẫu tĩnh"
    },
    data: [{
      type: "line",
      dataPoints: dataPoints
    }]
  });
  chart.render();
}
