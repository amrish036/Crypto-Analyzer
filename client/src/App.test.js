import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import CurrencyQuoteCard from './Components/CurrencyQuoteCard'
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  const component = shallow(<App />);
  expect(component).toMatchSnapshot();
  ReactDOM.unmountComponentAtNode(div);
});

it('should not renders the card component',()=>{
  const div = document.createElement('div');
  ReactDOM.render(<CurrencyQuoteCard />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('contains the supplied text in cardComponent', () => {
  const div = document.createElement('div');  
  const component = shallow(
    <CurrencyQuoteCard quotes={HistoricalData}/>
  );
  expect(component.find('BUY'));
  expect(component.find('SELL'));
  expect(component).toMatchSnapshot();
  ReactDOM.unmountComponentAtNode(div);
});

it('renders the card component without crashing',()=>{
  const div = document.createElement('div');
  ReactDOM.render(<CurrencyQuoteCard quotes={HistoricalData}/>, div);
  ReactDOM.unmountComponentAtNode(div)
});

const HistoricalData = [
  {
    "currency": "BTC",
    "date": "20180507",
    "quotes":
      [{ "time": "0915", "price": "34.98" },
      { "time": "1045", "price": "36.13" },
      { "time": "1230", "price": "37.01" },
      { "time": "1400", "price": "35.98" },
      { "time": "1530", "price": "33.56" },]
  },
  {
    "currency": "ETC",
    "date": "20180507",
    "quotes":
      [{ "time": "0900", "price": "1.45" },
      { "time": "1030", "price": "1.87" },
      { "time": "1245", "price": "1.55" },
      { "time": "1515", "price": "2.01" },
      { "time": "1700", "price": "2.15" }]
  }
]
