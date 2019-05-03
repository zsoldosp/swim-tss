import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    addIntervalAction(workout) {
      workout.addInterval();
    },
    removeIntervalAction(workout, interval) {
      workout.removeInterval(interval);
    },
  },
});
