import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { getBestQuote } from '../utils/helper';
import { convertToDay } from '../utils/helper';
import { convertToTime } from '../utils/helper';
import { showProfit } from '../utils/helper';
import {getFirstQuote} from '../utils/helper';
import '../Styles/CurrencyQuoteCard.css'

class CurrencyQuoteCard extends React.Component {

    constructor(props: any) {
        super(props);
    }
    componentDidMount() {
    }

    render() {
        const Quotes: any = this.props;
        const firstQuote = getFirstQuote(Quotes.quotes);
        const bestQuote = getBestQuote(Quotes.quotes);
        const profit = (parseFloat(bestQuote.price) - parseFloat(firstQuote.price)).toFixed(2);
        return (
            <div className="Card">
                <Card>
                    <CardContent>
                        <Typography className="CardHeading" gutterBottom variant="h5" component="h2" color="primary">
                            {convertToDay(Quotes.quotes.date)} <br />
                            {Quotes.quotes.currency} <br />
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
                                    <TableCell>{convertToTime(firstQuote.time)}</TableCell>
                                    <TableCell>{convertToTime(bestQuote.time)}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                        <br />
                        <Typography gutterBottom variant="h5" component="h3" style={{ color: 'teal' }} >
                            {showProfit(parseFloat(profit))}
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        );
    }
}

export default CurrencyQuoteCard;