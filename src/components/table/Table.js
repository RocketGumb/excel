import ExcelComponent from '@core/ExcelComponent';
import {createTable} from '@components/table/table.template';
import $ from '@core/DOM';

export default class Table extends ExcelComponent {
	static className = 'excel__table';

	constructor($root) {
		super($root, {
			name: 'Table',
			listeners: ['mousedown']
		});
	}

	toHTML() {
		return createTable(100);
	}

	onMousedown(event) {
		if (event.target.dataset.resize) {
			const $resizer = $(event.target);
			const $parent = $resizer.closest('[data-type="resizable"]');
			const coords = $parent.getCoords();
			const type = $resizer.data.resize;
			$resizer.$el.classList.add('active');

			const cells = this.$root.findAll(`[data-col="${$parent.data.col}"]`);

				document.onmousemove = event => {
					if (type === 'col') {
						const delta = event.pageX - coords.right;
						const value = coords.width + delta;
						$parent.$el.style.width = `${value}px`;
						cells.forEach(el => el.style.width = `${value}px`);
					} else {
						const delta = event.pageY - coords.bottom;
						const value = coords.height + delta;
						$parent.$el.style.height = `${value}px`;
					}
			};

			document.onmouseup = () => {
				document.onmousemove = null;
				$resizer.$el.classList.remove('active');
			};
		}
	}
}