import Route from '@ember/routing/route';
import Workout from 'ember-cli-swim-tss-app/utils/workout';
import Interval from 'ember-cli-swim-tss-app/utils/interval';
import EmberObject, { computed } from '@ember/object';

const SwimTssModel = EmberObject.extend({
  init() {
    this._super(...arguments);
    this.workout = Workout.create();
  },
  selectedIntervalForEdit: computed('selectedInterval', function() {
   if ( this.selectedInterval ) {
     return this.selectedInterval.clone();
   } else {
     return Interval.create({'workout': this.workout});
   }
  }),
});

export default Route.extend({
  model() {
    return SwimTssModel.create();
  }
});
