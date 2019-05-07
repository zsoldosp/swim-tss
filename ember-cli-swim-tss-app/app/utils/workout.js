import swimtss from 'npm:swim-tss';
import EmberObject, { computed } from '@ember/object';
import { A } from '@ember/array';

export default EmberObject.extend({
  init() {
    this._super(...arguments);
    this.inputIntervals = A();
  },

  addInterval(interval) {
    this.inputIntervals.pushObject(interval);
  },

  removeInterval(interval) {
    this.inputIntervals.removeObject(interval);
  },

  intervals: computed('inputIntervals.@each.inputError', function() {
    return this.inputIntervals.filter(x => x && ! x.inputError);
  }),

  intervalStats: computed('intervals.@each.stats', function() {
    return this.intervals.map(x => x.stats);
  }),

  stats: computed('ftpPaceInSeconds', 'intervalStats.@each.sTSS', function() {
    return EmberObject.create(swimtss.calculateWorkoutStats(this));
  }),
});
