import { makeMatch } from "./matchs.js"
import makeMatchsList from "./matchs.js"
import { cleanHtml } from "./utils.js"
import { makeDisplayMatch } from "./matchs.js"


const someMatchs = [
  {
    "name": 1,
    "type": "group",
    "teamHome": "France",
    "teamOut": "Italie",
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
    "teamHome": "Espagne",
    "teamOut": "Belgique",
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
    "teamHome": "Angleterre",
    "teamOut": "Bresil",
    "scoreTeamHome": null,
    "scoreTeamOut": null,
    "date": "2018-06-19T21:00:00+03:00",
    "stadium": 3,
    "channels": [],
    "finished": false
  },
]

const expectedMakeMatchsResult = cleanHtml(`
	<ul>
		<li>France - Italie</li>
		<li>Espagne - Belgique</li>
		<li>Angleterre - Bresil</li>
	</ul>
`)

describe('makeMatchsList',  () => {
    it('should return string',  () => {
      chai.assert.typeOf(makeMatchsList(someMatchs), 'string')
    });
    it('should return an html string of a gamers list',  () => {
      const result = cleanHtml(makeMatchsList(someMatchs))
      chai.assert.equal(result, expectedMakeMatchsResult)
    });
  });

const oneMatch = {
    "name": 1,
    "type": "group",
    "teamHome": "Russie",
    "teamOut": "Italie",
    "scoreTeamHome": 1,
    "scoreTeamOut": 0,
    "date": "2018-06-14T18:00:00+03:00",
    "stadium": 1,
    "channels": [],
    "finished": false
}

const expectedMakeMatchResult = cleanHtml(`<li>Russie - Italie</li>`)

describe("makeMatch", () => {
  it("should return a string", () => {
    chai.assert.typeOf(makeMatch(oneMatch), 'string')
  })
  it('should return an html string of a match li',  () => {
    const result = cleanHtml(makeMatch(oneMatch))   
    chai.assert.equal(result, expectedMakeMatchResult)
  });
})

const expectedMakeDisplayMatchResult = cleanHtml(`
  <div class="col-4 text-center">
    <div class="card mb-4 box-shadow">
      <div>
        <img class="card-img-top" src="" alt="Flag_teamHome"/>
        <p class="card-text" style="height: 30px">Russie</p>
        <p class="card-text" style="height: 30px">1</p>
      </div>
      <div>-</div>
      <div>
        <p class="card-text" style="height: 30px">0</p>
        <p class="card-text" style="height: 30px">Italie</p>
        <img class="card-img-top" src="" alt="Flag_teamOut"/>
      </div>
    </div>
  </div>
`)

describe("makeDisplayMatch", () => {
  it("should return a string", () => {
    chai.assert.typeOf(makeDisplayMatch(oneMatch), 'string')
  })
  it('should return an html card of a match',  () => {
    const result = cleanHtml(makeDisplayMatch(oneMatch))   
    chai.assert.equal(result, expectedMakeDisplayMatchResult)
  });
})
