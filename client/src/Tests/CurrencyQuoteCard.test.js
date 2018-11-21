import React from 'react';
import ReactDOM from 'react-dom';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
import CurrencyQuoteCard from '../Components/CurrencyQuoteCard';

configure({ adapter: new Adapter() });

describe('<CurrencyCardQuote />', () => {
    let wrapper = beforeEach(() => { wrapper = shallow(<CurrencyQuoteCard quotes={HistoricalData} />) });

    it('includes one card div', () => {
        console.log(wrapper.find('div.Card').text());
        expect(wrapper.find('div.Card')).toHaveLength(1)
    });
})


it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<CurrencyQuoteCard quotes={HistoricalData} />, div)
    ReactDOM.unmountComponentAtNode(div);
})

it('should match the currencyQuoteCard snapshot', () => {
    const component = shallow(<CurrencyQuoteCard quotes={HistoricalData} />);
    expect(component).toMatchSnapshot();
})

const HistoricalData = {
    "currency": "BTC",
    "date": "20181107",
    "quotes": [
        {
            "time": "0915",
            "price": "34.98"
        },
        {
            "time": "1045",
            "price": "36.13"
        },
        {
            "time": "1230",
            "price": "37.01"
        },
        {
            "time": "1400",
            "price": "95.98"
        },
        {
            "time": "1530",
            "price": "39.56"
        }
    ]
}