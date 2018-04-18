import makeMatchsList from './matchs.js'

const someMatchs = [
  {
    "name": 1,
    "type": "group",
    "teamHome": France,
    "teamOut": Italie,
    "scoreTeamHome": null,
    "scoreTeamOut": null,
    "date": "2018-06-14T18:00:00+03:00",
    "stadium": 1,
    "channels": [],
    "finished": false
  },
  {
    "name": 2,
    "type": "group",
    "teamHome": Espagne,
    "teamOut": Belgique,
    "scoreTeamHome": null,
    "scoreTeamOut": null,
    "date": "2018-06-15T17:00:00+05:00",
    "stadium": 12,
    "channels": [],
    "finished": false
  },
  {
    "name": 17,
    "type": "group",
    "teamHome": Angleterre,
    "teamOut": Bresil,
    "scoreTeamHome": null,
    "scoreTeamOut": null,
    "date": "2018-06-19T21:00:00+03:00",
    "stadium": 3,
    "channels": [],
    "finished": false
  },
]

const expectedHtml = `
<ul>
  <li>France - Italie</li>
  <li>Espagne - Belgique</li>
  <li>Angleterre - Bresil</li>
</ul>
`

describe('matchs',  () => {
    it('should return string',  () => {
      chai.assert.typeOf(makeMatchsList(someMatchs), 'string')
    });
  });