class Workout {
  constructor() {
    this.intervals = [];
  }

  setFTP(ftp) {
    this.ftpPaceInSeconds = ftp;
    this.intervals.forEach(iv => iv.calculateStats(ftp));
  }

  addInterval(interval) {
    interval.calculateStats(this.ftpPaceInSeconds);
    this.intervals.push(interval);
  }

  calculateStats() {
    const self = this;
    this.sTSS = 0;
    this.TimeInMinutes = 0;
    this.Distance = 0;

    this.intervals.forEach(function(interval) {
      self.sTSS += interval.sTSS;
      self.TimeInMinutes += interval.totalTimeInMinutesRounded;
      self.Distance += interval.Distance;
    });
    this.sTSS = Math.round(this.sTSS);
    this.TimeInHours = this.TimeInMinutes / 60 ;
    this.IF = Math.pow(this.sTSS/this.TimeInHours/100, 1/3).toFixed(2);
  }
};

class Interval {
  constructor({reps, distance, pace, rest}) {
    this.reps = reps;
    this.distancePerRep = distance;
    this.paceInSeconds = pace;
    this.restPerRepInSeconds = rest;
  }

  calculateStats(ftpPaceInSeconds) {
    this.totalDistance = this.distancePerRep * this.reps;
    this.intensity = ftpPaceInSeconds / this.paceInSeconds;

    this.perRepSwimTimeInSeconds = (this.distancePerRep / 100) * this.paceInSeconds;
    this.totalSwimTimeInSeconds = this.perRepSwimTimeInSeconds * this.reps;
    this.totalRestTimeInSeconds = this.reps * this.restPerRepInSeconds; // TODO: shouldn't be reps - 1?

    this.totalSwimTimeInHours = this.totalSwimTimeInSeconds / 60 / 60;
    this.sTSS = Math.pow(this.intensity, 3)*100 * this.totalSwimTimeInHours;
    this.sTSS = Math.round(this.sTSS); // TODO: remove once confirmed with AC?
    this.totalTimeInSeconds = this.totalSwimTimeInSeconds + this.totalRestTimeInSeconds;
    this.totalTimeInMinutesRounded = Math.round(this.totalSwimTimeInSeconds/60) + Math.round(this.totalRestTimeInSeconds / 60); // TODO: don't round as it causes problems in aggregation (total time, thus in IF calculation)
    // e.g.: FTP 90s / 100, 1x200 @ 100s / 100 pace with 10 secs of rest, IF rounded 0.93, not rounded 0.88
  }
}

module.exports = exports = {
  Workout: Workout,
  Interval: Interval
};
