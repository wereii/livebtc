import PriceCell from "./components";
import React from "react";

import Bitmex from "./connectors/bitmex";
import Bitfinex from "./connectors/bitfinex";
import Binance from "./connectors/binance";

const exchanges = [
    <PriceCell key="Bitmex" exchange={Bitmex} />,
    <PriceCell key="Bitfinex" exchange={Bitfinex} />,
    <PriceCell key="Binance" exchange={Binance} />,
];

export default exchanges;