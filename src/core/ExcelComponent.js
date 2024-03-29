import DOMListener from '@core/DOMListener';

export default class ExcelComponent extends DOMListener {
	constructor($root, options = {}) {
		super($root, options.listeners);
		this.name = options.name || '';
	}

	toHTML() {
		return '';
	}

	init() {
		this.initDOMListener();
	}

	destroy() {
		this.removeDOMListener();
	}
}