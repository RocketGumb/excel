class DOM {
	constructor(selector) {
		this.$el = typeof selector === 'string'
			? document.querySelector(selector)
			: selector;
	}

	html(value) {
		if (typeof value === 'string') {
			this.$el.innerHTML = value;
			return this;
		}
		return this.$el.outerHTML.trim();
	}

	append(node) {
		if (node instanceof DOM)
			node = node.$el;

		Element.prototype.append
			? this.$el.append(node)
			: this.$el.appendChild(node);
	}

	clear() {
		this.html('');
		return this;
	}
}

export default function $(selector) {
	return new DOM(selector);
}

$.create = (tagName, classes = '') => {
	const el = document.createElement(tagName);
	if (classes !== '')
		el.classList.add(classes);
	return $(el);
};