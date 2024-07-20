import { useQuery } from "react-query";
import ApexChart from "react-apexcharts";
import { fetchCoinTickers } from "../api";
import { PriceData } from "./Coin";
import styled from "styled-components";

const Header = styled.header`
  height: 5vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 20px;
  color: ${(props) => props.theme.accentColor};
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-around;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;

  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

interface PriceProps {
  coinId: string;
  tickersData?: PriceData;
}
//목표 (! Coinpicker 자체 요청 제한이 있어 7/20에는 하지 못함. 내일 다시 해야함.)
//1. Coin 페이지에서 Coins로 갈 수 있는 링크 생성 [O]
//2. Price 컴포넌트 구성
//--> Apexchart에서 Candlestick chart를 이용해서 정보 전달

function Price({ coinId, tickersData }: PriceProps) {
  // Intl.NumberFormat : number --> string 변환해주며 통화 기호, 천 단위 구분 등 number 자체를 기호에 맞게 바꿀 수 있다.
  // 여기서 사용한 이유는 -0.08과 같이 시세가 하락한 것을 보여주기 위함임.
  return (
    <div>
      <Header>
        <Title>USD</Title>
      </Header>
      <Overview>
        <OverviewItem>
          <span>1년전 기준 금액</span>
          <span>
            {tickersData
              ? new Intl.NumberFormat("en-US", {
                  style: "decimal",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(tickersData.quotes.USD.percent_change_1y)
              : null}
          </span>
        </OverviewItem>
        <OverviewItem>
          <span>1개월전 기준 금액</span>
          <span>
            {tickersData
              ? new Intl.NumberFormat("en-US", {
                  style: "decimal",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(tickersData.quotes.USD.percent_change_30d)
              : null}
          </span>
        </OverviewItem>
      </Overview>
      <Overview>
        <OverviewItem>
          <span>1주일전 기준 금액</span>
          <span>
            {tickersData
              ? new Intl.NumberFormat("en-US", {
                  style: "decimal",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(tickersData.quotes.USD.percent_change_7d)
              : null}
          </span>
        </OverviewItem>
        <OverviewItem>
          <span>하루전 기준 금액</span>
          <span>
            {tickersData
              ? new Intl.NumberFormat("en-US", {
                  style: "decimal",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(tickersData.quotes.USD.percent_change_24h)
              : null}
          </span>
        </OverviewItem>
      </Overview>
    </div>
  );
}
export default Price;
