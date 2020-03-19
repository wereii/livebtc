import PriceCell from "./components";
import React from "react";

import Bitmex from "./connectors/bitmex";
import Bitfinex from "./connectors/bitfinex";
import Binance from "./connectors/binance";
import Poloniex from "./connectors/poloniex";

const exchanges = [
    <PriceCell key="Bitmex" exchange={new Bitmex()} />,
    <PriceCell key="Bitfinex" exchange={new Bitfinex()} />,
    <PriceCell key="Binance" exchange={new Binance()} />,
    <PriceCell key="Poloniex" exchange={new Poloniex()} />,
];

export default exchanges;