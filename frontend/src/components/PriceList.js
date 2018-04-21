import React, { Component } from 'react';
import axios from 'axios';
import { Table, Button } from 'reactstrap';
import SkuPriceChange from './SkuPriceChange';
import BulkPriceChange from './BulkPriceChange';
import { RAIL_SERVER_URL } from './App';

class PriceList extends Component {
  state = {
    items: [],
    showSkuPriceChange: false,
    showBulkPriceChange: false,
  };

  componentDidMount() {
    axios.get(`${RAIL_SERVER_URL}/items`).then(res =>
      this.setState({
        items: res.data
      })
    )
  }

  togglePriceChangeCategory() {
    this.setState({
      showBulkPriceChange: !this.state.showBulkPriceChange,
    })
  }

  togglePriceChangeSku() {
    this.setState({
      showSkuPriceChange: !this.state.showSkuPriceChange,
    })
  }

  render() {
    if (!this.state.items) {
      return (<div>Loading...</div>)
    }

    return (
      <div>
        <Button color='danger'
                onClick={e => this.togglePriceChangeCategory(e)}>
          Toggle to Change Price by Category
        </Button>
        {this.state.showBulkPriceChange ?
          <BulkPriceChange items={this.state.items} /> :
          null
        }
        <Table>
          <thead>
          <tr>
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
            <tr key={item.sku}>
              <td>{item.category}</td>
              <td>{item.sku}</td>
              <td>{item.us_name}</td>
              <td>{item.us_currency}</td>
              <td>{item.us_price}</td>
              <td>{item.jp_name}</td>
              <td>{item.jp_currency}</td>
              <td>{item.jp_price}</td>
              <td>
                <Button color='danger'
                        onClick={e => this.togglePriceChangeSku(e)}>
                  Toggle to Change SKU Price
                </Button>
                {this.state.showSkuPriceChange ?
                  <SkuPriceChange item={item} /> :
                  null
                }
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