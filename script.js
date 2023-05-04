const Past = document.querySelector('.history');
const Result = document.querySelector('.output');
const Btns = document.querySelectorAll('.btn');
const Storage = {
	result: '',
	firstNum: 0,
	operator: null,
	end: true,
	dot: false
}

writeScreen('0');
Btns.forEach((el) => el.addEventListener('click', () => input(el)));


/* INPUT */
function inputShortCut(btn) {
	const current = Storage.result;
	const shortcut = btn.classList[3];
	
	if (Result.textContent === '')
		return ;

	if (shortcut === 'percent') {
		writeScreen(new Function("return " + current + " / 100")());
		if (Math.abs(current) < 100)
			Storage.dot = true;
	}
	else if (shortcut === 'abs') {
		let newNum = (new Function("return " + current + "* (-1)")());
		if (current[current.length - 1] === '.')
			writeScreen(newNum + '.');
		else
			writeScreen(newNum + '');
	}
	else if (shortcut === 'clear') {
		clearScreen('0');
	}
}

function getMultipleDivide(operator) {
	if (operator === 'multiple')
		return ('*');
	else
		return ('/');
}

function firstOperator(btn, operator) {
	Storage.firstNum = Storage.result;
	if (operator === 'multiple' || operator === 'divide')
		Storage.operator = getMultipleDivide(operator);
	else
		Storage.operator = btn.textContent;
	Storage.end = false;
	writePast(Storage.result, btn.textContent);
	writeScreen('');
}

function secondOperator(btn, operator) {
	const current = new Function("return " + Storage.firstNum + " " + Storage.operator + " " + Storage.result)();

	if (operator === 'equals') {
		clearScreen(current);
	}
	else {
		Storage.firstNum = current;
		if (operator === 'multiple' || operator === 'divide')
			Storage.operator = getMultipleDivide(operator);
		else
			Storage.operator = btn.textContent;
		writePast(current, btn.textContent);
		writeScreen('');
	}
}

function changeOperator(btn, operator) {
	if (operator === 'equals') {
		clearScreen(Storage.firstNum);
		return ;
	}

	if (operator === 'multiple' || operator === 'divide')
		Storage.operator = getMultipleDivide(operator);
	else
		Storage.operator = btn.textContent;
	writePast(Storage.firstNum, btn.textContent);
}

function inputOperator(btn) {
	const operator = btn.classList[2];

	if (operator === 'equals' && !Storage.operator) {
		clearScreen(Storage.result);
		return ;
	}

	Storage.dot = false;
	if (!Storage.operator)
		firstOperator(btn, operator);
	else if (Result.textContent === '')
		changeOperator(btn, operator);
	else
		secondOperator(btn, operator);
}

function inputNum(btn) {
	const current = Storage.result;

	let max = Storage.result[0] === '-' ? 9 : 8
	if (Storage.result.length > max)
		return ;
		
		let newResult = "";
		if (current === '0')
			newResult = btn.textContent;
		else {
			newResult = current + btn.textContent;
		}
		if (Storage.end) {
			clearScreen(btn.textContent);
			Storage.end = false;
		}
		else
		writeScreen(newResult);
	}
	
	function inputDot() {
	if (Storage.result.length > 8)
		return ;

		if (!Storage.dot) {
		Storage.dot = true;
		if (Storage.end) {
			clearScreen('0.');
			Storage.dot = true;
			Storage.end = false;
		}
		else
			writeScreen(Storage.result + '.');
	}
}

function input(btn) {
	const btnClass = btn.classList[1];

	if (btnClass === "dot")
		inputDot();
	else if (btnClass === "digit")
		inputNum(btn);
	else if (btnClass === "operator")
		inputOperator(btn);
	else
		inputShortCut(btn);
}

/* OUTPUT */

function putComma(str) {
	str = str + '';
	let stringWithComma = [];
	let index = str.length - 1;

	if (str.indexOf('.') !== -1) {
		while (str[index] !== '.') {
			stringWithComma.unshift(str[index]);
			index--;
		}
		stringWithComma.unshift('.');
		index--;
	}

	for (let count = 0; index >= 0; index--) {
		if (count === 3) {
			stringWithComma.unshift(',');
			if (str[index] === '-')
				stringWithComma.shift();
			count = 0;
		}
		stringWithComma.unshift(str[index]);
		count++;
	}
	return stringWithComma.join('');
}

function clearScreen(newNum) {
	Storage.end = true;
	Storage.firstNum = null;
	Storage.operator = null;
	Storage.dot = false;
	Storage.result = '';
	writePast('', '');
	writeScreen(newNum);
}

function writePast(str, oper) {
	Past.textContent = putComma(str) + ' ' + oper;
}

function writeScreen(str) {
	Storage.result = str;
	Result.textContent = putComma(str);
}
