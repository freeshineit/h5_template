var touch = (function (window,$) {
	"use strict";
	var touch = {
		config: {
			target: $('body'), // element
			moveLength: 40, // number
			start: function (position, config) {}, // Function
			move: function (position, config) {}, // Function
			end: function(position, config) {} // Function
		},
		position: {
			start: {
				x:0,
				y:0
			},
			end: {
				x: 0,
				y: 0
			},
			deltaX: 0,
			deltaY: 0,
			moveLength: 0,
			direction: {
				x: '',
				y: ''
			}
		},
		start: function(target ,config) {
			this.config.target = target;
			this.config = $.extend(this.config, config);
			this.touchStart()
		},
		init: function(){
			this.position ={
				start: {
					x:0,
					y:0
				},
				end: {
					x: 0,
					y: 0
				},
				deltaX: 0,
				deltaY: 0,
				moveLength: 0,
				direction: {
					x: '',
					y: ''
				}
			}
		},
		touchStart: function () {
			var _this = this;
			var start = _this.config.start
			_this.config.target.off('touchstart').on('touchstart', function (e) {
				// touch start
				_this.init(); // initialization data

				var touche = e.touches[0];
		            _this.position.start = {
		                x: touche.pageX,
		                y: touche.pageY
		            }
				start(_this.position, _this.config);

			}).on('touchmove', function (e) {
				// touch start
				var move = _this.config.move;
				var touche = e.touches[0];
		            _this.position.end = {
		                x: touche.pageX,
		                y: touche.pageY
		            };
		 
		            _this.position.deltaX = _this.position.end.x - _this.position.start.x;
		            _this.position.deltaY = _this.position.end.y - _this.position.start.y;
		            _this.position.moveLength = Math.sqrt(Math.pow(Math.abs(_this.position.deltaX), 2) + Math.pow(Math.abs(_this.position.deltaY), 2));
                    console.log('move')
		            move(_this.position, _this.config);

			}).off('touchend').on('touchend', function (e) {
				// touch end
				var deltaX = _this.position.deltaX;
				var deltaY = _this.position.deltaY;
				var moveLength = _this.config.moveLength;
				var end = _this.config.end;

				if (Math.abs(deltaX) > moveLength) {
					if(deltaX < -moveLength) { // left
						_this.position.direction.x = 'left'
		            } else if (deltaX > moveLength) { // right
		            	_this.position.direction.x = 'right'
		            }
				} 

	            if (Math.abs(deltaY) > moveLength) {

		            if(deltaY < moveLength) { // top
						_this.position.direction.y = 'top'
		            } else if (deltaY > moveLength) { // bottom
		            	_this.position.direction.y = 'bottom'
		            }
				}

		        end(_this.position, _this.config);

			})
		}
	}

	if (typeof define == 'function') {
    	define( function(){ return touch; } );
	} else if (typeof module != 'undefined' && module.exports) {
	    module.exports = touch;
	}

	window['touch'] = touch
	return touch;
})(window, $);

