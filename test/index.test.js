'use strict';
const _ = require('lodash');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const sinonStubPromise = require('sinon-promises');
const chaiAsPromised = require('chai-as-promised');
const run = require('./..');
const util = require('util')


sinonStubPromise(sinon);
chai.use(chaiAsPromised);
chai.use(sinonChai);

const expect = chai.expect;

describe('altVote', () => {
  describe('#', () => {

    it('simple one round', () => {
      const results = run(
        ['A', 'B'], // candidates
        [ // ballots to distribute
          ['A'],
          ['B'],
          ['A'],
        ]
      );
      expect(results[0]['A'].length).to.equal(2);
      expect(results[1]).to.be.undefined;
    });

    it('simple two round', () => {
      const results = run(
        ['A', 'B', 'C'],
        [
          ['A'],
          ['A'],
          ['B'],
          ['B'],
          ['C', 'A'],
        ]
      );
      expect(results[0]['A'].length).to.equal(2);
      expect(results[1]['A'].length).to.equal(3);
      expect(results[2]).to.be.undefined;
    });

    it('simple three round', () => {
      const results = run(
        ['A', 'B', 'C', 'D'],
        [
          ['A'],
          ['A'],
          ['A'],
          ['B'],
          ['B'],
          ['B'],
          ['C', 'A'],
          ['D', 'B'],
          ['D', 'A'],
        ]
      );

      expect(results[0]['A'].length).to.equal(3);
      expect(results[2]['A'].length).to.equal(5);
      expect(results[3]).to.be.undefined;
    });

    it('simple tie', () => {
      const results = run(
        ['A', 'B'],
        [
          ['A'],
          ['B'],
        ]
      );

      expect(results[0]['A'].length).to.equal(1);
      expect(results[1]['A']).to.be.undefined; // sorry A, tough luck
      expect(results[1]['B'].length).to.equal(1);
      expect(results[2]).to.be.undefined;
    });

    // table tests
    _.forEach(require('./testCases'), (testCase) => {
      it(testCase.name, () => {
        const results = run(['A', 'B', 'C', 'D', 'E', 'F'], testCase.ballots);
        expect(_getWinner(results)).to.equal(testCase.expectedWinner);
      });
    });

  });

});

function _getWinner(results) {
  const lastRound = _.last(results);
  let winner, winnerVoteCount;
  _.forEach(lastRound, (v, k) => {
    if (!winner || v.length > winnerVoteCount ) {
      winner = k;
      winnerVoteCount = v.length;
    }
  });
  return winner;
}
