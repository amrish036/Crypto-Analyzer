import React from 'react';
import ReactDOM from 'react-dom';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import CurrencyQuoteCard from './CurrencyQuoteCard';

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
    const component = shallow(<CurrencyQuoteCard quotes={HistoricalData} />);
    expect(component).toMatchSnapshot();
    ReactDOM.unmountComponentAtNode(div);
})

const HistoricalData = {
    "quotes":{
       "_id":"5bef40d60113382fb242c9ad",
       "currency":"BTC",
       "date":"20180507",
       "quotes":[
          {
             "time":"0915",
             "price":"34.98"
          },
          {
             "time":"1045",
             "price":"36.13"
          },
          {
             "time":"1230",
             "price":"37.01"
          },
          {
             "time":"1400",
             "price":"95.98"
          },
          {
             "time":"1530",
             "price":"39.56"
          }
       ]
    }
 }