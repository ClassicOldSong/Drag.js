/* global console, $ */
"use strict";
{
	let mouseX = 0, mouseY = 0;
	document.addEventListener('mousemove', (e) => {
		mouseX = e.clientX;
		mouseY = e.clientY;
	});

	const createCase = (node) => {
		let dragCase = $create('dragcase');
		let style = window.getComputedStyle(node);
		dragCase.dragger = {};
		dragCase.dragger.posX = node.getBoundingClientRect().left;
		dragCase.dragger.posY = node.getBoundingClientRect().top;
		dragCase.dragger.deg = 0;
		dragCase.style.position = 'fixed';
		dragCase.style.display = 'block';
		dragCase.style.left = dragCase.dragger.posX + 'px';
		dragCase.style.top = dragCase.dragger.posY + 'px';
		return dragCase;
	};

	const drag = function() {
		let diffX = 0, diffY = 0;

		if (this.dragging === false) {
			diffX = this.dragger.targetX - this.clientWidth/2 - this.dragger.posX;
			diffY = this.dragger.targetY - this.dragger.posY;
			if ((Math.pow(diffX, 2) + Math.pow(diffY, 2)) < 0.05) {
				this.style.left = this.dragger.targetX - this.clientWidth/2 + 'px';
				this.style.top = this.dragger.targetY + 'px';
				this.style.transform = `rotate(0deg)`;
				window.cancelAnimationFrame(this.dragID);
				return;
			}
		} else {
			diffX = mouseX - this.clientWidth/2 - this.dragger.posX;
			diffY = mouseY - this.dragger.posY;
		}

		let diffDeg = Math.tan(diffX/Math.abs(this.dragger.posY - mouseY - 500))/Math.PI*180;
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

		this.dragID = window.requestAnimationFrame(drag.bind(this));
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
				}
				$q('body').appendChild(dragCase);
				dragCase.append(this);
				dragCase.dragging = true;
				drag.call(dragCase);
				return this;
			},
			dragRelease() {
				if (this.parentNode.tagName.toUpperCase() === 'DRAGCASE' && this.parentNode.dragging === true) {
					this.parentNode.dragger.targetX = mouseX;
					this.parentNode.dragger.targetY = mouseY;
					this.parentNode.dragging = false;
				}
			},
			stopDrag() {
				if (this.parentNode.tagName.toUpperCase() === 'DRAGCASE') {
					window.cancelAnimationFrame(this.parentNode.dragID);
				}
			}
		}
	}, true);
}