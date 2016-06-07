"use strict";
$(() => {
	let dragging = null;
	let allItems = $qa('.listContainer>*');
	let containers = $qa('.listContainer');
	for (let i = 0; i < allItems.length; i++) {
		let _this = allItems[i];
		_this.draggable = true;
		_this.on('dragstart', (e) => {
			e.preventDefault();
			let computedStyle = window.getComputedStyle(_this);
			_this.startDrag(computedStyle.width);
			dragging = _this;
			_this.dragHolder.style.height = computedStyle.height;
			let release = () => {
				window.un('mouseup', release);
				dragging = null;
				let clientStyle = _this.dragHolder.getBoundingClientRect();
				_this.moveTo(clientStyle.left, clientStyle.top, () => _this.stopDrag());
			};
			_this.dragCase.dragger.release = release;
			window.on('mouseup', release);
		});
	}
	for (let i = 0; i < containers.length; i++) {
		let _this = containers[i];
		_this.on('mouseup', (e) => {
			if (!dragging) return;
			e.stopPropagation();
			_this.append(dragging.dragHolder);
			dragging.dragCase.dragger.release();
		});
	}
});