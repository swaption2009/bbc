import React, { Component } from 'react';
import axios from "axios/index";
import {RAIL_SERVER_URL} from "./App";

class BulkPriceChange extends Component {
  state = {
    selectedCategory: '',
    percentChange: '',
    nominalChange: '',
  };

  handleCategorySelection(value) {
    this.setState({
      selectedCategory: value,
    });
  };

  handleNominalChange(value) {
    this.setState({
      nominalChange: value,
    });
  };

  handlePercentChange(value) {
    this.setState({
      percentChange: value,
    });
  };

  patchToServer(e) {
    e.preventDefault();
    let item = this.props.item;
    item.us_price += this.state.nominalChange;
    axios.patch(`${RAIL_SERVER_URL}/items/${item.id}`, item)
  }

  render() {
    return(
      <div className='container'>
        <p>Select category from dropdown menu:</p>
        <select value={this.state.selectedCategory}
                onChange={(e) => this.handleCategorySelection(e.target.value)} >
          <option value="beverage">Beverage</option>
          <option value="baked product">Baked Product</option>
          <option value="coffee equipment">Coffee Equipment</option>
          <option value="coffee bean">Coffee Bean</option>
        </select>
        <hr />
        <p>Select increase(+) or decrease(-) by percentage or nominal value:</p>
        <label>Percentage Change: </label>
        <input type='number'
               value={this.state.percentChange}
               placeholder='eg. 0.03 or -0.03'
               onChange={(e) => this.handlePercentChange(e.target.value)}/>
        <br />
        <label>Nominal Change: </label>
        <input type='number'
               value={this.state.nominalChange}
               placeholder='eg. 5.00 or -5.00'
               onChange={(e) => this.handleNominalChange(e.target.value)} />
        <input type='submit'
               onClick={(e) => this.patchToServer(e)} />
      </div>
    )
  }
}

export default BulkPriceChange;