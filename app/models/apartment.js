'use strict';

var cAppts = global.mongodb.collection('apartments');
// var Renter = require('./renter');


function Apartment(name){
  this.name = name;
  this.renters = [];
  this.rooms = [];
}

Apartment.prototype.area = function(){
  var apptArea = 0;
  for( var i = 0; i < this.rooms.length; i++){
    apptArea += this.rooms[i].area();
  }
  return apptArea;
};

Apartment.prototype.cost = function(){
  var apptCost = 0;
  for( var i = 0; i < this.rooms.length; i++){
    apptCost += this.rooms[i].cost();
  }
  return apptCost;
};

Apartment.prototype.bedrooms = function(){
  var bedroomCount = 0;
  for( var i = 0; i < this.rooms.length; i++){
    if( this.rooms[i].name === 'bedroom') { bedroomCount++;
    } 
  }
  return bedroomCount;
};

Apartment.prototype.isAvailable = function(){
  if( this.bedrooms() > this.renters.length){return true;
  }else{return false;
  }
};

Apartment.prototype.purgeEvicted = function(){
  var notEvicted = [];
  for( var i = 0; i < this.renters.length; i++){
    if( this.renters[i].isEvicted === false){
      notEvicted.push(this.renters[i]);
    }
  }
  this.renters = notEvicted;
};

Apartment.prototype.collectRent = function(){
  var amount = (this.cost()/this.renters.length);
  for( var i = 0; i < this.renters.length; i++){
   this.renters[i].payRent(amount); 
  }
};

Apartment.prototype.save = function(cb){
  cAppts.save(this, function(err, object){
    cb();
  });
};
module.exports = Apartment;
