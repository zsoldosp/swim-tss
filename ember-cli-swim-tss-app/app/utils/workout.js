import swimtss from 'npm:swim-tss';
import EmberObject, { computed } from '@ember/object';
import { A } from '@ember/array';
import Interval from 'ember-cli-swim-tss-app/utils/interval';

export default EmberObject.extend({
  init() {
    this._super(...arguments);
    this.intervals = A();
  },

  addInterval() {
    let interval = Interval.create({workout: this});
    this.intervals.pushObject(interval);
    return interval;
  },

  intervalStats: computed('intervals.@each.stats', function() {
    return this.intervals.map(x => x.stats);
  }),

  stats: computed('ftpPaceInSeconds', 'intervalStats.[]', function() {
    return EmberObject.create(swimtss.calculateWorkoutStats(this));
  }),
});
