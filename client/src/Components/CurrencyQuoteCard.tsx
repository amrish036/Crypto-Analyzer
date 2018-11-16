import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Quote from '../Models/Quote';
import Currency from '../Models/Currency';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import moment from 'moment';
import './CurrencyQuoteCard.css'

class CurrencyQuoteCard extends React.Component {


    constructor(props: any) {
        super(props);
    }
    componentDidMount() {
        const Quote = this.props;
        const BestQuote = '';
        console.log("Component Mounted")
    }

    render() {
        const Quotes: any = this.props;
        const firstQuote = Quotes.quotes[0].quotes[0];
        const bestQuote = GetBestQuote(Quotes.quotes);
        const profit = (bestQuote.price - firstQuote.price).toFixed(2);
        // const BTC: any = Quotes.quotes.filter((x: Currency) => x.currency === 'BTC');
        // const ETC: any = Quotes.quotes.filter((x: Currency) => x.currency === 'ETC');
        // const LTC: any = Quotes.quotes.filter((x: Currency) => x.currency === 'LTC');

        return (
            <div className="Card">
                <Card>
                    <CardContent>
                        <Typography className="CardHeading" gutterBottom variant="h5" component="h2" color="primary">
                            {convertToDay(Quotes.quotes[0].date)} <br />
                            {Quotes.quotes[0].currency} <br />
                        </Typography>
                        <Table >
                            <TableHead>
                                <TableRow>
                                    <TableCell>BUY</TableCell>
                                    <TableCell>SELL</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>${firstQuote.price}</TableCell>
                                    <TableCell>${bestQuote.price}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>{ConvertToTime(firstQuote.time)}</TableCell>
                                    <TableCell>{ConvertToTime(bestQuote.time)}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                        <br/>
                        <Typography gutterBottom variant="h5" component="h3" style={{color:'teal'}} >
                        {ShowProfit(parseFloat(profit))}
                        </Typography>
                    </CardContent>

                    {/* {console.log(Quotes.quotes)}
          {console.log(BTC[0].currency)}
          {console.log(LTC[0].currency)}
          {console.log(ETC[0].date)}
          {console.log(convertToDay(ETC[0].date))}
          {console.log(ETC[0].currency)} <br/> */}
                </Card>
            </div>
        );
    }
}

function convertToDay(dateString: string) {
    var convertedDate = moment(dateString);
    console.log(convertedDate);
    return convertedDate.format('DD-MMM-YYYY');
}

function ConvertToTime(timeString: string) {
    var convertedTime = moment(timeString, "hhmm").format("h:mm A");
    console.log(convertedTime);
    return convertedTime;
}


function GetBestQuote(allQuotes: any) {
    var allQuotes = allQuotes[0].quotes.slice(1);
    var numberOfQuotes = allQuotes.length;
    var sortedQuotes = allQuotes.map((x: any) => parseFloat(x.price)).sort();
    var highestQuote = sortedQuotes[numberOfQuotes - 1];
    var bestQuote = allQuotes.filter((x:any)=>parseFloat(x.price) === highestQuote);
    return bestQuote[0];
}

function ShowProfit(profit: number){
if(profit<0){
    return<span style={{color:'red'}}>$Profit: {profit.toLocaleString()}</span>
}
else{
    return <span>$Profit: {profit.toLocaleString()}</span>
}
}
function GetProfit(allQuotes: any) {
    {
        var allQuotes = allQuotes[0].quotes.slice(1);
        var numberOfQuotes = allQuotes.length;
        var sortedQuotes = allQuotes.map((x: any) => parseFloat(x.price)).sort();
        var highestQuote = sortedQuotes[numberOfQuotes - 1];
        var bestQuote = allQuotes.filter((x: any) => x.price === highestQuote.toString());
        return bestQuote[0];
    }
}

export default CurrencyQuoteCard;