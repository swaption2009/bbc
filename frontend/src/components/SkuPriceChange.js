import React, { Component } from 'react';
import axios from 'axios';
import { RAIL_SERVER_URL } from './App';

class SkuPriceChange extends Component {
  state = {
    percentChange: '',
    nominalChange: '',
  };

  patchToServer(e) {
    e.preventDefault();
    let item = this.props.item;
    item.us_price += this.state.nominalChange;
    axios.patch(`${RAIL_SERVER_URL}/items/${item.id}`, item)
  }

  render() {
    return(
      <div>
        <p>Select increase(+) or decrease(-) by percentage or nominal value:</p>
        <label>Percentage Change: </label>
        <input type='number'
               value={this.state.percentIncrease}
               placeholder='eg. 0.03 or -0.03'
               onChange={(e) => this.handlePercentChange(e.target.value)}/>
        <br />
        <label>Nominal Change: </label>
        <input type='number'
               value={this.state.nominalIncrease}
               placeholder='eg. 5.00 or -5.00'
               onChange={(e) => this.handleNominalChange(e.target.value)} />
        <input type='submit'
               onClick={(e) => this.patchToServer(e)} />
      </div>
    )
  }
}

export default SkuPriceChange;