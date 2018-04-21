import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'reactstrap';
import PriceList from './PriceList';

const US_ITEMS_URL = "https://raw.githubusercontent.com/bluebottlecoffee/coding_exercise/master/ims/en-US/item_details.json";
const JP_ITEMS_URL = "https://raw.githubusercontent.com/bluebottlecoffee/coding_exercise/master/ims/ja-JP/item_details.json";
const CATEGORIES_URL = "https://raw.githubusercontent.com/bluebottlecoffee/coding_exercise/master/ims/items.json";
const STORES_URL = "https://raw.githubusercontent.com/bluebottlecoffee/coding_exercise/master/ims/cafes.json";

export const RAIL_SERVER_URL = "http://localhost:3001";

class App extends Component {
  state = {
    loaded: false,
    stores: [],
    categories: [],
    us_items: [],
    jp_items: [],
    showComponent: false,
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

  postItem(item) {
    axios.post(`${RAIL_SERVER_URL}/items`, item)
  };

  buildItem() {
    let us_items = this.state.us_items;
    let jp_items = this.state.jp_items;
    let item = {};

    for (let i = 0; i < us_items.length; i++) {
      item.category = this.categorizeItem(us_items[i].sku);
      item.sku = us_items[i].sku;
      item.us_name = us_items[i].name;
      item.us_price = us_items[i].price;
      item.us_currency = us_items[i].currency;
      item.jp_name = jp_items[i].name;
      item.jp_price = jp_items[i].price;
      item.jp_currency = jp_items[i].currency;

      this.postItem(item);
    }
  };

  showPriceList() {
    this.setState({
      showComponent: true,
    })
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
    };

    return (
      <div className="container">
        <br />
        <Button outline color="primary"
                onClick={() => this.showPriceList()} >
          Show Price List
        </Button>
        <hr />
        {this.state.showComponent ?
          <PriceList /> :
          null
        }
      </div>
    );
  }
}

export default App;
