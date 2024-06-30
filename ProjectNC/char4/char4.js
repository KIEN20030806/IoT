const sampleData = {
  data1: [70, 100, 50, 120, 90, 110, 60, 130, 80, 140],
  data2: [40, 90, 110, 60, 120, 30, 70, 100, 80, 50],
  data3: [110, 20, 90, 40, 130, 70, 50, 120, 60, 30]
};

const xValues = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];

// Khởi tạo biểu đồ dạng đường với dữ liệu mẫu
renderLineChart(sampleData);

function renderLineChart(data) {
  new Chart("linechart", {
    type: "line",
    data: {
      labels: xValues,
      datasets: [{
          data: data.data1,
          borderColor: "red",
          fill: false
        },
        {
          data: data.data2,
          borderColor: "green",
          fill: false
        },
        {
          data: data.data3,
          borderColor: "blue",
          fill: false
        }
      ]
    },
    options: {
      legend: {
        display: false
      }
    }
  });
}
