import swimtss from 'npm:swim-tss';
import EmberObject, { computed } from '@ember/object';

const fields = [];

export default EmberObject.extend({
  init() {
    this._super(...arguments)
  },
  ftpPaceInSeconds: computed.alias('workout.ftpPaceInSeconds'),

  stats: computed('reps', 'distancePerRep', 'paceInSeconds', 'restPerRepInSeconds', 'ftpPaceInSeconds', function() {
     return EmberObject.create(swimtss.calculateIntervalStats(this));
  }),
});
