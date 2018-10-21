const Operators = require('./operators.js');

const OPERAND_TYPES = {
	"BRACKET": 1,
	"OPERATOR": 2,
	"NUMBER":3,
	"OPERAND":4,
	"CONST":5
}



class Operand {
	constructor(oper, type) {
		this.oper = oper;
		this.type = type;
	}
	
	getType() {
		return this.type;
	}
	
	getOperand() {
		return this.oper;
	}
}

const parce = function(str){
	stack = [];
	resultArray = [];

	if(!str || str.length == 0){
		return resultArray;
	}
	
	str.replace(" ", '');
	
	for(let i = 0; i < str.length; i++){
		let curSumb = str[i];
		if(Operators.isBracket(curSumb)){
			//если прочитанный символ - скобка
			if (Operators.isOpenBracket(curSumb)) {
				//если скобка открывающая - просто кладем её в стек.
				stack.push(new Operand(curSumb, OPERAND_TYPES["BRACKET"]));
			}
			else {
				//если это закрывающая скобка - идем до ближайшей открывающей
				//    скобки и выкидываем все в результирующий массив
				if (stack.length == 0) {
					throw  ("Missing opening bracket");
				}
				
				while(
					stack[stack.length-1].getType() != OPERAND_TYPES["BRACKET"] ||
					!Operators.isOpenBracket(stack[stack.length-1].getOperand())
				) {
					resultArray.push(stack.pop());
					if (stack.length == 0) {
						throw  ("Missing opening bracket");
					}
				}
				// дошли до скобки
				if (!Operators.isPairBracket(stack[stack.length-1].getOperand(), curSumb)) {
					
					throw  ("Missing opening bracket");
				}
				// удалили открывающую скобку
				stack.pop();
				if (
					!stack.length == 0 && 
					stack[stack.length-1].getType() == OPERAND_TYPES["OPERAND"]
				) {
					resultArray.push(stack.pop());
				}
			}
		}
		else if(Operators.isOperator(curSumb)) {
			//если это оператор
			if (stack.length != 0) {
				while (
					(stack.length != 0) &&
					(stack[stack.length-1].getType() == OPERAND_TYPES["OPERATOR"]) &&
					(Operators.getOperatorPriority(curSumb) <= Operators.getOperatorPriority(stack[stack.length-1].getOperand())) 
				) {
					resultArray.push(stack.pop());
				}
			}
			
			//добавляем в стек текущий оператор
			stack.push(new Operand(curSumb, OPERAND_TYPES["OPERATOR"]));
		}
		else {
			//константа, цифра или функция (sin/cos/tg/ctg/lg/exp)
			//читаем строку пока не найдем скобку/оператор
			curPart = "";
			for (; (i < str.length) && !Operators.isActive(str[i]); i++){
				curPart += (str[i]);
			}

			if (i < str.length && Operators.isOpenBracket(str[i])) {
				//если это "sin("
				if(Operators.isFunction(curPart)){
					stack.push(new Operand(curPart,OPERAND_TYPES["OPERAND"]));
				}
				else{
					throw `${curPart} is not a function!`
				}
			}
			else {
				//иначе - это цифра/константа
				let number = Number(curPart);
				if(!isNaN(number)){
					//преобразoвание удалось - это цифра!
					resultArray.push(new Operand(number, OPERAND_TYPES["NUMBER"]));
				}
				else {
					//преобразование не удалось - это константа!
					resultArray.push(new Operand(curPart, OPERAND_TYPES["CONST"]));
				}
			}
			//откатываемся со скобки/конца/оператора за операндом
			i--;
		}
	}
	
	// Очищаем стек
	while (stack.length != 0) {
		curOperand = stack.pop();
		if (
			(curOperand.getType() == OPERAND_TYPES["BRACKET"]) &&
			(Operators.isOpenBracket(curOperand.getOperand()))
		) {
			throw ("Where is unclosed bracket");
		}

		// В стеке должны oставаться только низкоприоритетные операторы
		if (curOperand.getType() == OPERAND_TYPES["OPERATOR"]) {
			resultArray.push(curOperand);
		}
		else {
			throw ("Formula is uncorrect");
		}
	}
	//printOperands(resultArray);
	return resultArray;
}

const calculateParceredFormula = function(formula){	
	stack = [];
	
	formula.forEach((iter)=>{
			switch (iter.getType()) {
				case(OPERAND_TYPES["NUMBER"]): {
					this.stack.push(iter.getOperand());
					break;
				}
				case(OPERAND_TYPES["CONST"]): {
					this.stack.push(Operators.getConstValue(iter.getOperand()));
					break;
				}
				case(OPERAND_TYPES["OPERATOR"]): {
					if (stack.length == 0 || stack.length == 1) throw "Formula is uncorrect (Probably too many operators?)";
					let b = this.stack.pop();
					let a = this.stack.pop();

					this.stack.push(Operators.calculate(iter.getOperand(), a, b));
					break;
				}
				case(OPERAND_TYPES["OPERAND"]): {
					if (stack.length == 0) throw "Formula is uncorrect (Probably too many operators?)";
					let a = stack.pop();
					this.stack.push(Operators.calculateFunction(iter.getOperand(), a));
					break;
				}
			}
		}, this);
	if (stack.length == 1) {
		return stack.pop();
	}
	throw "formula is uncorrect!";
}

const printOperands = function(operands){
	for(let i = 0; i < operands.length; i++) {
		console.log(`(${operands[i].getType()}) = ${operands[i].getOperand()}`);
	}
}

const calculate = function(formula){
	formula = parce(formula);


	return calculateParceredFormula(formula);
}

module.exports = {
    calculate
}