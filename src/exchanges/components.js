import React from 'react';
import './components.css';

import Grid from '@material-ui/core/Grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

library.add(faChevronUp, faChevronDown)


class PriceRow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            price: props.price || 0,
            last_price: props.price || 0,
            is_up: true,
        };

        this.exchange = props.exchange;
        this.exchange.newPriceEvent = (new_price) => {
            this.tickUpdate(new_price)
        };

        this.componentDidMount = () => { this.exchange.registerCallbacks() };
    }


    tickUpdate(new_price) {
        this.setState(
            (state, _props) => {
                return {
                    last_price: state.price,
                    price: new_price,
                    is_up: state.price > new_price,
                };
            }
        );
    }

    render() {
        return (
            <Grid item className="price-row">
                <div className="exchange" > {this.exchange.name}</div>
                <div className={`price ${this.state.is_up ? "up" : "down"}`}>
                    <span><FontAwesomeIcon icon={this.state.is_up ? "chevron-up" : "chevron-down"} /></span>
                    <span> {this.state.price.toFixed(2)}</span>
                </div>
                <div className="ticker">
                    <small>{this.exchange.ticker}</small>
                </div>
            </Grid>
        );
    }
}


export default PriceRow;