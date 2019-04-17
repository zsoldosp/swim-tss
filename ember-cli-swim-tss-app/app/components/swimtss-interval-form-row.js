import Component from '@ember/component';
import Interval from 'ember-cli-swim-tss-app/utils/interval';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: 'tr',
  inputReps: computed.alias('interval.reps'),
  inputDistance: computed.alias('interval.distance'),
  inputPace: computed.alias('interval.pace'),
  inputRest: computed.alias('interval.rest'),
  init() {
    this._super(...arguments);
    this.interval = Interval.create({workout: this.workout})
  },
});
