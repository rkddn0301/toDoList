import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

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
  const isDark = useRecoilValue(isDarkAtom);
  const { isLoading, data } = useQuery<IHistoryical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="candlestick" // 차트 종류
          series={[
            // 라인 데이터 구성
            {
              name: "Price",
              data: data
                ? data.map((price) => ({
                    x: new Date(price.time_close * 1000).toISOString(),
                    y: [
                      Number(price.open),
                      Number(price.high),
                      Number(price.low),
                      Number(price.close),
                    ],
                  }))
                : [],
            },
          ]}
          options={{
            theme: {
              // 바탕색
              mode: isDark ? "dark" : "light",
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
              width: 1,
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
