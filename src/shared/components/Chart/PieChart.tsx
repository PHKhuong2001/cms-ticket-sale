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
interface PropPieChart {
  dataStatus: string[];
}

function PieChartComponent({ dataStatus }: PropPieChart) {
  const [chartDemo, setChart] = useState<ChartData>({
    datasets: [
      {
        label: "",
        data: [0, 0],
        hoverOffset: 4,
        backgroundColor: ["#FF6384", "#36A2EB"], // Màu cho hai data
      },
    ],
  });

  useEffect(() => {
    const ticketHaveUse = dataStatus.filter((item) => item === "Đã sử dụng");
    const ticketNotUsed = dataStatus.filter((item) => item === "Chưa sử dụng");

    setChart((prevChart: ChartData) => ({
      ...prevChart,
      datasets: [
        {
          ...prevChart.datasets[0],
          data: [ticketHaveUse.length, ticketNotUsed.length],
          backgroundColor: ["#4F75FF", "#FF8A48"],
        },
      ],
    }));
  }, [dataStatus]);

  const options = {
    plugins: {
      tooltip: {
        enabled: true,
        intersect: false,
        mode: "nearest" as "nearest",
        caretPadding: 10,
        displayColors: false,
        callbacks: {
          label: function (context: any) {
            let label = context.dataset.label || "";

            if (label) {
              label += ": ";
            }

            if (context.dataIndex !== undefined && context.dataset.data) {
              const dataValue = context.dataset.data[context.dataIndex];
              label += dataValue;
            }

            return label;
          },
        },
      },
    },
    elements: {
      arc: {
        backgroundColor: "white", // Màu nền trắng cho các phần tử của biểu đồ
      },
    },
  };

  return (
    <Doughnut
      data={chartDemo}
      width={100}
      height={100}
      className="pieChart"
      options={options}
    />
  );
}

export default PieChartComponent;
