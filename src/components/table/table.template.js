const CODES = {
	A: 65,
	Z: 90
};

function toCell(_, index) {
	return `<div class="cell" data-col="${index}" contenteditable></div>`;
}

function toColumn(col, index) {
	return `<div class="column" data-type="resizable" data-col="${index}">
		${col}
		<div class="col-resize" data-resize="col"></div>
	</div>`;
}

function toChar(_, index) {
	return String.fromCharCode(CODES.A + index);
}

function createRow(index, content = '') {
	const resize = index
		? '<div class="row-resize" data-resize="row"></div>'
		: '';
	return `<div class="row"  data-type="resizable">
      <div class="row-info">
				${index}
				${resize}
      </div>
      <div class="row-data">${content}</div>
    </div>`;
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
			.fill('')
			.map(toCell)
			.join('');

		rows.push(createRow(i, cells));
	}
	return rows.join('');
}
// 193 msScripting
// 3776 msRendering