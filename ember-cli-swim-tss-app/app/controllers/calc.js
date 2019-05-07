import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    onEditSave() {
      if ( ! this.model.selectedInterval ) {
        this.model.workout.addInterval(this.model.selectedIntervalForEdit);
      } else {
        this.model.selectedInterval.copyTo(this.model.selectedInterval);
      }
      this.resetSelection();
    },
    onEditCancel() {
      this.resetSelection();
    },
    intervalEditRequested(model, interval) {
      model.set('selectedInterval', interval);
    },
    removeIntervalAction(workout, interval) {
      workout.removeInterval(interval);
    },
  },
  resetSelection() {
    this.model.set('selectedInterval', null);
  }
});
