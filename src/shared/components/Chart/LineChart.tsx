import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { getDayOfWeek, splitMonthAndDay } from "~/shared/helpers";
import { ChartType } from "~/shared/interfaces";

interface DataSets {
  label: string;
  data: string[];
  tension: number;
  borderColor: string;
  pointBorderColor: string;
  backgroundColor: CanvasGradient;
  fill: boolean;
  spanGaps: boolean;
}

interface ChartData {
  labels: string[];
  datasets: DataSets[];
}

const chart = {
  labels: [],
  datasets: [
    {
      label: "",
      data: [],
      tension: 0.5,
      borderColor: "",
      pointBorderColor: "",
      backgroundColor: {} as CanvasGradient,
      fill: true,
      spanGaps: true,
    },
  ],
};
interface LineChartProps {
  dataChart: ChartType[];
}

const LineChartComponent = ({ dataChart }: LineChartProps) => {
  const [chartData, setChartData] = useState<ChartData>(chart);
  useEffect(() => {
    setChartData({
      labels: dataChart.map((date) => {
        if (date.endDate) {
          return `${splitMonthAndDay(
            date.startDate || ""
          )} - ${splitMonthAndDay(date.endDate || "")}`;
        } else {
          return `${getDayOfWeek(date.date || "")} - ${splitMonthAndDay(
            date.date || ""
          )}`;
        }
      }),
      datasets: [
        {
          label: "",
          data: dataChart.map((fare) => fare.fareMoney.toString()),
          tension: 0.5,
          borderColor: "#FF993C",
          pointBorderColor: "transparent",
          backgroundColor: createLinearGradient(),
          fill: true,
          spanGaps: true,
        },
      ],
    });
  }, [dataChart]);

  const createLinearGradient = () => {
    const ctx = document.createElement("canvas").getContext("2d");
    if (ctx) {
      const gradient = ctx.createLinearGradient(0, 0, 0, 190);
      gradient.addColorStop(0, "#FAA05F");
      gradient.addColorStop(1, "#FFFFFF");
      return gradient;
    }
    return {} as CanvasGradient;
  };

  const options = {
    scales: {
      y: {
        ticks: {
          stepSize: 100000,
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
    plugins: {
      legend: {
        display: false, // Tắt hiển thị ô vuông màu của nhãn
      },
    },
  };

  return <Line width={400} data={chartData} height={80} options={options} />;
};

export default LineChartComponent;
