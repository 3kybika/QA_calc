const calc = require('../parcer.js');
const assert = require('assert');

describe("parcers module:", function () {
	it('Верно ли вычисляются выражения (positive)', () => {
		assert.equal(calc.calculate("2+2"), 4);
		assert.equal(calc.calculate("1+1*2"), 3);
		assert.equal(calc.calculate("1+1-1"), 1);
		assert.equal(calc.calculate("1+(2*(2*2+1))"), 11);
		assert.equal(calc.calculate("sin(2)"), 0.9092974268256817);
		assert.equal(calc.calculate("1+(1+(1+(1+(1+1)+1)+1)+1)+1"), 10);
		assert.equal(calc.calculate("(1+1)*2"), 4);
		assert.equal(calc.calculate("((1+1)+(1-2))*2"), 2);
		assert.equal(calc.calculate("sin(((((((2)))))))"), 0.9092974268256817);
		assert.equal(calc.calculate("sin{((({[{2}]})))}"), 0.9092974268256817);
		assert.equal(calc.calculate("sin(1-((7-(2*2+17))/2+6))"), 0.9092974268256817);
		assert.equal(calc.calculate("exp(0)"), 1);
		assert.equal(calc.calculate("exp(pi*2)"), 535.4916555249864);
		assert.equal(calc.calculate("54.23* 2"), 108.46);
		assert.equal(calc.calculate("(    54.23                 * 2)-11"), 97.46);
	});
	it('Верно ли вычисляются выражения (negative)', () => {
		assert.throws(()=>calc.calculate("sqrt(1-2)"),  "root number less than 0");
		assert.throws(()=>calc.calculate("sdrt(1-2)"),  "sdrt is is not a function");
		assert.throws(()=>calc.calculate("1-2)"),  "Missing opening bracket");
		assert.throws(()=>calc.calculate("(1-[2-1)]"),  "Missing opening bracket");
		assert.throws(()=>calc.calculate("(1-[2-1)]"),  "Missing opening bracket");
		assert.throws(()=>calc.calculate("(1-[2+1)-1]]"),  "Missing opening bracket");
		assert.throws(()=>calc.calculate("(1-[2-e)]"),  "Missing opening bracket");
		assert.throws(()=>calc.calculate("(1-2-e"),  "Where is unclosed bracket");
		assert.throws(()=>calc.calculate("(1-[2-e)+1]"),  "Missing opening bracket");
		assert.throws(()=>calc.calculate("(1-[2-e)"),  "Where is unclosed bracket");
		assert.throws(()=>calc.calculate("1--e"),  "Formula is uncorrect (Probably too many operators?)");
		assert.throws(()=>calc.calculate("1--"),  "Formula is uncorrect (Probably too many operators?)");
		assert.throws(()=>calc.calculate("(1-[2-e)]"),  "Missing opening bracket");
		assert.throws(()=>calc.calculate("1,2"),  "Not operator");
	});
});