import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: 'tr',
  classNameBindings: ['editing'],
  editing: computed('interval', 'selectedInterval', function() {
    return this.interval == this.selectedInterval;
  }),
  actions: {
    removeCurrentIntervalAction() {
      this.onRemove();
    },
    editCurrentIntervalAction() {
      this.onEditRequest();
    }
  },
});
