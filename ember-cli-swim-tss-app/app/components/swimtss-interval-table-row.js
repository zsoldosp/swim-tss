import Component from '@ember/component';

export default Component.extend({
  tagName: 'tr',
  actions: {
    removeCurrentIntervalAction() {
      this.onRemove();
    },
  },
});
