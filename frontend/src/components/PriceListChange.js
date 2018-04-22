import React, { Component } from 'react';
import axios from "axios/index";
import { RAIL_SERVER_URL } from "../helpers/const";

class PriceListChange extends Component {
  state = {
    selectedCategory: '',
    usPercentChange: '',
    usNominalChange: '',
    jpPercentChange: '',
    jpNominalChange: '',
    usPercentChangeDisabled: false,
    usNominalChangeDisabled: false,
    jpPercentChangeDisabled: false,
    jpNominalChangeDisabled: false,
  };

  handleCategorySelection(value) {
    this.setState({ selectedCategory: value });
  };

  updateIndividualRecord(item) {
    [item.us_price, item.jp_price] = this.calculateNewPrice(item.us_price, item.jp_price);
    axios.post(`${RAIL_SERVER_URL}/items/${item.id}`, item)
      .then(res => console.log('success', res))
      .catch(err => console.log('fail', err))
  }

  updateByCategory(category) {
    let payload = {
        usPercentChange: parseFloat(this.state.usPercentChange),
        jpPercentChange: parseFloat(this.state.jpPercentChange),
        category,
    };
    axios.put(`${RAIL_SERVER_URL}/items/category_price_change`, payload)
      .then(res => console.log('success', res))
      .catch(err => console.log('fail', err))
  }

  calculateNewPrice(usPrice, jpPrice) {
    if (this.state.usNominalChange) {
      usPrice = parseFloat(this.state.usNominalChange)
    } else if (this.state.usPercentChange) {
      usPrice *= 1 + parseFloat(this.state.usPercentChange)
    }

    if (this.state.jpNominalChange) {
      jpPrice = parseFloat(this.state.jpNominalChange)
    } else if (this.state.jpPercentChange) {
      jpPrice *= 1 + parseFloat(this.state.jpPercentChange)
    }

    return [usPrice, jpPrice]
  }

  onFormSubmit(e) {
    e.preventDefault();
    if (this.props.item) {
      this.updateIndividualRecord(this.props.item)
    } else if (this.props.categories) {
      this.updateByCategory(this.state.selectedCategory)
    }
  }

  render() {
    return(
      <div className='container'
           style={{ border: '1px solid #cecece' }} >

        <form onSubmit={e => this.onFormSubmit(e)}>
          { this.props.categories ?
            (<div>
              <h4>Select category:</h4>
              <select className='col-4'
                      value={this.state.selectedCategory}
                      onChange={(e) => this.handleCategorySelection(e.target.value)} >
                <option value='' selected disabled>click Here</option>
                {this.props.categories.map(category => {
                  return <option value={category} key={category}>{category}</option>
                })}
              </select>
            </div>) : null }
          <br />

          <div className='col-12'>
            <div className='row'>
              <div className='col-6 text-center'>
                <h4>US Price Change</h4>
                <div className='row'>
                  <input className='col-12 form-control'
                         disabled={this.state.usNominalChangeDisabled}
                         onFocus={() => this.setState({ usPercentChangeDisabled: !this.state.usPercentChangeDisabled })}
                         placeholder='Enter New US Price, eg. 12.00'
                         value={this.state.usNominalChange}
                         onChange={e => this.setState({ usNominalChange: e.target.value })} />
                </div>
                <div className='row'>
                  <input className='col-12 form-control'
                         disabled={this.state.usPercentChangeDisabled}
                         onFocus={() => this.setState({ usNominalChangeDisabled: !this.state.usNominalChangeDisabled })}
                         placeholder='Enter Percentage Change, eg. 0.05 (inc) or -0.05(decr)'
                         value={this.state.usPercentChange}
                         onChange={e => this.setState({ usPercentChange: e.target.value })} />
                </div>
              </div>

              <div className='col-6 text-center'>
                <h4>JP Price Change</h4>
                <div className='row'>
                  <input className='col-12 form-control'
                         disabled={this.state.jpNominalChangeDisabled}
                         onFocus={() => this.setState({ jpPercentChangeDisabled: !this.state.jpPercentChangeDisabled })}
                         placeholder='Enter New JP Price, eg. 475.00'
                         value={this.state.jpNominalChange}
                         onChange={e => this.setState({ jpNominalChange: e.target.value })} />
                </div>
                <div className='row'>
                  <input className='col-12 form-control'
                         disabled={this.state.jpPercentChangeDisabled}
                         onFocus={() => this.setState({ jpNominalChangeDisabled: !this.state.jpNominalChangeDisabled })}
                         placeholder='Enter Percentage Change, eg. 0.05 (inc) or -0.05(decr)'
                         value={this.state.jpPercentChange}
                         onChange={e => this.setState({ jpPercentChange: e.target.value })} />
                </div>
              </div>
            </div>
            <br />
            <div className='row'>
              <input className='col-2 btn-primary'
                     type='submit' />
            </div>
            <br />
          </div>
        </form>
      </div>
    )
  }
}

export default PriceListChange;