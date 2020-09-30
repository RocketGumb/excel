const CODES = {
	A: 65,
	Z: 90
};

function toCell() {
	return `<div class="cell" contenteditable></div>`;
}

function toColumn(col) {
	return `<div class="column">${col}</div>`;
}

function toChar(_, index) {
	return String.fromCharCode(CODES.A + index);
}

function createRow(index, content = '') {
	return `
		<div class="row">
      <div class="row-info">${index}</div>
      <div class="row-data">${content}</div>
    </div>
	`.trim();
}

export function createTable(rowsCount = 100) {
	const colsCount = CODES.Z - CODES.A + 1;
	const rows = new Array(rowsCount);

	const cols = new Array(colsCount)
		.fill('')
		.map(toChar)
		.map(toColumn)
		.join('');

	rows.push(createRow('', cols));

	for (let i = 1; i <= rowsCount; i++) {
		const cells = new Array(colsCount)
			.fill(toCell())
			.join('');

		rows.push(createRow(i, cells));
	}
	return rows.join('');
}