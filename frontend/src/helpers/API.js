import React, { Component } from 'react';
import axios from 'axios';
import {
  RAIL_SERVER_URL,
  US_ITEMS_URL,
  JP_ITEMS_URL,
  CATEGORIES_URL,
  STORES_URL
} from './const';

class API extends Component {
  state = {
    loaded: false,
    stores: [],
    categories: [],
    us_items: [],
    jp_items: [],
  };

  categorizeItem(sku) {
    let abbr = String(sku.substr(0, 2));

    switch (abbr) {
      case 'BV': return 'beverage';
      case 'BP': return 'baked product';
      case 'CE': return 'coffee equipment';
      case 'CB': return 'coffee bean';
      default: return 'unknown';
    }
  };

  buildItem() {
    let us_items = this.state.us_items;
    let jp_items = this.state.jp_items;
    let promises = [];

    for (let i = 0; i < us_items.length; i++) {
      let item = {};

      item.category = this.categorizeItem(us_items[i].sku);
      item.sku = us_items[i].sku;
      item.us_name = us_items[i].name;
      item.us_price = us_items[i].price;
      item.us_currency = us_items[i].currency;
      item.jp_name = jp_items[i].name;
      item.jp_price = jp_items[i].price;
      item.jp_currency = jp_items[i].currency;

      promises.push(axios.post(`${RAIL_SERVER_URL}/items`, item))
    }

    axios.all(promises)
      .then(res => console.log("post success: ", res))
      .catch(err => console.log("post error: ", err))
  };

  componentDidMount() {
    axios.get(`${STORES_URL}`).then(res =>
      this.setState({ stores: res.data })
    ).then(
      axios.get(`${CATEGORIES_URL}`).then(res =>
        this.setState({ categories: res.data })
      )
    ).then(
      axios.get(`${US_ITEMS_URL}`).then(res =>
        this.setState({ us_items: res.data })
      )
    ).then(
      axios.get(`${JP_ITEMS_URL}`).then(res =>
        this.setState({ jp_items: res.data })
      )
    ).then(
      this.setState({ loaded: true })
    )
  };

  render() {
    if (this.state.jp_items.length !== 0) {
      this.buildItem();
    }

    return (
      <div className="container">
        { this.state.loaded ? <div>Data has been fetched!</div> : null }
      </div>
    );
  }
}

export default API;
