import BaseExchange from "./base";

class Bitfinex extends BaseExchange {
    url = "api-pub.bitfinex.com/ws/2"
    name = "Bitfinex";
    ticker = "tBTCUSD";


    subscribeMsg = JSON.stringify(
        {
            "event": "subscribe",
            "channel": "trades",
            "symbol": this.ticker
        }
    );

    wsSubscribeTicker = () => {
        this.ws.send(this.subscribeMsg);
    };

    wsUnsubscribe = () => { };

    onResponse = (event) => {
        let dataArray = JSON.parse(event.data);
        if (dataArray?.length >= 3 && dataArray[2].length >= 4) {
            this.newPriceEvent(dataArray[2][3]);
        }
    };

}

export default Bitfinex;