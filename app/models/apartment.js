'use strict';

var cAppts = global.mongodb.collection('apartments');
var Renter = require('./renter');
var _ = require('lodash');
var Room = require('./room');

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

Apartment.find = function( query, cb){
  cAppts.find(query).toArray( function(err, object){
    for (var i =0; i < object.length; i++){
      object[i] = reProto(object[i]);
    }
    cb(object);
  });
};

Apartment.findbyID = function( query, cb){
  cAppts.findOne(query, function(err, object){
    cb(object);
  });
};

Apartment.deletebyID = function ( id, cb){
  cAppts.remove( {_id : id}, function(){
    cb();
  });
};

Apartment.area = function(cb){
  Apartment.find({}, function(appts){
    var sum = 0;
    for(var i = 0; i < appts.length; i++){
      sum += appts[i].area();
    }
    cb(sum);
  });
};

Apartment.cost = function(cb){
  Apartment.find({}, function(appts){
    var sum = 0;
    for(var i = 0; i < appts.length; i++){
      sum += appts[i].cost();
    }
    cb(sum);
  });
};

Apartment.tenants = function(cb){
  Apartment.find({}, function(appts){
    var totalTenants = 0;
    for( var i = 0; i < appts.length; i++){
      totalTenants += appts[i].renters.length;
    }
    cb(totalTenants);
  });
};

Apartment.revenue = function(cb){
  Apartment.find( {}, function(appts){
    var sum = 0;
    for( var i = 0; i < appts.length; i++){
      if( appts[i].renters.length > 0) {
        sum += appts[i].cost();
   //     console.log(appts[i].cost());
      }
    }
    cb(sum);
  });

};

// HELPER FUNCTIONS //
// make a helper function to restory protoypes to renters and rooms
// cant do area without it 

function reProto(apt){
//  apt.rooms
  for(var i = 0; i < apt.rooms.length; i++){
    apt.rooms[i] = _.create(Room.prototype, apt.rooms[i]);
  }
//  apt.renters
  for( i = 0; i < apt.renters.length; i++){
    apt.renters[i] = _.create(Renter.prototype, apt.renters[i]);
  }

  apt = _.create(Apartment.prototype, apt);
  return apt;
}


module.exports = Apartment;
