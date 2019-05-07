import swimtss from 'npm:swim-tss';
import EmberObject, { computed } from '@ember/object';

export default EmberObject.extend({
  ftpPaceInSeconds: computed.alias('workout.ftpPaceInSeconds'),

  inputError: computed('stats.sTSS', function() {
    return Number.isNaN(this.stats.sTSS);
  }),

  stats: computed('reps', 'distancePerRep', 'paceInSeconds', 'restPerRepInSeconds', 'ftpPaceInSeconds', function() {
     return EmberObject.create(swimtss.calculateIntervalStats(this));
  }),

  clone() {
    let interval = Interval.create();
    this.copyTo(interval);
    return interval;
  },

  copyTo(interval) {
    interval.setProperties({
     'reps': this.reps,
     'distancePerRep': this.distancePerRep,
     'paceInSeconds': this.paceInSeconds,
     'restPerRepInSeconds': this.restPerRepInSeconds,
     'workout': this.workout,
    });
  }
});
