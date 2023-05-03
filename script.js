const Past = document.querySelector('.history');
const Result = document.querySelector('.output');
const Btns = document.querySelectorAll('.btn');
const Storage = {
	firstNum: 0,
	operator: null,
	end: true,
	dot: false
}

writeScreen('0');
Btns.forEach((el) => el.addEventListener('click', () => input(el)));


/* INPUT */
function inputShortCut(btn) {
	const current = Result.textContent;
	const shortcut = btn.classList[3];
	
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
			writeScreen(newNum);
	}
	else if (shortcut === 'clear') {
		clearScreen('0');
	}
}

/*
1. 숫자가 입력된 상태에서 operator 누르는 경우
2. 숫자 operator 숫자 그리고 operator 누르는 경우
3. 완성된 수식이 아닌 상태에서 equal 누르는 경우
*/

function getMultipleDivide(operator) {
	if (operator === 'multiple')
		return ('*');
	else
		return ('/');
}

function firstOperator(btn, operator) {
	Storage.firstNum = Result.textContent;
	if (operator === 'multiple' || operator === 'divide')
		Storage.operator = getMultipleDivide(operator);
	else
		Storage.operator = btn.textContent;
	Storage.end = false;
	writePast(Result.textContent + " " + btn.textContent);
	writeScreen('');
}

function secondOperator(btn, operator) {
	const current = new Function("return " + Storage.firstNum + " " + Storage.operator + " " + Result.textContent)();

	if (operator === 'equals') {
		clearScreen(current);
	}
	else {
		Storage.firstNum = current;
		if (operator === 'multiple' || operator === 'divide')
			Storage.operator = getMultipleDivide(operator);
		else
			Storage.operator = btn.textContent;
		writePast(current + " " + btn.textContent);
		writeScreen('');
	}
}

function changeOperator(btn, operator) {
	if (operator === 'equals') {
		clearScreen(Storage.firstNum);
		Storage.firstNum = Screen.textContent;
		return ;
	}

	if (operator === 'multiple' || operator === 'divide')
		Storage.operator = getMultipleDivide(operator);
	else
		Storage.operator = btn.textContent;
	writePast(Storage.firstNum + " " + btn.textContent);
}

function inputOperator(btn) {
	const operator = btn.classList[2];

	if (operator === 'equals' && !Storage.operator) {
		clearScreen(Result.textContent);
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
	const current = Result.textContent;
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
	if (!Storage.dot) {
		Storage.dot = true;
		if (Storage.end) {
			clearScreen('0.');
			Storage.dot = true;
			Storage.end = false;
		}
		else
			writeScreen(Result.textContent + '.');
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
function clearScreen(newNum) {
	Storage.end = true;
	Storage.firstNum = null;
	Storage.operator = null;
	Storage.dot = false;
	writePast('');
	writeScreen(newNum);
}

function writePast(str) {
	Past.textContent = str;
}

function writeScreen(str) {
	Result.textContent = str;
}