import Component from '@ember/component';
import Interval from 'ember-cli-swim-tss-app/utils/interval';

export default Component.extend({
  actions: {
    addInterval() {
      if ( this.interval.inputError ) {
        return;
      }
      this.workout.addInterval(this.interval);
      this.set('interval', null);
    }
  },
  didReceiveAttrs() {
    this._super(...arguments);
    if ( ! this.interval ) {
      this.interval = Interval.create({workout: this.workout});
    }
  },
});
