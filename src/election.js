'use strict';
const _ = require('lodash');

module.exports = run;


function run(candidates, ballots) {
  if(ballots.length == 0){
    return [];
  }
  //TODO: validate candidates
  const bins = _.transform(candidates, (result, candidate) => {
    result[candidate] = [];
  }, {})
  return _run(bins, ballots);
}


function _run(bins, ballots, results) {
  if (results == null) {
    results = [];
  }

  // distribute ballots into bins
  _.forEach(ballots, (ballot) => {
    //TODO: validate ballot against duplicate votes
    //TODO: think about "write ins".  They will get ignored, and any legit candidate before or after a bad write in can earn them a vote, however maybe the ballot should be thrown out.
    _.forEach(ballot, (vote) => {
      if (bins[vote]) {
        bins[vote].push(ballot);
        return false; // early break out of inner forEach
      }
    });
  });

  // capture the results for this round
  results.push(_.cloneDeep(bins));

  // if we have a winner we're done
  if (_isWinner(bins)) {
    return results;
  }

  // looks like there was no winner.  Who's in last?
  const lastCandidate = _getLast(bins);
  const nextRoundsBallots = bins[lastCandidate];
  delete bins[lastCandidate];

  return _run(bins, nextRoundsBallots, results);
}

function _getLast(bins) {
  let lastCandidate, lastCandidateVoteCount;
  _.forEach(bins, (v, k) => {
    // in the event of a tie, whichever candidate get hits first will be considered the loser
    if (!lastCandidate || v.length < lastCandidateVoteCount ) {
      lastCandidate = k;
      lastCandidateVoteCount = v.length;
    }
  });

  return lastCandidate;
}

function _isWinner(bins) {
  let totalBallots = 0;
  let isWinner = false;
  _.forEach(bins, (v) => {
    totalBallots += v.length;
  });

  _.forEach(bins, (v) => {
    if (v.length / totalBallots > .5) {
      isWinner = true;
      return false; // early exit of _.forEach
    }
  });

  return isWinner;
}
