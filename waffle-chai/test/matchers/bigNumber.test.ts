import {expect, AssertionError} from 'chai';
import {utils} from 'ethers';

describe('UNIT: BigNumber matchers', () => {
  function checkAll(
    actual: number,
    expected: number,
    test: (
      actual: number | string | utils.BigNumber,
      expected: number | string | utils.BigNumber,
    ) => void
  ) {
    test(actual, expected);
    test(utils.bigNumberify(actual), expected);
    test(utils.bigNumberify(actual), expected.toString());
    test(utils.bigNumberify(actual), utils.bigNumberify(expected));
    test(actual, utils.bigNumberify(expected));
    test(actual.toString(), utils.bigNumberify(expected));
  }

  describe('equal', () => {
    it('.to.equal', () => {
      checkAll(10, 10, (a, b) => expect(a).to.equal(b));
    });

    it('.to.eq', () => {
      checkAll(10, 10, (a, b) => expect(a).to.eq(b));
    });

    it('.not.to.equal', () => {
      checkAll(10, 11, (a, b) => expect(a).not.to.equal(b));
    });

    it('.not.to.eq', () => {
      checkAll(10, 11, (a, b) => expect(a).not.to.eq(b));
    });

    it('throws proper message on error', () => {
      expect(
        () => expect(utils.bigNumberify(10)).to.equal(11)
      ).to.throw(AssertionError, 'Expected "10" to be equal 11');
    });
  });

  describe('above', () => {
    it('.to.be.above', () => {
      checkAll(10, 9, (a, b) => expect(a).to.be.above(b));
    });

    it('.to.be.gt', () => {
      checkAll(10, 9, (a, b) => expect(a).to.be.gt(b));
    });

    it('.not.to.be.above', () => {
      checkAll(10, 10, (a, b) => expect(a).not.to.be.above(b));
      checkAll(10, 11, (a, b) => expect(a).not.to.be.above(b));
    });

    it('.not.to.be.gt', () => {
      checkAll(10, 10, (a, b) => expect(a).not.to.be.gt(b));
      checkAll(10, 11, (a, b) => expect(a).not.to.be.gt(b));
    });
  });

  describe('below', () => {
    it('.to.be.below', () => {
      checkAll(10, 11, (a, b) => expect(a).to.be.below(b));
    });

    it('.to.be.lt', () => {
      checkAll(10, 11, (a, b) => expect(a).to.be.lt(b));
    });

    it('.not.to.be.below', () => {
      checkAll(10, 10, (a, b) => expect(a).not.to.be.below(b));
      checkAll(10, 9, (a, b) => expect(a).not.to.be.below(b));
    });

    it('.not.to.be.lt', () => {
      checkAll(10, 10, (a, b) => expect(a).not.to.be.lt(b));
      checkAll(10, 9, (a, b) => expect(a).not.to.be.lt(b));
    });
  });

  describe('at least', () => {
    it('.to.be.at.least', () => {
      checkAll(10, 10, (a, b) => expect(a).to.be.at.least(b));
      checkAll(10, 9, (a, b) => expect(a).to.be.at.least(b));
    });

    it('.to.be.gte', () => {
      checkAll(10, 10, (a, b) => expect(a).to.be.gte(b));
      checkAll(10, 9, (a, b) => expect(a).to.be.gte(b));
    });

    it('.not.to.be.at.least', () => {
      checkAll(10, 11, (a, b) => expect(a).not.to.be.at.least(b));
    });

    it('.not.to.be.gte', () => {
      checkAll(10, 11, (a, b) => expect(a).not.to.be.gte(b));
    });
  });

  describe('at most', () => {
    it('.to.be.at.most', () => {
      checkAll(10, 10, (a, b) => expect(a).to.be.at.most(b));
      checkAll(10, 11, (a, b) => expect(a).to.be.at.most(b));
    });

    it('.to.be.lte', () => {
      checkAll(10, 10, (a, b) => expect(a).to.be.lte(b));
      checkAll(10, 11, (a, b) => expect(a).to.be.lte(b));
    });

    it('.not.to.be.at.most', () => {
      checkAll(10, 9, (a, b) => expect(a).not.to.be.at.most(b));
    });

    it('.not.to.be.lte', () => {
      checkAll(10, 9, (a, b) => expect(a).not.to.be.lte(b));
    });
  });
});