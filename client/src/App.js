import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import MoneyIcon from '@material-ui/icons/Money';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import './App.css';
import Currency from './Models/Currency.ts';
import CurrencyQuoteCard from './Components/CurrencyQuoteCard';
import axios from 'axios';
import { func } from 'prop-types';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: null,
      currencies: [Currency],
    }
    this.onRefreshButtonClick = this.onRefreshButtonClick.bind(this)

  }

  componentWillMount() {
    this.getDatafromDB();
  }

  componentDidMount() {
    this.setState({
      items: null,
      currencies: data
    })
    setInterval(this.getDataFromDb, 1000);
    // console.log(this.state.items);
  }

  getDatafromDB() {
    axios.get("/api/getData")
      .then(response => {
        this.setState({ items: response.data.data })
      })
    { console.log("Fetched from DB") }
  };

  fetchNewDataFromDb() {
    axios.get("/api/fetchNewData")
      .then(response => {
        this.setState({ items: response.data.data })
      })
    { console.log("Fetched  new datafrom DB") }
  }

  onRefreshButtonClick() {
    this.fetchNewDataFromDb();
    console.log('The link was clicked.');
  }

  render() {

    if (this.state.items != null) {
      data = this.state.items;
    }

    var BTC = data.filter(x => x.currency === 'BTC');
    var ETC = data.filter(x => x.currency === 'ETC');
    var LTC = data.filter(x => x.currency === 'LTC');
    var Currencies = [];

    if (BTC.length > 0) {
      Currencies.push(BTC)
    }
    if (ETC.length > 0) {
      Currencies.push(ETC)
    }
    if (LTC.length > 0) {
      Currencies.push(LTC)
    }

    return (
      <React.Fragment>
        <CssBaseline />
        <div className="App" >
          <AppBar position="static" style={{ display: 'top', alignItems: 'center' }}>
            <Toolbar>
              <MoneyIcon />
              <Typography variant="h6" color="inherit" noWrap>
                Crypto-Analyzer
          </Typography>
            </Toolbar>
          </AppBar>
          <header className="App-header" >
            <div className="CardContainer">
              {Currencies.map(currency => <CurrencyQuoteCard quotes={currency} key={currency.map(x => x.currency).toLocaleString()} />)}
              {console.log("State items is:" + this.state.items)}
            </div>
            <Button variant="contained" color="primary" onClick={this.onRefreshButtonClick}>
              Refresh
            </Button>
          </header>
        </div>
      </React.Fragment>
    );
  }
}
const ButtonStyle = {
  margin: '20px'
}

var data = [
  {
    "currency": "BTC",
    "date": "20180507",
    "quotes":
      [{ "time": "0915", "price": "34.98" },
      { "time": "1045", "price": "36.13" },
      { "time": "1230", "price": "37.01" },
      { "time": "1400", "price": "35.98" },
      { "time": "1530", "price": "39.56" }]
  },

]


function GetDistinctCurrency() {
  const distinctCurrencies = [...new Set(data.map(x => x.currency))];
  console.log(distinctCurrencies)
}

export default App;
