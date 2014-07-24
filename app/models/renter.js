'use strict';

function Renter(name, age, gender, profession){
  this.name = name;
  this.age = parseInt(age);
  this.gender = gender;
  this.profession = profession;
  this.cash = Math.floor(Math.random() * (4901) + 100);
  this.isEvicted = false;

}
  
module.exports = Renter;
