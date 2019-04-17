import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | calc', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:calc');
    assert.ok(route);
  });
});
