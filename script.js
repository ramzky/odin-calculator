/*
Calc

TODO
	-css divide btnContainer??
*/

//arrExpr array to put operands and operator
const arrExpr = [];
const opArr = [];
const numSign = [];
document.querySelectorAll('.numSign').forEach(function(btn) {
	numSign.push(btn.innerText);
});

const topText = document.querySelector('.topText');
const bottomText = document.querySelector('.bottomText');

//number buttons function here---------------------------------------------
const numButtons = document.querySelectorAll('.num');
numButtons.forEach(function(btn) {
	btn.addEventListener('click', function(e) {
		//for flag check after clicking equals button
		if (arrExpr[arrExpr.length-1] === '=') {
			allClear();
		}
		//check if array has value which should be number AND if
		//textbox is currently set to an operator in opArr array
		//then push that operator in arrExpr
		if (arrExpr.length > 0 && opArr.includes(bottomText.innerText)) {
			arrExpr.push(bottomText.innerText);
			topText.innerText = arrExpr[0] + arrExpr[1];
			bottomText.innerText = '';
		}
		bottomText.innerText = bottomText.innerText + e.target.innerText;
	});
});

//operator buttons function here---------------------------------------------
const opButtons = document.querySelectorAll('.operator');
opButtons.forEach(function(btn) {
	opArr.push(btn.innerText);
});

opButtons.forEach(function(btn) {
	btn.addEventListener('click', function(e) {
		//for flag checks
		if (arrExpr[arrExpr.length-1] === '=') arrExpr.pop();
		if (arrExpr[arrExpr.length-1] === 'Z') allClear();
		//check if text is valid number then push it to arrExpr AND
		//if also no value in array OR array has at least 2 values
		//which should be number and operator
		//console.log(arrExpr);
		if (!(isNaN(parseInt(bottomText.innerText))) &&
				(arrExpr.length === 0 || arrExpr.length >= 2)) {	
			arrExpr.push(bottomText.innerText);
			topText.innerText = arrExpr[0];
			//console.log(arrExpr);
			//this will do the equation if the last array push is also
			//the third value
			if (arrExpr.length > 2) {
				topText.innerText = doEquation();
				//after equation splice array to 1 length with the result in
				//the first index so that it 'loops' again with 
				//the other function in numButtons
				if (arrExpr[arrExpr.length-1] === 'Z') arrExpr.splice(0);
				else arrExpr.splice(0, arrExpr.length, topText.innerText);
				
			}
		}
		//need if you divide by zero then equals then operator buttons
		bottomText.innerText = e.target.innerText;
	});
});

//equals button function here---------------------------------------------
const opEquals = document.querySelector('.equals');
opEquals.addEventListener('click', function(e) {
	//valid number check
	//!(isNaN(parseInt(bottomText.innerText)))
	if ( arrExpr.length >= 2 && !(isNaN(parseInt(bottomText.innerText))) ) {
		arrExpr.push(bottomText.innerText);
		topText.innerText = '';
		bottomText.innerText = doEquation();
		//for flag check to reset field
		arrExpr.push(opEquals.innerText);
	}
});

//clear buttons function here---------------------------------------------
const ac = document.querySelector('.ac');
ac.addEventListener('click', allClear);
function allClear() {
	bottomText.innerText = '';
	topText.innerText = '';
	arrExpr.splice(0);
}

function doEquation() {
	//just a check again if arrExpr[1] is in the operator list
	const oper = opArr.find(o => o === arrExpr[1]);
	switch (oper) {
		case '+':
		return parseInt(arrExpr[0]) + parseInt(arrExpr[2]);
		break;
		case '-':
		return parseInt(arrExpr[0]) - parseInt(arrExpr[2]);
		break;
		case '*':
		return parseInt(arrExpr[0]) * parseInt(arrExpr[2]);
		break;
		case '/':
		if (arrExpr[2] === '0') {
			arrExpr.push('Z');
			return 'Huh!?'
		};
		return parseInt(arrExpr[0]) / parseInt(arrExpr[2]);
		break;
		default:
	}
}



//test here below

const seven = document.querySelector('#seven');
seven.addEventListener('click', function(e) {
	//bottomText.innerText = bottomText.innerText + e.target.innerText;
});
//bottomText.textContent = 'test';
//console.log(opArr);