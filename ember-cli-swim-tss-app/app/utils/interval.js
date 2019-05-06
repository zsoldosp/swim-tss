import swimtss from 'npm:swim-tss';
import EmberObject, { computed } from '@ember/object';

const fields = [];

export default EmberObject.extend({
  ftpPaceInSeconds: computed.alias('workout.ftpPaceInSeconds'),

  inputError: computed('stats.sTSS', function() {
    return Number.isNaN(this.stats.sTSS);
  }),

  stats: computed('reps', 'distancePerRep', 'paceInSeconds', 'restPerRepInSeconds', 'ftpPaceInSeconds', function() {
     return EmberObject.create(swimtss.calculateIntervalStats(this));
  }),
});
