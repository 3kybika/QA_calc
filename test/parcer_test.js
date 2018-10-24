const calc = require('../parcer.js');
const assert = require('assert');

describe("parcers module (Positive):", function () {
	it('Простое выражение: 2+2 = 4', () => {
		assert.equal(calc.calculate("2+2"), 4);
	});	
	it('Простое выражение с 2мя и более операциями: 1+1-1+2', () => {
		assert.equal(calc.calculate("1+1-1+2"), 3);
	});	
	it('Простое выражение с разными по приоритету операциями: 1+1*2 = 3', () => {	
		assert.equal(calc.calculate("1+1*2"), 3);
	});	
	it('Простое выражение со скобками: (1+1)*2 = 4', () => {	
		assert.equal(calc.calculate("(1+1)*2"), 4);
	});	
	it('Выражение со вложенными скобками : 1+(1+(1+(1+(1+1)+1)+1)+1)+1 = 10', () => {
		assert.equal(calc.calculate("1+(1+(1+(1+(1+1)+1)+1)+1)+1"), 10);
	});	
	it('Выражение со вложенными скобками и разными по приоритету операциями: 1+(2*(2*2+1)) = 11', () => {
		assert.equal(calc.calculate("1+(2*(2*2+1))"), 11);
	});	
	it('Выражение со вложенными скобками: ((1+1)+(1-2))*2 = 2', () => {
		assert.equal(calc.calculate("((1+1)+(1-2))*2"), 2);
	});	
	it('Унарные операции sin(2) = 0.9092974268256817', () => {
		assert.equal(calc.calculate("sin(2)"), 0.9092974268256817);
	});	

	it('Унарные операции со вложенными скобками: sin(((((((2))))))) = 0.9092974268256817', () => {
		assert.equal(calc.calculate("sin(((((((2)))))))"), 0.9092974268256817);
	});	
	it('Работа с различными скобками: sin{((({[{2}]})))} = 0.9092974268256817', () => {
		assert.equal(calc.calculate("sin{((({[{2}]})))}"), 0.9092974268256817);
	});	
	it('Вложенное выражение внутри унарной операции: sin(1-((7-(2*2+17))/2+6)) = 0.9092974268256817', () => {
		assert.equal(calc.calculate("sin(1-((7-(2*2+17))/2+6))"), 0.9092974268256817);
	});	
	it('Использование констант внутри выражений: exp(pi*2*0+2) = 535.4916555249862', () => {
		assert.equal(calc.calculate("exp(pi*(2*0+2))"), 535.4916555249862);
	});	
	
	it('Чтение чисел с точкой 54.23* 2 = 108.46', () => {
		assert.equal(calc.calculate("54.23* 2"), 108.46);
	});	
	it('Чтение выражений с пробелами: (    54.23                 * 2)-11 = 97.46', () => {
		assert.equal(calc.calculate("(    54.23                 * 2)-11"), 97.46);
	});
	it('Чтение пустой строки : "" = 0', () => {
		assert.equal(calc.calculate(""), 0);
	});
	it('Чтение пустой строки с пробелами: "    " = 0', () => {
		assert.equal(calc.calculate("    "), 0);
	});
});
describe("parcers module (Negative):", function () {
	it('Чтение ничего не значащей строки: "asdassd" ', () => {
		assert.throws(()=>calc.calculate("asdassd"),  "Not constant");
	});
	it('Корень от отрицательного числа: sqrt(1-2) ', () => {
		assert.throws(()=>calc.calculate("sqrt(1-2)"),  "root number less than 0");
	});
	it('Отсутствие открывающей скобки: 1-2) ', () => {
		assert.throws(()=>calc.calculate("1-2)"),  "Missing opening bracket");
	});
	it('Отсутствие открывающей скобки: (((1-2)))-2) ', () => {
		assert.throws(()=>calc.calculate("(((1-2)))-2)"),  "Missing opening bracket");
	});
	it('Отсутствие открывающей скобки: ) ', () => {
		assert.throws(()=>calc.calculate(")"),  "Missing opening bracket");
	});
	it('"Скрещивание" скобок: (1-[2-1)]', () => {
		assert.throws(()=>calc.calculate("(1-[2-1)]"),  "Missing opening bracket");
	});
	it('"Скрещивание" скобок: (1-[2-e)]', () => {
		assert.throws(()=>calc.calculate("(1-[2-e)]"),  "Missing opening bracket");
	});
	it('"Скрещивание" скобок: (1-[2-e)+1] ', () => {
		assert.throws(()=>calc.calculate("(1-[2-e)+1]"),  "Missing opening bracket");
	});
	it('Отсутствие закрывающей скобки: (1-2-e ', () => {
		assert.throws(()=>calc.calculate("(1-2-e"),  "Where is unclosed bracket");
	});
	it('Отсутствие закрывающей скобки: (1-[2-e) ', () => {
		assert.throws(()=>calc.calculate("(1-[2-e)"),  "Where is unclosed bracket");
	});
	it('Двойной оператор: 1--e ', () => {
		assert.throws(()=>calc.calculate("1--e"),  "Formula is uncorrect (Probably too many operators?)");
	});
	it('Двойной оператор 1--', () => {
		assert.throws(()=>calc.calculate("1--"),  "Formula is uncorrect (Probably too many operators?)");
	});
	it('Двойные скобки у унарного оператора: sin(1)(2)', () => {
		assert.throws(()=>calc.calculate("sin(1)(2)"),  "Formula is uncorrect (Probably too many operators?)");
	});
	it('Отсутствие параметров у унарного оператора: sin()', () => {
		assert.throws(()=>calc.calculate("sin()"),  "Formula is uncorrect (Probably too many operators?)");
	});
	it('Отсутствие параметров у унарного оператора: sin()', () => {
		assert.throws(()=>calc.calculate("sin"),  "Not constant");
	});
	it('Неверное написание унарного оператора: sсn(1)', () => {
		assert.throws(()=>calc.calculate("sсn(1)"),  "scn is not a function!");
	});
	it('Двойные точки в числе: 1.23.34', () => {
		assert.throws(()=>calc.calculate("sсn(1)"),  "Not constant!");
	});
});