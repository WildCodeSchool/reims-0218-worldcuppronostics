import sum from './matchs.js'
describe('matchs', function () {
    it('should return sum of arguments', function () {
      chai.expect(sum(1, 2)).to.equal(3);
    });
  });