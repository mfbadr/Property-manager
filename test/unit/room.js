/* jshint expr: true */
/* global describe, it */
'use strict';


var expect = require('chai').expect;
var Room = require('../../app/models/room');

describe('Room', function(){
  describe('constructor', function(){
    it('should make a new room with correct attributes', function(){
      var room = new Room('living', '10', '8');
        expect(room.name).to.equal('living');
        expect(room.width).to.equal(10);
        expect(room.length).to.equal(8);
    });
  });
  describe('#area', function(){
    it('should return the area of a room', function(){
      var room = new Room('living', '10', '8');
      expect(room.area()).to.equal(80);
    });
  });
  describe('#cost', function(){
    it('should return the cost of a room', function(){
      var room = new Room('living', '10', '8');
      expect(room.cost()).to.equal(80 * 5);
    });
  });
});
