import React, { Component } from 'react';
import { Button } from 'reactstrap';
import PriceList from './PriceList';
import API from '../helpers/API';

class App extends Component {
  state = {
    showPriceListComponent: false,
    fetchAPIComponent: false,
  };

  showPriceList() {
    this.setState({
      showPriceListComponent: true,
    })
  };

  fetchData() {
    this.setState({
      fetchAPIComponent: true,
    })
  };

  render() {
    return (
      <div className="container">
        <br />
        <Button className="col-md-4 btn-outline-info"
                onClick={() => this.fetchData()} >
          Fetch and Populate Data
        </Button>
        { this.state.fetchAPIComponent ? <API /> : null }
        <hr />

        <Button className="col-md-4 btn-outline-primary"
                onClick={() => this.showPriceList()} >
          Show Price List
        </Button>
        <hr />
        { this.state.showPriceListComponent ? <PriceList /> : null }
      </div>
    );
  }
}

export default App;
