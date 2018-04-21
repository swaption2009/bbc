import React, { Component } from 'react';

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
               value={this.state.percentIncrease}
               placeholder='eg. 0.03 or -0.03'
               onChange={(e) => this.handlePercentChange(e.target.value)}/>
        <br />
        <label>Nominal Change: </label>
        <input type='number'
               value={this.state.nominalIncrease}
               placeholder='eg. 5.00 or -5.00'
               onChange={(e) => this.handleNominalChange(e.target.value)} />
      </div>
    )
  }
}

export default BulkPriceChange;