module.exports = [
  {
    name: 'does not get simpler than this',
    ballots: [
      ['A']
    ],
    expectedWinner: 'A'
  },
  {
    name: 'dead votes dont count',
    ballots: [
      ['A'],
      ['A'],
      ['B'],
      ['B'],
      ['C', 'D', 'B'], // D got dropped on first round, so this should go to B
    ],
    expectedWinner: 'B'
  },
  {
    name: 'tie breaker',
    ballots: [
      ['A'],
      ['A'],
      ['B'],
      ['B'],
      ['C', 'D', 'B'],
      ['C', 'D', 'B'],
      ['D']
    ],
    expectedWinner: 'C' // C wins out here becase higher index loses ties
  },
  {
    ballots: [
      ['A'],
      ['A'],
      ['B'],
      ['B'],
      ['C', 'D', 'B'],
      ['C', 'D', 'B'],
      ['D', 'B']
    ],
    expectedWinner: 'B'
  },
  {
    name: 'winner decided on third round',
    ballots: [
      ['A'],
      ['A'],
      ['A'],
      ['B'],
      ['B'],
      ['B'],
      ['C'],
      ['C'],
      ['D', 'C'],
      ['E', 'C'],
    ],
    expectedWinner: 'C'
  },
];
