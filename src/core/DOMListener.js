import {capitalize} from '@core/utils';

export default class DOMListener {
	constructor($root, listeners = []) {
		if (!$root) {
			throw new Error('No $root provided for DOMListener');
		}
		this.$root = $root;
		this.listeners = listeners;
	}

	initDOMListener() {
		this.listeners.forEach(listener => {
			const method = getMethodName(listener);
			if (!this[method]) {
				throw new Error(
					`Method ${method} is not implemented in ${this.name} component`
				);
			}
			this[method] = this[method].bind(this);
			this.$root.on(listener, this[method]);
		});
	}

	removeDOMListener() {
		this.listeners.forEach(listener => {
			const method = getMethodName(listener);
			this.$root.off(listener, this[method]);
		});
	}
}

function getMethodName(eventName) {
	return `on${capitalize(eventName)}`;
}