Feature: Swim TSS
  In order to track my training load
  As a coach or swimmer
  I want to know the stress score for my workout
  Where based on input of
    FTP is the threshold pace in seconds / 100
  and list of intervals where
    reps is the number of repetitions
    pace is in seconds / 100
    rest is in seconds, between intervals
    distance is in meters or yards, doesn't matter
    time (in minutes) is reps * (distance / 100 * pace + rest) / 60
    Distance is reps * distance
  for each interval,
    IF (intensity factor) is pace / FTP
    Distance is reps x distance
    sTSS is (IF^3)*100*reps*(Distance/100)*(pace/3600)
    based on AC's formula from https://www.alancouzens.com/blog/SwimTSS.html
  and for the whole workout
    sTSS is the sum of interval sTSS values
    Time is the sum of times in minutes
    IF (intensity factor) is (sTSS/Time in Minutes/100)^(1/3)

var FTP = $('#FTP').val();

var reps1 = $('#reps1').val();
var pace1 = $('#pace1').val();
var rest1 = $('#rest1').val();
var dist1 = $('#dist1').val();

var int1 = FTP/pace1;
var Dist1 = reps1*dist1;
var TSS1 = Math.round((Math.pow(int1,3)*100)*reps1*(dist1/100)*(pace1/3600)); // pace in hours
var Time1 = Math.round(reps1*(dist1/100)*(pace1/3600)*60)+Math.round(reps1*(rest1/3600)*60); // time in minutes

var TSS = TSS1+TSS2+TSS3+TSS4+TSS5;
var Time = Time1+Time2+Time3+Time4+Time5;  // minutes
var Dist = Dist1+Dist2+Dist3+Dist4+Dist5;
var IntF = Math.pow(((TSS/(Time/60))/100),0.33).toFixed(2); // time in hours


  Scenario Outline: Single interval workouts
    Given my FTP pace is <ftp>s / 100
    And I swam <reps>x<distance> @ <pace>s / 100 pace with <rest> seconds of rest
    When workout stats are calculated
    Then sTSS is <sTSS>
    And IF is <IF>

    Examples:
      | ftp | reps | distance | pace | rest | sTSS | IF   |
      |  90 |    1 |      200 |  100 |   10 |    4 | 0.93 |
      |  90 |    2 |      100 |  100 |   10 |    4 | 0.93 |
      | 120 |    2 |      100 |  110 |   10 |    8 | 1.06 |
      | 110 |    3 |      500 |  115 |   15 |   42 | 0.94 |

  Scenario: WU 400, MS: 3x400 @ threshold, CD: 200
    Given my FTP pace is 90s / 100
    And I swam 4x100 @ 100s / 100 pace with 15 seconds of rest
    And I swam 3x400 @ 90s / 100 pace with 10 seconds of rest
    And I swam 2x100 @ 105s / 100 pace with 15 seconds of rest
    When workout stats are calculated
    Then sTSS is 42
    And IF is 0.92
