## election
- Array of candidate names
- array of ballots.

Ex.

```javascript
const altVote = require('alt-vote');

const results = altVote.election(['A', 'B', 'C'],
[
  ['A'],
  ['A'],
  ['B'],
  ['B'],
  ['C', 'A'],
]);

console.log(util.inspect(results,{depth: null }));
```
outputs:

```javascript
[ { A: [ [ 'A' ], [ 'A' ] ],
    B: [ [ 'B' ], [ 'B' ] ],
    C: [ [ 'C', 'A' ] ] },
  { A: [ [ 'A' ], [ 'A' ], [ 'C', 'A' ] ],
    B: [ [ 'B' ], [ 'B' ] ] } ]

```
results[0] is a snapshot of the ballot distribution after round 1

results[1] is a snapshot of the ballot distribution after round 2, etc....

The last index in results is always the last round.  The winner will be the one with the most ballots associated with them.

### Rules
- If at the end of a round, a candidate has more than 50% of the total ballots still in distribution, the election is over and that candidate is the winner.
- If there is no winner at the end of a round, the candidate with the least number of ballots to their name is removed and their ballots are redistributed amongst the remaining candidates according to the votes on those ballots.
- If there are two or more candidates that are tied for the least number of votes, the candidate that appeared earliest in the initial candidate list is chosen as the loser.  Chances of this happening are greatly reduced as the number of ballots cast increases.
