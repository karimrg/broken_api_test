var express = require('express');
var router = express.Router();

function Person(body) {
  this.name = body.name;
  this.pets = body.pets;
  this.apples = 12;
}

Person.prototype.greet = function() {
  this.greeting = 'Hi ' + this.name + ', how are you?';
  return this.greeting;
};

Person.prototype.howManyApples = function(first_argument) {
    return this.name + ' has ' + this.apples + ' apples';
};

Person.prototype.greetPet = function(pet) {
  return 'Hi ' + pet + ', YOU\'RE JUST SO FLUFFY! :O';
};

Person.prototype.greetPets = function(first_argument) {
  var petGreeting = [];
  var greetPet = Person.prototype.greetPet;
  if (first_argument instanceof Array) {
    first_argument.forEach(function(pet) {
      petGreeting.push(greetPet(pet));
    });
  } else {
    if (first_argument !== undefined )
      petGreeting.push(this.greetPet(first_argument));
  }
  var _result = petGreeting.join().replace( /O,/, 'O ');
  return _result;
};

router.post('/', function(req, res, next) {
  var _person = new Person(req.body);
  res.send({
  	greeting: _person.greet(),
    apples: _person.howManyApples( _person.apples ),
    greetPets: _person.greetPets(_person.pets)
  });



});

module.exports = router;
