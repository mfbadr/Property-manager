/* jshint expr: true */
/* global describe, it */
'use strict';

var expect = require('chai').expect;
var Renter = require('../../app/models/renter');

describe('Renter', function(){
  describe('constructor', function(){
    it('should make a renter with proper attributes', function(){
      var bob = new Renter('bob', '31', 'male', 'waiter');
      expect(bob.name).to.equal('bob');
      expect(bob.cash).to.be.within(100, 5000);
      expect(bob.age).to.equal(31);
      expect(bob.isEvicted).to.be.false;
      expect(bob.gender).to.equal('male');
      expect(bob.profession).to.equal('waiter');
    });
  });
  describe('#work', function(){
    it('should add to cash', function(){
      var bob = new Renter('bob', '31', 'male', 'waiter');
      bob.cash = 0;
      bob.work();
      expect(bob.cash).to.be.within(50, 250);

      var bob1 = new Renter('bob', '31', 'male', 'coder');
      bob1.cash = 0;
      bob1.work();
      expect(bob1.cash).to.be.within(1000, 7000);

      var bob2 = new Renter('bob', '31', 'male', 'movie star');
      bob2.cash = 0;
      bob2.work();
      expect(bob2.cash).to.be.within(3000, 10000);
      
      var bob3 = new Renter('bob', '31', 'male', 'social worker');
      bob3.cash = 0;
      bob3.work();
      expect(bob3.cash).to.be.within(150, 750);
    });
  });
  describe('#payRent', function(){
    it('should subtract rent amount from cash', function(){
      var bob = new Renter('bob', '31', 'male', 'waiter');
      bob.cash = 1000;
      bob.payRent(500);
      expect(bob.cash).to.equal(500);
    });
    it('should not subtract and evict if not enough cash', function(){
      var bob = new Renter('bob', '31', 'male', 'waiter');
      bob.cash = 50;
      bob.payRent(500);
      expect(bob.cash).to.equal(50);
      expect(bob.isEvicted).to.be.true;
    });
  });
  describe('#party', function(){
    it('should evict the renter is party is too loud', function(){
      var bob = new Renter('bob', '31', 'male', 'waiter');
      var partycount = 0;
      while(bob.isEvicted === false){
        bob.party();
        partycount++;
      }
      expect(bob.isEvicted).to.be.true;
      console.log('The test threw ' + partycount + ' parties before getting evicted');
    });
  });
});
