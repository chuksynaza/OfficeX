process.env.NODE_ENV = 'test';

let request = require("request"),
    assert = require('assert'),
    closeOfficeX = require("../index").closeOfficeX,
    baseUrl = "https://127.0.0.1:9000/";
    
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

describe("Test OfficeX Server urls and protocols", function() {
  describe("GET /", function() {
    it("returns status code 200", function(done) {
      request(baseUrl, function(error, response, body) {
        //expect(response.statusCode).toBe(200);
        console.log(error);
        assert.equal(200, response.statusCode);
        done();
      });
    });

    it("It should welcome us to OfficeX", function(done) {
      request(baseUrl, function(error, response, body) {
        //expect(body).toBe("Hello World");
        assert.equal("Welcome to OfficeX", body);
        //closeOfficeX();
        done();
      });
    });
  });
});