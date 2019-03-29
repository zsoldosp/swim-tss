const { Given, When, Then } = require('cucumber')
const assert = require('assert');
const { expect } = require('chai')
const { Interval } = require('../../index.js');


Given('I swam {int}x{int} @ {int}s \/ 100 pace with {int} seconds of rest', function (reps, distance, pace, rest) {
  this.workout.addInterval(
    new Interval({
      'reps': reps,
      'distance': distance,
      'pace': pace,
      'rest': rest,
    })
  );
});

Given('my FTP pace is {int}s / 100', function(ftp) {
  this.workout.setFTP(ftp);
});

When('workout stats are calculated', function() {
  this.workout.calculateStats();
});

Then('sTSS is {int}', function(sTSS) {
  assert.equal(this.workout.sTSS, sTSS);
});
Then('IF is {float}', function(IF) {
  assert.equal(this.workout.IF, IF);
});
