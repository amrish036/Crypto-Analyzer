import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import Currency from './Models/Currency';
import CurrencyQuoteCard from './Components/CurrencyQuoteCard';
import axios from 'axios';
import './Styles/App.css';
import FilterFormComponent from './Components/FilterFormComponent.jsx';
import AppBarComponent from './Components/AppBarComponent';
import FooterComponent from './Components/FooterComponent';


const ButtonStyle = {
  margin: '20px',
}

var data = []

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

  //Compnent lifecycle events

  componentWillMount() {
    this.getDatafromDB();
  }

  componentDidMount() {
    this.setState({
      items: null,
      currencies: data
    })
  }

  // Handling events

  handleClickOpen = () => {
    this.selectedCurrency = null;
    this.selectedDate = null;
    this.setState({ open: true });
  };

  onRefreshButtonClick() {
    this.getDatafromDB();
  }

  getFormData(open, date, currency) {
    this.setState({ open: open });

    if (currency) {
      this.selectedCurrency = currency;
    }
    if (date) {
      this.selectedDate = date;
    }
    if (currency || date) { this.fetchNewDataFromDb(); }

  }

  //API calls

  async getDatafromDB() {
    try {
      return await axios.get("/api/getData")
        .then(response => {
          this.setState({ items: response.data.data })
        })
    } catch (error) {
      console.log(error)
    }
  };

  fetchNewDataFromDb() {
    try {
      axios.get("/api/fetchNewData", {
        params: {
          date: this.selectedDate,
          currency: this.selectedCurrency
        }
      })
        .then(response => {
          this.setState({
            items: response.data.data,
          })
        })
      { console.log("Fetched  new datafrom DB") }
    }
    catch (error) {
      console.log(error)
    }
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
          <AppBarComponent />
          <header className="App-header" >
            <div className="CardContainer">
              {Currencies.length ? Currencies.map(currency => <CurrencyQuoteCard quotes={currency} key={currency.id} />)
                : <Typography variant="h6" color="inherit" noWrap>
                  No Quote Found, try another Date or Currency
                </Typography>}
            </div>
            <div>
              <Button className="refreshButton" variant="contained" color="primary" onClick={this.onRefreshButtonClick} style={ButtonStyle}>
                Refresh Quotes
              </Button>
              <Button className="filterButton" variant="contained" color="primary" style={ButtonStyle} onClick={this.handleClickOpen}>Filter</Button>
              {this.state.open ? <FilterFormComponent sendData={this.getFormData.bind(this)} /> : <></>}
            </div>
          </header>
          <FooterComponent />
        </div>
      </React.Fragment>
    );
  }
}

export default App;
