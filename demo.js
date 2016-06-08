/* global $, $q, $qa */
"use strict";
$(() => {
	let draggingItem = null;
	let allItems = $qa('.listContainer>*');
	let containers = $qa('.listContainer');
	let dynItems = $qa('.item');
	for (let i = 0; i < allItems.length; i++) {
		let _this = allItems[i];
		_this.draggable = true;
		let start = (e) => {
			e.preventDefault();
			if (draggingItem) return;
			let computedStyle = window.getComputedStyle(_this);
			_this.startDrag(computedStyle.width);
			draggingItem = _this;
			_this.dragHolder.style.height = computedStyle.height;
			let release = () => {
				window.un('mouseup', release);
				draggingItem = null;
				let clientStyle = _this.dragHolder.getBoundingClientRect();
				_this.moveTo(clientStyle.left, clientStyle.top, () => _this.stopDrag());
			};
			_this.dragCase.dragger.release = release;
			window.on('mouseup', release);
		};
		_this.on('dragstart', start);
		_this.on('touchstart', start);
	}
	for (let i = 0; i < containers.length; i++) {
		let _this = containers[i];
		let drop = (e) => {
			if (!draggingItem) return;
			e.stopPropagation();
			_this.append(draggingItem.dragHolder);
			_this.scrollTop = _this.scrollHeight;
			draggingItem.dragCase.dragger.release();
		};
		_this.on('touchend', drop);
		_this.on('mouseup', drop);
	}
	for (let i = 0; i < dynItems.length; i++) {
		let _this = dynItems[i];
		dynItems[i].on('click', () => {
			_this.startDrag();
		});
	}
	$q('#restoreItemBtn').on('click', () => {
		for (let i = 0; i < dynItems.length; i++) {
			dynItems[i].stopDrag();
		}
	});
});