import swimtss from 'npm:swim-tss';
import EmberObject, { observer } from '@ember/object';

const fields = ['reps', 'distance', 'pace', 'rest'];

export default EmberObject.extend({
  init() {
    this._super(...arguments);
    this.changeCount = 0;
    let self = this;
    let ivalArgs = {};
    fields.forEach(function initLocal(fieldName) {
      let instanceVal = self.get(fieldName);
      ivalArgs[fieldName] = self.get(fieldName);
    });
    this.interval = new swimtss.Interval(ivalArgs);
    this.workout.addInterval(this);
  },

  onIntervalChanged: observer(...fields, function() {
    let self = this;
    fields.forEach(function initLocal(fieldName) {
      self.interval[fieldName] = self.get(fieldName);
    });
    this.workout.calculateStats();
    this.changeCount++;
  }),
});
