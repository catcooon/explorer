'use strict'

const originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
const poloniex = require('../lib/markets/poloniex');

describe('market', function() {
  
  describe('poloniex', function() {
    beforeEach(function() {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    });

    it('should return trade history', function(done){
      poloniex.get_trades('DOGE', 'BTC', function(err, trades) {
        expect(err).toEqual(null);
        expect(trades.length).toEqual(200);
        done();
      });
    });

    it('should return orderbook', function(done){
      poloniex.get_orders('DOGE', 'BTC', function(err, orders) {
        expect(err).toEqual(null);
        expect(orders.asks.length).toEqual(50);
        expect(orders.bids.length).toEqual(47);
        expect(orders.isFrozen).toEqual('0');
        done();
      });
    });

    it('should return summary', function(done){
      poloniex.get_summary('DOGE', 'BTC', function(err, summary) {
        expect(err).toEqual(null);
        expect(summary.isFrozen).toEqual('0');
        done();
      });
    });

    it('should return chartdata', function(done){
      poloniex.get_chartdata('DOGE', 'BTC', (err, chartdata) => {
        expect(err).toEqual(null);
        expect(chartdata.length).toBeGreaterThan(10);
        done();
      });
    });

    afterEach(function() {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
  });
});
  
