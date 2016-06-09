Drag.js
========

[Demo](https://classicoldsong.github.io/Drag.js)

A really cute dragger addone for [Blyde](https://github.com/ClassicOldSong/Blyde), inspired by the dragging effect of [FL Studio](https://www.image-line.com/flstudio/)

Smooth even on MTK devices

![demo](https://cloud.githubusercontent.com/assets/10512422/15921544/be5a1ad0-2e54-11e6-93fb-94c129c043cc.gif)

---

Notice
------------

*Blyde **DOES NOT** compatible with jQuery!!*

Maybe Drag.js is a little bit difficult to use, but it worth it!

Installation
------------

	git clone https://github.com/classicoldsong/Drag.js.git

or

	npm install drag-js

Usage
------------

First you need to include these scripts before document is loaded:

~~~ javascript
<script src="blyde.min.js"></script>
<script src="drag.min.js"></script>
~~~

Then you can drag *ANY* element on your page using `element.stargDrag()`!

API
------------

+ `element.startDrag(width, height)`: Start drag this element with specified width and height in string such as `element.startDrag('124px', '50px')`. You can also stard drag directly without these parameters.
+ `element.dragRelease(callback)`: Release the drag with or without callback and the animation will continue until the element moves to it's target coordinate. Callback will be fired as soon as the animation finishes.
+ `element.stopDrag(callback)`: Stops dragging immediately, if without callback the element will be returned to it's original place. Callback will be fired before the dragHolder and dragCase being removed from the document.
+ `element.moveTo(x, y, callback)`:  Move the element to a specified coordinate with animation. If callback exists, it will be fired as soon as the animation finishes, and the `element.stopDrag()` is **NOT** automatically excuted.

After `element.startDrag()`, you can get these:

+ `element.dragCase`: The container of the element when dragging.
+ `element.dragHolder`: The placeholder for the original element.
+ `element.dragCase.dragger.posX`: Current X coordinate.
+ `element.dragCase.dragger.posY`: Current Y coordinate.
+ `element.dragCase.dragger.deg`: Current rotation degree.

After `element.dragRelease()` you can get these:

+ `element.dragCase.dragger.targetX`: The destination X coordinate, by default it is the X position where your mouse is when `element.dragRelease()` is excuted.
+ `element.dragCase.dragger.targetY`: The destination Y coordinate, by default it is the Y position where your mouse is when `element.dragRelease()` is excuted.

You can set the target position manually after `element.dragRelease()` is excuted, but obviously using `element.moveTo(x, y)` is a better idea.

Not understanding?
------------

Don't worry, just read the source code of `demo.js` to look for some inspiration. You can make it!

License
------------
[MIT](https://cos.mit-license.org/), &copy; [ClassicOldSong](https://github.com/ClassicOldSong)
