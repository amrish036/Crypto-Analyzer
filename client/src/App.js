import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import MoneyIcon from '@material-ui/icons/Money';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Toolbar from '@material-ui/core/Toolbar';
import Currency from './Models/Currency.ts';
import CurrencyQuoteCard from './Components/CurrencyQuoteCard';
import axios from 'axios';
import moment from 'moment';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: null,
      currencies: [Currency],
      open: false,
      quotesFound: false,
    }
    this.selectedDate = null;
    this.selectedCurrency = null;

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

  handleClickOpen = () => {
    this.selectedCurrency = null;
    this.selectedDate = null;
    this.setState({ open: true });
  };

  handleFilterOk = () => {
    this.fetchNewDataFromDb();
    this.handleClose();
  }

  handleTextChange = (e) => {
    var typedCurrency = (e.target.value).toString().toUpperCase();
    this.selectedCurrency = typedCurrency;
    console.log(typedCurrency);
  }

  handleDateChange = (e) => {
    var convertDateToString = moment(e.target.value).format('YYYYMMDD');
    this.selectedDate = convertDateToString;
    console.log(convertDateToString);
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  async getDatafromDB() {
    try{
      return await axios.get("/api/getData")
      .then(response => {
        this.setState({ items: response.data.data })
        { console.log("Fetched from DB") }
      })
    } catch (error){
      console.log(error)
    }
  };

  async fetchNewDataFromDb() {
    try{axios.get("/api/fetchNewData",{
      params:{
        date: this.selectedDate,
        currency: this.selectedCurrency
      }
    })
      .then(response => {
        this.setState({
          items: response.data.data,
        })
      })
    { console.log("Fetched  new datafrom DB") }}
    catch (error){
      console.log(error)
    }
    
  }

  onRefreshButtonClick() {
    this.getDatafromDB();
    console.log('The link was clicked.');
  }

  render() {

    var Currencies = [];
    if (this.state.items != null) {
        data = this.state.items;
        Currencies = data;
    }
    else {
      Currencies = data;
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
              {Currencies.map(currency => <CurrencyQuoteCard quotes={currency} key={currency.id} />)}
              {console.log("State items is:" + this.state.items)}
            </div>
            <div>
              <Button variant="contained" color="primary" onClick={this.onRefreshButtonClick} style={ButtonStyle}>
                Refresh Quotes
                  </Button>
              <Button variant="contained" color="primary" style={ButtonStyle} onClick={this.handleClickOpen}>Filter</Button>
              <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Filter</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Filter based on date
            </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="date"
                    type="date"
                    fullWidth
                    onChange={this.handleDateChange.bind(this)}
                  />
                  <DialogContentText>
                    Filter based on Currency
            </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="currencyText"
                    placeholder="Type Currency eg. ETC"
                    type="text"
                    fullWidth
                    onChange={this.handleTextChange.bind(this)}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClose} color="primary">
                    Cancel
            </Button>
                  <Button onClick={this.handleFilterOk} color="primary">
                    Ok
            </Button>
                </DialogActions>
              </Dialog>

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
  margin: '20px',
}

var data = [
  {
    "currency": "BTC",
    "date": "20180507",
    "quotes":
      [{ "time": "0915", "price": "35.98" },
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
