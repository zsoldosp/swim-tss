import swimtss from 'npm:swim-tss';
import EmberObject, { observer } from '@ember/object';
import { A } from '@ember/array';

const fields = ['sFTP'];

export default EmberObject.extend({
  init() {
    this._super(...arguments);
    this.intervals = A();
    let self = this;
    let swimtssArgs = {};
    fields.forEach(function initLocal(fieldName) {
      let instanceVal = self.get(fieldName);
      swimtssArgs[fieldName] = self.get(fieldName);
    });
    this.workout = new swimtss.Workout(swimtssArgs);
    this.internalChange = false;
    this.get('intervals');
  },

  onWorkoutChanged: observer(...fields, function() {
    if ( this.internalChange ) {
      return;
    }
    let self = this;
    fields.forEach(function initLocal(fieldName) {
      self.workout[fieldName] = self.get(fieldName);
    });
    this.workout.calculateStats();
  }),

  onIntervalChanged: observer('intervals.@each.changeCount', function() {
    console.log('ember.workout.onIntervalChanged');
    this.internalChange = true;
    try {
      let params = {};
      let self = this;
      fields.forEach(function copyFromPOJSOToEmber(fieldName) {
        params[fieldName] = self.workout[fieldName];
      });
      this.setProperties(params);
    } finally {
      this.internalChange = false;
    }
  }),

  addInterval(interval) {
    this.workout.addInterval(interval.interval);
    this.intervals.pushObject(interval);
  },

});
