
const assert = require('assert');
const server = require('../server');
const mongoose = require("mongoose");
const express = require("express");

describe('some demo test', function(){
    it('adds two number', function(){
        assert(2+3 === 5)
    })
    it('adds doenst add two numbers', function(){
        assert(2+3 !== 4)
    })
    it('opens the connections', function(){

        const dbRoute = "mongodb://amrish:amrish036@ds037067.mlab.com:37067/cryptodata";
        let db = mongoose.connection;
        var col = db.collection('data').find({});
        assert(col)


    })
})