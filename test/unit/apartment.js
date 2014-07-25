/* jshint expr: true */
/* global describe, it, before, beforeEach */
'use strict';

var expect = require('chai').expect;
var Apartment;
var Room = require('../../app/models/room');
var Mongo = require('mongodb');
var connect = require('../../app/lib/mongodb');
var Renter = require('../../app/models/renter');
var a1, a2, a3;

describe('Apartment', function(){
  before(function(done){
    connect('property-manager-test', function (){
      Apartment = require('../../app/models/apartment');
      done();
    });
  });
  
  beforeEach(function(done){
    global.mongodb.collection('apartments').remove(function(){
      a1  = new Apartment('A1');
      var r11 = new Room('living room', 8, 10); 
      var r12 = new Room('bedroom', 12, 10); 
      var r13 = new Room('dining room', 10, 15); 
      a1.rooms.push(r11 ,r12 ,r13);

      a2  = new Apartment('A2');
      var r21 = new Room('living room', 8, 10); 
      var r22 = new Room('bedroom', 12, 10); 
      var r23 = new Room('dining room', 10, 15); 
      var r24 = new Room('bedroom', 10, 15); 
      a2.rooms.push(r21 ,r22 ,r23, r24);
     
      a3  = new Apartment('A3');
      var r31 = new Room('living room', 8, 10); 
      var r32 = new Room('bedroom', 12, 10); 
      var r33 = new Room('dining room', 10, 15); 
      a3.rooms.push(r31 ,r32 ,r33);
     
      global.mongodb.collection('apartments').insert([a1,a2,a3], function(){
        done();
      });
    });
  });

  describe('constructor', function(){
   it('should create a new appt with proper attributes', function(){
  //   var A1= new Apartment('A1');
     expect(a1.rooms).to.be.instanceof(Array);
     expect(a1.rooms).to.have.length(3);
     expect(a1.renters).to.be.instanceof(Array);
     expect(a1.renters).to.have.length(0);
     expect(a1.name).to.equal('A1');
   });
  }); 
  describe('#area', function(){
    it('should sum area of all rooms', function(){
//      var A1= new Apartment('A1');
//      var r1 = new Room('living room', 8, 10); 
//      var r2 = new Room('bedroom', 12, 10); 
//      var r3 = new Room('dining room', 10, 15); 
//      A1.rooms.push(r1 ,r2 ,r3);
      expect(a1.area()).to.equal(350);
    });
  });
  describe('#cost', function(){
    it('should sum the cost of all rooms', function(){
//      var A1= new Apartment('A1');
//      var r1 = new Room('living room', 8, 10); 
//      var r2 = new Room('bedroom', 12, 10); 
//      var r3 = new Room('dining room', 10, 15); 
//
//      A1.rooms.push(r1 ,r2 ,r3);
      expect(a1.cost()).to.equal(350* 5);
    });
  });
  describe('#bedrooms', function(){
    it('should count the bedrooms in an appt and return a number', function(){
      expect(a2.bedrooms()).to.equal(2);
    });
  });
  describe('#isAvailable', function(){
    it('should be true if bedrooms > renters', function(){
      var bob = new Renter('bob', '31', 'male',  'waiter');
      a2.renters.push(bob);
      expect(a2.isAvailable()).to.be.true;
    });
    it('should be false if bedrooms < renters', function(){
      var bob = new Renter('bob', '31', 'male', 'waiter');
      a1.renters.push(bob);
      expect(a1.isAvailable()).to.be.false;
      
    });
  });
  describe('#purgeEvicted', function(){
    it('should purge renters who are evicted', function(){
      var bob = new Renter('bob', '31', 'male', 'waiter');
      var bob1 = new Renter('bob', '31', 'male', 'waiter');
      bob1.isEvicted = true;
      a2.renters.push(bob, bob1);
      expect(a2.renters.length).to.equal(2);
      a2.purgeEvicted();
      expect(a2.renters.length).to.equal(1);
    });
  });
  describe('#collectRent', function(){
    it('should charge renters rent if they have enough', function(){
      var bob = new Renter('bob', '31', 'male', 'waiter');
      var bob1 = new Renter('bob', '31', 'male', 'waiter');
      bob.cash = 1000;
      bob1.cash = 1500;
      a2.renters.push(bob, bob1);
      a2.collectRent(); // a2.area = 500, a2.cost = 2500, a2.cost/renters.lenngth = 1250
      expect(bob.cash).to.equal(1000);
      expect(bob1.cash).to.equal(250);
      expect(bob.isEvicted).to.be.true;
      expect(bob1.isEvicted).to.be.false;
    });
  });
  describe('#isAvailable', function(){
    it('should return bedrooms() - renters.length', function(){
      var bob = new Renter('bob', '31', 'male', 'waiter');
      a2.renters.push(bob);
      expect(a2.isAvailable()).to.be.true;
    });
  });
  describe('#save', function(){
    it('should save a new appt to the appt db' , function(done){

      var a4  = new Apartment('A4');
      a4.save( function(){
        expect(a4._id).to.be.instanceof(Mongo.ObjectID);
        done();
      });
    });
  });
  describe('.find', function(){
    it('should find all appts', function(done){
      Apartment.find( {},function(appts){
        expect(appts).to.have.length(3);
        done();
      });
    });
  });
});

