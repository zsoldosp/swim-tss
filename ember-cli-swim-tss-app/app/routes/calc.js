import Route from '@ember/routing/route';
import Workout from 'ember-cli-swim-tss-app/utils/workout';

export default Route.extend({
  model() {
    let workout = Workout.create();
    workout.addInterval();
    return workout;
  }
});
