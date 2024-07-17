import { useParams } from "react-router-dom";

interface Params {
  coinId: string;
}

function Coin() {
  const { coinId } = useParams<Params>();
  console.log(coinId);
  return <h1>Coin:{coinId}</h1>;
}
export default Coin;
