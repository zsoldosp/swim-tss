import Component from '@ember/component';
import Interval from 'ember-cli-swim-tss-app/utils/interval';

export default Component.extend({
  actions: {
    editDoneOK() {
      if ( this.onOK ) {
        this.onOK();
      }
    },
    editDoneCancel() {
      if ( this.onCancel ) {
        this.onCancel();
      }
    },
  },
});
