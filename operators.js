// -- Constants ---

const MATH_CONSTANTS = {
	"e": 2.71828182846,
	"exp": 2.71828182846,
	"pi": 3.14159265359,
}

const getConstValue = function(constName){
	if(constName in MATH_CONSTANTS){
		return MATH_CONSTANTS[constName]
	}
	throw "Not constant"
}

// --- Brackets ---

const OPEN_BRACKETS = ["(","[","{"];
const CLOSE_BRACKETS = [")", "]", "}"];

const  isBracket = function(currentSumb){
	return isOpenBracket(currentSumb) || isCloseBracket(currentSumb);
}

const isOpenBracket = function(currentSumb){
	if (OPEN_BRACKETS.indexOf(currentSumb) != -1) {
		return true;
	}
	return false;
}

const isCloseBracket = function(currentSumb){
	if (CLOSE_BRACKETS.indexOf(currentSumb) != -1) {
		return true;
	}
	return false;
}

const isPairBracket = function(bracket1, bracket2){
	if(!(isBracket(bracket1)&& isBracket(bracket2))){
		throw "Not brackets";
	}
	if(isOpenBracket(bracket1)){
		return OPEN_BRACKETS.indexOf(bracket1) == CLOSE_BRACKETS.indexOf(bracket2);
	} else {
		return CLOSE_BRACKETS.indexOf(bracket1) == OPEN_BRACKETS.indexOf(bracket2);
	}
}

const isOperator = function(currentSumb) {
	if (OPERATORS.indexOf(currentSumb) != -1) {
		return true;
	}
	return false;
}

const getOperatorPriority = function(currentSumb){
	let oper = OPERATORS.indexOf(currentSumb)
	if(oper == -1) {
		throw "Not operators";
	}	
	return OPERATORS_PRIORITY[oper];
}
	
// --- OPERATORS ---
	
const OPERATORS = ["*","/","-","+","^"];
const OPERATORS_PRIORITY = [2, 2, 1, 1, 2];
const OPERATORS_REALISATION = [
	/*multiply*/(x, y) =>{return Number(x) * Number(y);},
	/*division*/(x, y) =>{if(Number(y) === 0) throw "Zero division"; return Number(x) / Number(y);},
	/*subtract*/(x, y) =>{return Number(x) - Number(y);},
	/*addition*/(x, y) =>{return Number(x) + Number(y);},
	/*pow*/		
	(x, y) =>{ 
		result = 1;
		for (i = 1; i <= y; i++) {
			result = result * x;
		}
		return result;
	}
];
	

const pow = function(x,y) { 
    result = 1;
    for (i = 1; i <= y; i++) {
        result = result * x;
    }
    return result;
};

const calculate = function(operation, x,y){
	let oper = OPERATORS.indexOf(operation);
	if(oper == -1)
		throw "Not operator";
	return OPERATORS_REALISATION[oper](x,y)
}

// --- Functions ---

const FUNCTIONS = ["sin", "cos", "tg", "ctg", "exp", "ln", "sqrt"];
const FUNCTIONS_REALISATION = [
	(x)=>{return Math.sin(x);},
	(x)=>{return Math.cos(x);},
	(x)=>{return Math.tg(x);},
	(x)=>{return Math.ctg(x);},
	(x)=>{return Math.exp(x);},
	(x)=>{return Math.log(x);},
	(x)=>{if (x <0) throw "root number less than 0"; return Math.sqrt(x);}
]

const isFunction = function (func) {
	if (FUNCTIONS.indexOf(func) != -1) {
		return true;
	}
	return false;
}

const calculateFunction = function(operation, x) {
	let oper = FUNCTIONS.indexOf(operation);
	if(oper == -1)
		throw "Not function";
	return FUNCTIONS_REALISATION[oper](x)
	
}
		
const isActive = function(currentSumb){
	return isOperator(currentSumb) || isBracket(currentSumb);
}
	
module.exports = {
	getConstValue,
    isBracket,
    isOpenBracket,
    isCloseBracket,
    isPairBracket,
    isOperator,
    getOperatorPriority,
    calculate,
	isFunction,
	calculateFunction,
	isActive
}
