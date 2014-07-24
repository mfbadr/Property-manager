'use strict';

var cAppts = global.mongodb.collection('apartments');


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

module.exports = Apartment;
