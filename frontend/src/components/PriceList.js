import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import axios from 'axios';
import PriceListChange from './PriceListChange';
import {
  RAIL_SERVER_URL,
  CATEGORIES,
} from '../helpers/const';

class PriceList extends Component {
  state = {
    item: '',
    selectedItems: [],
    toggleCategoryPriceChange: false,
    toggleItemPriceChange: false,
  };

  componentDidMount() {
    axios.get(`${RAIL_SERVER_URL}/items`)
      .then(res => this.setState({ items: res.data }))
  }

  toggleCategoryPriceChange() {
    this.setState({ toggleCategoryPriceChange: !this.state.toggleCategoryPriceChange })
  }

  toggleItemPriceChange(e, item) {
    this.setState({
      toggleItemPriceChange: !this.state.toggleItemPriceChange,
      item,
    })
  }

  updateSelectedItemsPrice() {
    let payload = {
      product_ids: this.state.selectedItems,
    };
    axios.put(`${RAIL_SERVER_URL}/items/update_selected_items_price`, payload)
      .then(res => console.log('success', res))
      .catch(err => console.log('fail', err))
  }

  render() {
    if (!this.state.items) {
      return (<div>Loading...</div>)
    }

    return (
      <div>
        <Button className='col-3 btn-outline-danger offset-1'
                onClick={e => this.toggleCategoryPriceChange()}>
          Price Change by Category
        </Button>
        { this.state.toggleCategoryPriceChange ? <PriceListChange categories={CATEGORIES} /> : null }
        <hr />
        { this.state.toggleItemPriceChange ? <PriceListChange item={this.state.item} /> : null }

        <Button className='col-5 btn-outline-success offset-1'
                onClick={e => this.updateSelectedItemsPrice()}>
          Increase US price for selected checkbox items by 10%
        </Button>
        <hr />

        <Table hover>
          <thead>
          <tr>
            <th></th>
            <th>Category</th>
            <th>SKU</th>
            <th>US Name</th>
            <th>US Currency</th>
            <th>US Price</th>
            <th>JP Name</th>
            <th>JP Currency</th>
            <th>JP Price</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
          {this.state.items.map(item => (
            <tr key={item.id}>
              <td><input type='checkbox'
                         onClick={ e =>
                           this.setState({
                             selectedItems: this.state.selectedItems.concat(item.id)
                           })} /></td>
              <td>{item.category}</td>
              <td>{item.sku}</td>
              <td>{item.us_name}</td>
              <td>{item.us_currency}</td>
              <td>{item.us_price}</td>
              <td>{item.jp_name}</td>
              <td>{item.jp_currency}</td>
              <td>{item.jp_price}</td>
              <td>
                <Button className='btn-outline-info'
                        onClick={e => this.toggleItemPriceChange(e, item)}>
                  Price Change by SKU
                </Button>
              </td>
            </tr>
            )
          )}
          </tbody>
        </Table>
      </div>
    )
  }
}

export default PriceList;