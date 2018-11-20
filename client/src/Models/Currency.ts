import Quote from './Quote'

class Currency{
    currency: string;
    date: string;
    quotes: Array<Quote>;

    constructor(){
        this.currency = '',
        this.date = '',
        this.quotes = []
    }
}

export default Currency;