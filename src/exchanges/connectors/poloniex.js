import BaseExchange from "./base";

class Poloniex extends BaseExchange {
    url = "api2.poloniex.com"
    name = "Poloniex";
    ticker = "USDT_BTC";

    wsSubscribeTicker = () => {
        this.ws.send(JSON.stringify({ "command": "subscribe", "channel": this.ticker }))
    };

    wsUnsubscribe = () => {
        this.ws.send(
            JSON.stringify({ "command": "unsubscribe", "channel": this.ticker })
        );
    };


    // [121,668117920,[["o",0,"5413.26961819","1.00495657"],["t","32127293",1,"5413.26961819","0.00271524",1584191288]]]
    onResponse = (event) => {
        let json = JSON.parse(event.data);
        let arrays = json[2];

        for (let i = 0; i < arrays.length; i++) {
            const packet = arrays[i];
            if (packet[0] === "t") {
                this.newPriceEvent(Number(packet[3]) || 0);
                break;
            };
        }
    };

}

export default Poloniex;