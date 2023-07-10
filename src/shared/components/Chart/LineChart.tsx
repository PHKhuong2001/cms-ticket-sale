import { useEffect, useState } from "react";
import {
  ChartDataset,
  Chart as Chartjs,
  LineElement,
  Filler,
} from "chart.js/auto";
import { Line } from "react-chartjs-2";

Chartjs.register(LineElement, Filler);

interface DataMonth {
  day: string;
  amount: string;
}

interface dataSets extends ChartDataset<"line", string[]> {
  data: string[];
  tension: number;
  pointBorderColor: string;
  backgroundColor: string | CanvasGradient | CanvasPattern;
}

interface typeChart<T> {
  labels: string[];
  datasets: T[];
}
const dataList: DataMonth[] = [
  { day: "Thứ 2", amount: "140.0" },
  { day: "Thứ 3", amount: "186.0" },
  { day: "Thứ 4", amount: "190.0" },
  { day: "Thứ 5", amount: "178.0" },
  { day: "Thứ 6", amount: "150.0" },
  { day: "Thứ 7", amount: "170.0" },
  { day: "CN", amount: "260.0" },
];
const chartData = {
  labels: [],
  datasets: [
    {
      label: "",
      data: [],
      tension: 0.5, // Thiết lập giá trị tension cho đường cong
      borderColor: "",
      pointBorderColor: "",
      backgroundColor: "",
      fill: true,
    },
  ],
};
function LineChartComponent() {
  const [chartDemo, setChart] = useState<typeChart<dataSets>>(chartData);
  useEffect(() => {
    setChart({
      labels: dataList.map((month) => month.day),
      datasets: [
        {
          data: dataList.map((amount) => amount.amount),
          tension: 0.5,
          borderColor: "#FF993C",
          pointBorderColor: "transparent",
          backgroundColor: "yellow",
          fill: true,
        },
      ],
    });
  }, []);
  console.log(chartDemo);

  const options = {
    scales: {
      y: {
        ticks: {
          stepSize: 40, // Rút gọn các giá trị trên trục dọc
        },
      },
      x: {
        grid: {
          display: false,
          drawOnChartArea: false,
          drawTicks: false,
          drawBorder: false,
        },
      },
    },
  };

  return <Line width={400} data={chartDemo} height={80} options={options} />;
}

export default LineChartComponent;
