import Quote from './Quote'

class Currency{
    currency: string;
    date: string;
    quotes: Array<Quote>;

    constructor(){
        this.currency = 'AUD',
        this.date = '20181114',
        this.quotes = []
    }
}

export default Currency;