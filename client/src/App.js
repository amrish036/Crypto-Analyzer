import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import MoneyIcon from '@material-ui/icons/Money';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';
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
    var Currencies = [];
    Currencies = data;

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
              {Currencies.map(currency => <CurrencyQuoteCard quotes={currency} />)}
              {console.log("State items is:" + this.state.items)}
            </div>
            <div>
                  <Button variant="contained" color="primary" onClick={this.onRefreshButtonClick}>
                  Refresh Quotes
                  </Button>
            </div>
          </header>
          <footer >
            <Typography variant="h6" align="center" color="inherit">
              Crypto-Analyzer 2018 &copy;
            </Typography>
          </footer>
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
