import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    onEditSave() {
      let src = this.model.selectedIntervalForEdit,
          trg = this.model.selectedInterval;
      if ( ! trg ) {
        this.model.workout.addInterval(src);
      } else {
        src.copyTo(trg);
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
