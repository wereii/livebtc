import BaseExchange from "./base";

class Bitmex extends BaseExchange {
    url = "www.bitmex.com/realtime?subscribe=instrument:XBTUSD"
    name = "Bitmex";
    ticker = "XBTUSD";

    wsSubscribeTicker = () => { /* Just noop override. Already subscribed thru url.*/ };
    wsUnsubscribe = () => {
        this.ws.send(
            JSON.stringify({ op: "unsubsribe", args: "instrument" })
        );
    };

    onResponse = (event) => {
        let json = JSON.parse(event.data);
        let price = json.data ? json.data[0]?.lastPrice : undefined;
        if (price !== undefined) {
            this.newPriceEvent(price);
        }
    };

}

export default new Bitmex();