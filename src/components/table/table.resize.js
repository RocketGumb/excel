import $ from '@core/DOM';

export default function resizeHandler($root, event) {
	const $resizer = $(event.target);
	const $parent = $resizer.closest('[data-type="resizable"]');
	const coords = $parent.getCoords();
	const type = $resizer.data.resize;
	$resizer.$el.classList.add('active');

	let value;

	document.onmousemove = event => {
		if (type === 'col') {
			const delta = event.pageX - coords.right;
			value = coords.width + delta;
			$resizer
				.css({
					right: `${-delta}px`
				});
		} else {
			const delta = event.pageY - coords.bottom;
			value = coords.height + delta;
			$resizer
				.css({
					bottom: `${-delta}px`
				});
		}
	};

	document.onmouseup = () => {
		document.onmousemove = null;
		document.onmouseup = null;
		// Fixed min size for cells
		value = 0 >= value
			? 0
			: value;

		if (type === 'col') {
			$parent.css({width: `${value}px`});
			$resizer.css({right: '0px'});
			$root.findAll(`[data-col="${$parent.data.col}"]`)
				.forEach(el => el.style.width = `${value}px`);
		} else {
			$parent.css({height: `${value}px`});
			$resizer.css({bottom: '0px'});
		}
		$resizer.$el.classList.remove('active');
	};
}