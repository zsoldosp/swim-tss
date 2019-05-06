// TODO: what to do on bad input? currently an emty row gives the whole TSS NaN
function calculateIntervalStats({reps, distancePerRep, paceInSeconds, restPerRepInSeconds, ftpPaceInSeconds}) {
  let res = {};
  res.totalDistance = distancePerRep * reps;
  res.intensity = ftpPaceInSeconds / paceInSeconds;

  res.perRepSwimTimeInSeconds = (distancePerRep / 100) * paceInSeconds;
  res.totalSwimTimeInSeconds = res.perRepSwimTimeInSeconds * reps;
  res.totalRestTimeInSeconds = reps * restPerRepInSeconds; // TODO: shouldn't be reps - 1?

  res.totalSwimTimeInHours = res.totalSwimTimeInSeconds / 60.0 / 60;
  res.sTSS = Math.pow(res.intensity, 3)*100 * res.totalSwimTimeInHours;
  res.totalTimeInSeconds = res.totalSwimTimeInSeconds + res.totalRestTimeInSeconds;
  return res;
}

function calculateWorkoutStats({ftpPaceInSeconds, intervals, intervalStats}) {
  let res = {};
  res.sTSS = 0;
  res.TimeInSeconds = 0;
  res.Distance = 0;

  if ( ! intervalStats ) {
    intervalStats = intervals.map(function(interval) {
      interval.ftpPaceInSeconds = ftpPaceInSeconds;
      return calculateIntervalStats(interval);
    });
  }

  intervalStats.forEach(function(intervalStat) {
    res.sTSS += intervalStat.sTSS;
    res.TimeInSeconds += intervalStat.totalTimeInSeconds;
    res.Distance += intervalStat.totalDistance;
  });
  res.intervalStats = intervalStats;
  res.sTSS = Math.round(res.sTSS);
  res.TimeInHours = res.TimeInSeconds / 60.0 / 60 ;
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
