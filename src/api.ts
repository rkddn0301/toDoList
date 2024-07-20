const BASE_URL = `https://api.coinpaprika.com/v1`;

const CHART_URL = `https://ohlcv-api.nomadcoders.workers.dev`;

export function fetchCoins() {
  return fetch(`${BASE_URL}/coins`).then((response) => response.json());
}

export function fetchCoinInfo(coinId: string) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((response) =>
    response.json()
  );
}

export function fetchCoinTickers(coinId: string) {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) =>
    response.json()
  );
}

// ! API URL 변경으로 인해 아래 startDate, endDate는 영향을 받지 않으나 처음보는 것이니 일단 작성해둠.
// Math.ceil({number}) : number를 올림해줌
// Math.floor({number}) : number를 내림해줌
export function fetchCoinHistory(coinId: string) {
  const endDate = Math.floor(Date.now() / 1000);

  // 현재에서 1주일 전 계산법 (60초 * 60분 * 24시간 * 7일)
  const startDate = endDate - 60 * 60 * 24 * 7;

  return fetch(`${CHART_URL}?coinId=${coinId}`).then((response) =>
    response.json()
  );
}
