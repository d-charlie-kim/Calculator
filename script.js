const Past = document.querySelector('.history');
const Result = document.querySelector('.output');
const Btns = document.querySelectorAll('.btn');
const Storage = {
	firstNum: 0,
	operator: null
}

writeScreen('0');
Btns.forEach((el) => el.addEventListener('click', () => input(el)));


/* INPUT */
function inputShortCut(btn) {
	const current = Result.textContent;
	const shortcut = btn.classList[3];
	
	if (shortcut === 'percent')
		writeScreen(new Function("return " + current + " / 100")());
	else if (shortcut === 'abs')
		writeScreen(new Function("return " + current + "* (-1)")());
	else if (shortcut === 'clear') {
		Storage.firstNum = null;
		Storage.operator = null;
		Past.textContent = '';
		writeScreen('0');
	}
}

/*
1. 숫자가 입력된 상태에서 operator 누르는 경우
2. 숫자 operator 숫자 그리고 operator 누르는 경우
3. 완성된 수식이 아닌 상태에서 equal 누르는 경우
*/

function firstOperator(btn, operator) {
	Storage.firstNum = Result.textContent;
	if (operator === 'multiple')
		Storage.operator = '*';
	else if (operator === 'divide')
		Storage.operator = '/';
	else
		Storage.operator = btn.textContent;
	writePast(Result.textContent + " " + btn.textContent);
	writeScreen('');
}

function secondOperator(btn, operator) {
	const current = new Function("return " + Storage.firstNum + " " + Storage.operator + " " + Result.textContent)();

	if (operator === 'equals') {
		Storage.firstNum = null;
		Storage.operator = null;
		writePast('');
		writeScreen(current);
	}
	else {
		Storage.firstNum = current;
		Storage.operator = btn.textContent;
		writePast(current + " " + Storage.operator);
		writeScreen('');
	}
}

function changeOperator(btn, operator) {
	if (operator === 'multiple')
		Storage.operator = '*';
	else if (operator === 'divide')
		Storage.operator = '/';
	else
		Storage.operator = btn.textContent;
	writePast(Storage.firstNum + " " + btn.textContent);
}

function inputOperator(btn) {
	const operator = btn.classList[2];

	if (operator === 'equals' && !Storage.operator)
		return ;

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
	writeScreen(newResult);
}

function input(btn) {
	const btnClass = btn.classList[1];

	if (btnClass === "digit")
		inputNum(btn);
	else if (btnClass === "operator")
		inputOperator(btn);
	else
		inputShortCut(btn);
}

/* OUTPUT */
function writePast(str) {
	Past.textContent = str;
}

function writeScreen(str) {
	Result.textContent = str;
}