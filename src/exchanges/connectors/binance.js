import BaseExchange from "./base";

class Binance extends BaseExchange {
    url = "stream.binance.com:9443/ws/btcusdt@trade";
    name = "Binance";
    ticker = "BTCUSDT";

    wsSubParam = this.ticker.toLowerCase() + "@trade"

    wsSubPriceJSON = JSON.stringify({
        "method": "SUBSCRIBE",
        "params": [
            this.wsSubParam,
        ],
        "id": 1,
    });

    wsUnsubPriceJSON = JSON.stringify({
        "method": "UNSUBSCRIBE",
        "params": [
            this.wsSubParam,
        ],
        "id": 312,
    });

    wsSubscribeTicker = () => {
        //this.ws.send(this.wsSubPriceJSON)
    };
    wsUnsubscribe = () => {
        this.ws.send(this.wsUnsubPriceJSON);
    };

    onResponse = (event) => {
        let json = JSON.parse(event.data);
        if (json?.e === "trade") {
            this.newPriceEvent(Number(json?.p) ? Number(json?.p) : 0);
        }
    };

}

export default new Binance();