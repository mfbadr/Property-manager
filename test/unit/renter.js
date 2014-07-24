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
});
