import React from 'react';
import moment from 'moment';

export function convertToDay(dateString) {
    var convertedDate = moment(dateString);
    console.log(convertedDate);
    return convertedDate.format('DD-MMM-YYYY');
}

export function getFirstQuote(allQuotes) {
    var sortedQuotesbyTime = Math.min(...allQuotes.quotes.map(x => parseFloat(x.time)));
    var firstQuoteForDay = allQuotes.quotes.filter((x) => parseFloat(x.time) === sortedQuotesbyTime);
    return firstQuoteForDay[0];
}

export function getBestQuote(allQuotes) {
    var allQuotes = allQuotes.quotes.slice(1);
    var highestQuote = Math.max(...allQuotes.map((x) => parseFloat(x.price)));
    var bestQuote = allQuotes.filter((x) => parseFloat(x.price) === highestQuote);
    return bestQuote[0];
}

export function convertToTime(timeString) {
    var convertedTime = moment(timeString, "hhmm").format("h:mm A");
    console.log(convertedTime);
    return convertedTime;
}

export function showProfit(profit) {
    if (profit < 0) {
        return <span style={{ color: 'red' }}>Loss: ${profit.toLocaleString()}</span>
    }
    else {
        return <span>Profit: ${profit.toLocaleString()}</span>
    }
}

export function getProfit(allQuotes) {
    {
        var allQuotes = allQuotes.quotes.slice(1);
        var highestQuote = Math.max(...allQuotes.map((x) => parseFloat(x.price)));
        var bestQuote = allQuotes.filter((x) => x.price === highestQuote.toString());
        return bestQuote[0];
    }
}