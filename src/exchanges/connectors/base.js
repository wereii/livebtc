const VERBOSE = true;

function debugLog(...params) {
    if (VERBOSE) {
        console.log(...params)
    };
}

// abstract base class
class BaseExchange {

    getWSProtocol() {
        return "wss://"
    }

    registerCallbacks = () => {
        this.ws = new WebSocket(this.getWSProtocol() + this.url);
        // register ws callbacks
        this.ws.onopen = () => {
            this.wsSubscribeTicker(this.ws);
            debugLog(this.name + " :", "Connected");
        };
        this.ws.onclose = () => {
            this.wsUnsubscribe(this.ws);
            debugLog(this.name + " :", "Disconnected.")
        };

        this.ws.onmessage = event => {
            try {
                this.onResponse(event);
            } catch (error) {
                console.log(error);
                this.ws.close();
            }
        };

        this.ws.onerror = (...params) => {
            this.ws.close();
        };
        debugLog("Callbacks registered.");

    }

    _notOverriden() {
        throw new Error("Method not overriden.");
    }

    // public events to override
    wsSubscribeTicker = this._notOverriden;
    wsUnsubscribe = this._notOverriden;

    newPriceEvent = this._notOverriden;
    onResponse = this._notOverriden;
}

export default BaseExchange;