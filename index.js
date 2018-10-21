const calc = require('./parcer.js');
const readline = require('readline');


const inputData = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

inputData.question(
	'Введите выражение: ', 
	(formula) => {
		let result = 0;
		try{
			result = calc.calculate(formula)
		}	
		catch(err){
			console.log(err);
			result= "NaN";
		}
		console.log(`${formula} = ${result}`);
		inputData.close();
    }
);