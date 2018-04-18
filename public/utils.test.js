import { cleanHtml } from './utils.js'

const htmlString = `
  <ul>
    <li>France - Italie</li>
    <li>Espagne - Belgique</li>
    <li>Angleterre - Bresil</li>
  </ul>
`
const expected = '<ul><li>France - Italie</li><li>Espagne - Belgique</li><li>Angleterre - Bresil</li></ul>'

describe('cleanHtml', () => {
  it('should return a string', () => {
    chai.assert.typeOf(cleanHtml(htmlString), 'string')
  })
  it('should remove \n and spaces between tags', () => {
    chai.assert.equal(cleanHtml(htmlString), expected)
  })
})