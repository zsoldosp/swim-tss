function calculateIntervalStats({reps, distancePerRep, paceInSeconds, restPerRepInSeconds, ftpPaceInSeconds}) {
  let res = {};
  res.totalDistance = distancePerRep * reps;
  res.intensity = ftpPaceInSeconds / paceInSeconds;

  res.perRepSwimTimeInSeconds = (distancePerRep / 100) * paceInSeconds;
  res.totalSwimTimeInSeconds = res.perRepSwimTimeInSeconds * reps;
  res.totalRestTimeInSeconds = reps * restPerRepInSeconds; // TODO: shouldn't be reps - 1?

  res.totalSwimTimeInHours = res.totalSwimTimeInSeconds / 60 / 60;
  res.sTSSBeforeRounding = Math.pow(res.intensity, 3)*100 * res.totalSwimTimeInHours;
  res.sTSS = Math.round(res.sTSSBeforeRounding); // TODO: remove once confirmed with AC?
  res.totalTimeInSeconds = res.totalSwimTimeInSeconds + res.totalRestTimeInSeconds;
  res.totalTimeInMinutesRounded = Math.round(res.totalSwimTimeInSeconds/60) + Math.round(res.totalRestTimeInSeconds / 60); // TODO: don't round as it causes problems in aggregation (total time, thus in IF calculation)
  // e.g.: FTP 90s / 100, 1x200 @ 100s / 100 pace with 10 secs of rest, IF rounded 0.93, not rounded 0.88
  return res;
}

function calculateWorkoutStats({ftpPaceInSeconds, intervals, intervalStats}) {
  let res = {};
  res.sTSS = 0;
  res.TimeInMinutes = 0;
  res.Distance = 0;

  if ( ! intervalStats ) {
    intervalStats = intervals.map(function(interval) {
      interval.ftpPaceInSeconds = ftpPaceInSeconds;
      return calculateIntervalStats(interval);
    });
  }

  intervalStats.forEach(function(intervalStat) {
    res.sTSS += intervalStat.sTSS;
    res.TimeInMinutes += intervalStat.totalTimeInMinutesRounded;
    res.Distance += intervalStat.totalDistance;
  });
  res.sTSS = Math.round(res.sTSS);
  res.TimeInHours = res.TimeInMinutes / 60 ;
  res.IF = Math.pow(res.sTSS/res.TimeInHours/100, 1/3).toFixed(2);
  return res;
}

class Workout {
  constructor() {
    this.intervals = [];
  }

  setFTP(ftp) {
    this.ftpPaceInSeconds = ftp;
    this.intervals.forEach(iv => iv.calculateStats(ftp));
  }

  addInterval(interval) {
    this.intervals.push(interval);
  }

  calculateStats() {
    let stats = calculateWorkoutStats(this);
    let self = this;
    Object.getOwnPropertyNames(stats).forEach(function(propertyName) {
      self[propertyName] = stats[propertyName];
    });
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
    this.ftpPaceInSeconds = ftpPaceInSeconds;
    let stats = calculateIntervalStats(this);
    let self = this;
    Object.getOwnPropertyNames(stats).forEach(function(propertyName) {
      self[propertyName] = stats[propertyName];
    });
  }
}

module.exports = exports = {
  Workout: Workout,
  Interval: Interval,
  calculateWorkoutStats: calculateWorkoutStats,
  calculateIntervalStats: calculateIntervalStats,
};
