/* global $q, $create, $ */
"use strict";
{
	window.maxDeg = 0;
	let mouseX = 0, mouseY = 0;
	document.addEventListener('mousemove', (e) => {
		mouseX = e.clientX;
		mouseY = e.clientY;
	});

	const createCase = (node) => {
		let dragCase = $create('dragcase');
		let dragHolder = $create('dragHolder');
		let clientStyle = node.getBoundingClientRect();
		dragCase.dragger = {
			posX: clientStyle.left,
			posY: clientStyle.top,
			startX: clientStyle.left,
			startY: clientStyle.top,
			deg: 0
		};
		dragCase.style.position = 'fixed';
		dragCase.style.display = 'block';
		dragCase.style.left = dragCase.dragger.posX + 'px';
		dragCase.style.top = dragCase.dragger.posY + 'px';
		dragCase.append(dragHolder);
		node.dragCase = dragCase;
		node.dragHolder = dragHolder;
		return dragCase;
	};

	const drag = function() {
		let diffX = 0, diffY = 0;

		if (this.dragging) {
			diffX = mouseX - this.clientWidth/2 - this.dragger.posX;
			diffY = mouseY - this.dragger.posY;
		} else {
			diffX = this.dragger.targetX - this.dragger.posX;
			diffY = this.dragger.targetY - this.dragger.posY;
			if ((Math.pow(diffX, 2) + Math.pow(diffY, 2)) < 0.05) {
				this.style.left = this.dragger.targetX + 'px';
				this.style.top = this.dragger.targetY + 'px';
				this.style.transform = `rotate(0deg)`;
				window.cancelAnimationFrame(this.dragID);
				this.dragger.dragID = null;
				if (this.dragger.callback) this.dragger.callback();
				return;
			}
		}

		let diffDeg = Math.tan(diffX/(Math.abs(this.dragger.posY - mouseY) + this.clientHeight*3 + 200 + Math.abs(diffX)))/Math.PI*180;
		if (diffDeg > 60) {
			diffDeg = 60;
		} else if (diffDeg < -60) {
			diffDeg = -60;
		}
		diffDeg = diffDeg - this.dragger.deg;
		this.dragger.posX = this.dragger.posX + diffX/12;
		this.dragger.posY = this.dragger.posY + diffY/12;
		this.dragger.deg = this.dragger.deg + diffDeg/12;
		this.style.left = this.dragger.posX + 'px';
		this.style.top = this.dragger.posY + 'px';
		this.style.transform = `rotate(${this.dragger.deg}deg)`;

		this.dragger.dragID = window.requestAnimationFrame(drag.bind(this));
	};

	$.fn('Dragjs', {
		node: {
			startDrag() {
				if (typeof(this.parentNode.dragging) === 'undefined') this.parentNode.dragging = false;
				if (this.parentNode.dragging === 'true') return;
				let dragCase = '';
				if (this.parentNode.tagName.toUpperCase() === 'DRAGCASE') {
					dragCase = this.parentNode;
				} else {
					dragCase = createCase(this);
					this.swap(this.dragHolder);
				}
				$q('body').appendChild(dragCase);
				dragCase.dragging = true;
				if (!dragCase.dragger.dragID) {
					drag.call(dragCase);
				}
				return this;
			},
			dragRelease(cb) {
				if (this.parentNode.tagName.toUpperCase() === 'DRAGCASE' && this.parentNode.dragging === true) {
					this.dragCase.dragger.callback = cb;
					this.dragCase.dragger.targetX = mouseX;
					this.dragCase.dragger.targetY = mouseY;
					this.dragCase.dragging = false;
				}
			},
			stopDrag(cb) {
				if (this.dragCase) {
					if (this.dragCase.dragger.dragID) {
						window.cancelAnimationFrame(this.dragCase.dragger.dragID);
					}
					if (cb) {
						cb();
					} else {
						this.dragHolder.swap(this);
					}
					this.dragCase.remove();
					this.dragHolder.remove();
					this.dragCase = null;
					this.dragHolder = null;
				}
			}
		}
	}, true);
}