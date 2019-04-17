import Route from '@ember/routing/route';
import swimtss from 'npm:swim-tss';

export default Route.extend({
  model() {
    return new swimtss.Workout();
  }
});
