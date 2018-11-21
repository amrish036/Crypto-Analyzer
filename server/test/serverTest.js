var supertest = require("supertest");
var should = require('should');

var server = supertest.agent('http://localhost:3001');

describe('Unit testing the get and fetch Data', ()=>{

    it('should return all the data from db', function(done){
        server
        .get('/api/getData')
        .expect('Content-type','/json/')
        .expect(200)
        .end(function(err,res){
            res.status.should.equal(200);
            res.body.success.should.equal(true);
            done();
        });
    });

    it('should fetch new the data from db', function(done){
        server
        .get('/api/fetchNewData')
        .expect('Content-type','/json/')
        .expect(200)
        .end(function(err,res){
            res.status.should.equal(200);
            res.body.success.should.equal(true);
            done();
        });
    });
})