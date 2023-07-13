import { useEffect, useState } from "react";
import { Chart as Chartjs, PointElement } from "chart.js/auto";
import { Pie } from "react-chartjs-2";

Chartjs.register(PointElement);

interface dataSets {
  label: string;
  data: number[];
  hoverOffset: number;
}
interface typeChart<T> {
  datasets: T[];
}
const chartData = {
  datasets: [
    {
      label: "",
      data: [],
      hoverOffset: 0,
    },
  ],
};
function PieChartComponent() {
  const [chartDemo, setChart] = useState<typeChart<dataSets>>(chartData);
  useEffect(() => {
    setChart({
      datasets: [
        {
          label: "My First Dataset",
          data: [300, 50, 100],
          hoverOffset: 4,
        },
      ],
    });
  }, []);

  return <Pie data={chartDemo} width={100} height={100} className="pieChart" />;
}

export default PieChartComponent;
