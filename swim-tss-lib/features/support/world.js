const { setWorldConstructor } = require('cucumber');
const { Workout } = require('../../index.js');

class SwimWorkoutWorld {
  constructor() {
    this.workout = new Workout();
  }
}

setWorldConstructor(SwimWorkoutWorld)

