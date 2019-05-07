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
    intervalEditRequested(interval) {
      this.resetSelection();
      this.model.set('selectedInterval', interval);
    },
    removeIntervalAction(interval) {
      this.model.workout.removeInterval(interval);
    },
  },
  resetSelection() {
    this.model.set('selectedInterval', null);
  }
});
