import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface IHistoryical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
}

function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistoryical[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="line" // 차트 종류
          series={[
            // 차트 라인 데이터 구성
            {
              name: "Price",
              data: data?.map((price) => Number(price.close)) as number[],
            },
          ]}
          options={{
            theme: {
              // 바탕색
              mode: "dark",
            },
            chart: {
              // 차트 구성
              toolbar: {
                show: false,
              },
              height: 300,
              width: 500,
              background: "transparent",
            },

            stroke: {
              // 차트 라인 모양 구성
              curve: "smooth",
              width: 3,
            },
            grid: {
              // 차트 라인 그리드 구성
              show: false,
            },
            xaxis: {
              // 가로 표시줄 구성
              labels: {
                show: false,
              },
              axisBorder: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
              type: "datetime",
              categories: data?.map((price) =>
                new Date(price.time_close * 1000).toISOString()
              ),
            },
            yaxis: {
              // 세로 표시줄 구성
              show: false,
            },
            fill: {
              // 차트 라인 색상 구성
              type: "gradient",
              gradient: { gradientToColors: ["blue"], stops: [0, 100] },
            },
            colors: ["red"],

            tooltip: {
              // 차트 정보 상자 스타일 및 동작 구성
              y: {
                formatter: (value) => `$${value.toFixed(2)}`,
              },
            },
          }}
        />
      )}
    </div>
  );
}
export default Chart;
