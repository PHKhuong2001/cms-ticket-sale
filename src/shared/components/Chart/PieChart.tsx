import { useEffect, useState } from "react";
import { Chart as Chartjs, PointElement } from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";

Chartjs.register(PointElement);

interface ChartData {
  datasets: [
    {
      label: string;
      data: number[];
      hoverOffset: number;
      backgroundColor?: string[];
    }
  ];
}
function PieChartComponent() {
  const [chartDemo, setChart] = useState<ChartData>({
    datasets: [
      {
        label: "My First Dataset",
        data: [300, 100],
        hoverOffset: 4,
        backgroundColor: ["#FF6384", "#36A2EB"], // Màu cho hai data
      },
    ],
  });

  useEffect(() => {
    setChart((prevChart: ChartData) => ({
      ...prevChart,
      datasets: [
        {
          ...prevChart.datasets[0],
          backgroundColor: ["#4F75FF", "#FF8A48"],
        },
      ],
    }));
  }, []);

  return (
    <Doughnut data={chartDemo} width={100} height={100} className="pieChart" />
  );
}

export default PieChartComponent;
