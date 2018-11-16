import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import MoneyIcon from '@material-ui/icons/Money';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import './App.css';
import Currency from './Models/Currency.ts';
import CurrencyQuoteCard from './Components/CurrencyQuoteCard';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      currencies: [Currency],
    }
  }

  componentDidMount() {
    this.setState({
      items: data,
      currencies: data
    })
  }

  render() {

    const BTC = data.filter(x => x.currency === 'BTC');
    const ETC = data.filter(x => x.currency === 'ETC');
    const LTC = data.filter(x => x.currency === 'LTC');
    const Currencies = [BTC, ETC, LTC];

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
            </div>
          </header>
        </div>
      </React.Fragment>
    );
  }
}
const ButtonStyle = {
  margin: '20px'
}

const data = [
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
  {
    "currency": "ETC",
    "date": "20180507",
    "quotes":
      [{ "time": "0900", "price": "1.45" },
      { "time": "1030", "price": "0.1" },
      { "time": "1245", "price": "0" },
      { "time": "1515", "price": "0" },
      { "time": "1700", "price": "0" }]
  },
  {
    "currency": "LTC",
    "date": "20180507",
    "quotes":
      [{ "time": "0930", "price": "14.32" },
      { "time": "1115", "price": "14.87" },
      { "time": "1245", "price": "15.03" },
      { "time": "1400", "price": "14.76" },
      { "time": "1700", "price": "14.15" }]
  }
]


function GetDistinctCurrency() {
  const distinctCurrencies = [...new Set(data.map(x => x.currency))];
  console.log(distinctCurrencies)
}

export default App;
