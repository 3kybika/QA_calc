const assert = require('assert');
const Operators = require('../operators.js');


describe("Operators module:", function () {
	it('Верно ли находит значения констант', () => {
	  assert.equal(Operators.getConstValue("e"), 2.71828182846);
	  assert.equal(Operators.getConstValue("exp"), 2.71828182846);
	  assert.equal(Operators.getConstValue("pi"), 3.14159265359);
	});
	
	it('Верно ли определяются скобки', () => {
		assert(Operators.isBracket("("));
		assert(Operators.isBracket(")"));
		assert(Operators.isBracket("["));
		assert(Operators.isBracket("]"));
		assert(Operators.isBracket("{"));
		assert(Operators.isBracket("}"));
		
		assert.equal(Operators.isBracket("0"), false);
		assert.equal(Operators.isBracket("f"), false);
	});
	
	it('Верно ли определяются открывающие скобки', () => {
		assert.equal(Operators.isOpenBracket("("), true);
		assert.equal(Operators.isOpenBracket(")"), false);
		assert.equal(Operators.isOpenBracket("["), true);
		assert.equal(Operators.isOpenBracket("]"), false);
		assert.equal(Operators.isOpenBracket("{"), true);
		assert.equal(Operators.isOpenBracket("}"), false);
		
		assert.equal(Operators.isOpenBracket("0"), false);
		assert.equal(Operators.isOpenBracket("f"), false);
	});
	
	it('Верно ли определяются закрывающие скобки', () => {
		assert.equal(Operators.isCloseBracket("("), false);
		assert.equal(Operators.isCloseBracket(")"), true);
		assert.equal(Operators.isCloseBracket("["), false);
		assert.equal(Operators.isCloseBracket("]"), true);
		assert.equal(Operators.isCloseBracket("{"), false);
		assert.equal(Operators.isCloseBracket("}"), true);
		assert.equal(Operators.isCloseBracket("0"), false);
		assert.equal(Operators.isCloseBracket("f"), false);
	});
	
	it('Верно ли определяются парные скобки (positive - "()")', () => {
		assert.equal(Operators.isPairBracket("(",")"), true);
		assert.equal(Operators.isPairBracket("{","}"), true);
		assert.equal(Operators.isPairBracket("[","]"), true);
	});
	it('Верно ли определяются парные скобки (positive - ")(" )', () => {	
		assert.equal(Operators.isPairBracket("}","{"), true);		
		assert.equal(Operators.isPairBracket("]","["), true);
		assert.equal(Operators.isPairBracket(")","("), true);
	});
	it('Верно ли определяются парные скобки (negative - "({" )', () => {				
		assert.equal(Operators.isPairBracket("(","{"), false);
		assert.equal(Operators.isPairBracket("{","["), false);
		assert.equal(Operators.isPairBracket("[","("), false);
	});
	it('Верно ли определяются парные скобки (negative - "){" )', () => {		
		assert.equal(Operators.isPairBracket("]","{"), false);
		assert.equal(Operators.isPairBracket("}","["), false);
		assert.equal(Operators.isPairBracket("{","]"), false);
		assert.equal(Operators.isPairBracket("[",")"), false);
		assert.equal(Operators.isPairBracket(")","{"), false);
	});
	it('Верно ли определяются парные скобки (negative - ";;" )', () => {		
		assert.throws(()=>Operators.isPairBracket("d","d"),  "Not brackets");
		assert.throws(()=>Operators.isPairBracket(">","<"),  "Not brackets");
		assert.throws(()=>Operators.isPairBracket(",",")"),  "Not brackets");
	});
	
	it('Верно ли определяются операторы ', () => {
		assert(Operators.isOperator("*"));
		assert(Operators.isOperator("/"));
		assert(Operators.isOperator("-"));
		assert(Operators.isOperator("+"));
		assert(Operators.isOperator("^"));

		assert.equal(Operators.isOperator(")"), false);
		assert.equal(Operators.isOperator(">"), false);
		assert.equal(Operators.isOperator("8"), false);
		assert.equal(Operators.isOperator("j"), false);
	});
	
	it('Верно ли определяются приоритеты операторов', () => {
		assert.equal(Operators.getOperatorPriority("*"), 2);
		assert.equal(Operators.getOperatorPriority("/"), 2);
		assert.equal(Operators.getOperatorPriority("-"), 1);
		assert.equal(Operators.getOperatorPriority("+"), 1);
		assert.equal(Operators.getOperatorPriority("^"), 2);
	
		assert.throws(()=>Operators.getOperatorPriority("g"),  "Not operators");
		assert.throws(()=>Operators.getOperatorPriority("8"),  "Not operators");
		assert.throws(()=>Operators.getOperatorPriority("<"),  "Not operators");
	});
	
	it('Верно ли вычисляются бинарные операторы (positive)', () => {
		assert.equal(Operators.calculate("*",2,2),4);
		assert.equal(Operators.calculate("+",3,2),5);
		assert.equal(Operators.calculate("-",2,3),-1);
		assert.equal(Operators.calculate("/",2,2),1);
		assert.equal(Operators.calculate("*",0,2),0);
		assert.equal(Operators.calculate("^",0,2),0);
		assert.equal(Operators.calculate("^",2,0),1);
		assert.equal(Operators.calculate("^",2,3),8);
	});
	it('Верно ли вычисляются бинарные операторы (negative)', () => {	
		assert.throws(()=>Operators.calculate("/",0,0),  "Zero division");
		assert.throws(()=>Operators.calculate("d",0,0),  "Not operator");
		assert.throws(()=>Operators.calculate("<",0,0),  "Not operator");
	});
	
	it('Верно ли опеределяются функции (унарные операторы) ', () => {
		assert(Operators.isFunction("sin"));
		assert(Operators.isFunction("ln"));
		assert(Operators.isFunction("exp"));
		assert(Operators.isFunction("cos"));
		assert(Operators.isFunction("tg"));
		assert(Operators.isFunction("ctg"));
		
		assert.equal(Operators.isFunction("+"), false);
		assert.equal(Operators.isFunction("^"), false);
		assert.equal(Operators.isFunction("d"), false);
		assert.equal(Operators.isFunction("sind"), false);
	});
	
	it('Верно ли вычисляются функции (унарные операторы) ', () => {
		assert.equal(Operators.calculateFunction("sin",2), 0.9092974268256817);
		assert.equal(Operators.calculateFunction("exp",0), 1);
		assert.equal(Operators.calculateFunction("ln",2), 0.6931471805599453);
		assert.equal(Operators.calculateFunction("sqrt",4), 2);
		
		assert.throws(()=>Operators.calculateFunction("sqrt",-2),  "root number less than 0");
		assert.throws(()=>Operators.calculateFunction("dsd",0),  "Not function");
		assert.throws(()=>Operators.calculateFunction("sind",0),  "Not function");
	});
	
	it('Верно ли определяются "активные" операнды (знаки или скобки) ', () => {
		assert(Operators.isActive("+"));
		assert(Operators.isActive("-"));
		assert(Operators.isActive("{"));
		assert(Operators.isActive("]"));
		assert(Operators.isActive("*"));
		
		assert.equal(Operators.isActive("!"), false);
		assert.equal(Operators.isActive(">"), false);
		assert.equal(Operators.isActive("3"), false);
		assert.equal(Operators.isActive("l"), false);
	});
});




