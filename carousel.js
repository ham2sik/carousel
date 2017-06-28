(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		define(function() {
			return factory(root);
		});
	} else if (typeof exports === 'object') {
		module.exports = factory;
	} else {
		root.JKUIT = factory(root);
	}
})(this, function (root) {

	'use strict';

	var uit = {};

	var carousel = uit.carousel = function (container, options) {
		if (!(this instanceof carousel)) {
			return new carousel(container, options);
		}

		if (!container) {
			return false;
		}

		var defaults = {
			timerDur : 5000,
			duration : 300,
			autoplay : true,
			timerBar : false,
			slideHover : true,
			wrapper : '.carousel-wrapper',
			slide : '.carousel-slide',
			playButton : '.carousel-btn-play',
			stopButton : '.carousel-btn-stop',
			nextButton : '.carousel-btn-next',
			prevButton : '.carousel-btn-prev',
			pagination : '.carousel-pagination-bullet'
		};
		var c = this,
			slideTimer,
			o = $.extend(defaults, options),
			$container = $(container),
			$wrapper = $container.find(o.wrapper),
			$slide = $wrapper.find(o.slide),
			maxNum = $slide.size()-1,
			$playButton = $container.find(o.playButton),
			$stopButton = $container.find(o.stopButton),
			$nextButton = $container.find(o.nextButton),
			$prevButton = $container.find(o.prevButton),
			$pagination = $container.find(o.pagination);

		function nextNumber(num, type) {
			if (type == "next") {
				if (num != maxNum) {
					num++;
				} else {
					num = 0;
				}
			} else if (type == "prev") {
				if (num != 0) {
					num--;
				} else {
					num = maxNum;
				}
			}
			return num;
		}

		c.init = function () {
			// slide size view init
			if (maxNum > 0) {
				$slide.eq(0).addClass('on');
				$pagination.eq(0).addClass('on');
			} else if (maxNum == 0) {
				$slide.eq(0).addClass('on');
				$pagination.hide();
				return false;
			} else {
				$container.hide();
				return false;
			}

			// autoplay(+play, stop) init
			if (o.autoplay) {
				$playButton.addClass('on');
				$stopButton.removeClass('on');
				slideTimer = setTimeout(function(){c.render(0, nextNumber(0, "next"), "next")}, o.timerDur);
			} else {
				$playButton.removeClass('on');
				$stopButton.addClass('on');
			}

			// button event init
			if ($pagination.length > 0) {
				c.event.clickPagination();
			}
			if (($nextButton.length > 0) && ($prevButton.length > 0)) {
				c.event.clickNext();
				c.event.clickPrev();
			}
			if (($playButton.length > 0) && ($stopButton.length > 0)) {
				c.event.clickPlay();
				c.event.clickStop();
			}

			// hover event init
			if (o.slideHover) {
				c.event.hoverSlide();
			}
		};

		c.event = {
			clickPagination : function() {
				$pagination.on('click.clickPagination', function() {
					var clickIndex = $pagination.index($(this));
					if ($(this).hasClass('on')) {
						return false;
					}
					c.clickRender("next", clickIndex);
				});
			},
			clickNext : function() {
				$nextButton.on('click.clickNext', function() {
					c.clickRender("next");
				});
			},
			clickPrev : function() {
				$prevButton.on('click.clickPrev', function() {
					c.clickRender("prev");
				});
			},
			clickPlay : function() {
				$playButton.on('click.clickPlay', c.play);
			},
			clickStop : function() {
				$stopButton.on('click.clickStop', c.stop);
			},
			hoverSlide : function() {
				$slide.on('mouseenter.hoverSlide', function() {
					clearTimeout(slideTimer);
				});
				$slide.on('mouseleave.hoverSlide', function() {
					if (o.autoplay) {
						var onIndex = $wrapper.find(o.slide+'.on').index();
						slideTimer = setTimeout(function(){c.render(onIndex, nextNumber(onIndex, "next"), "next")}, o.timerDur/2);
					}
				});
			}
		}

		c.clickRender = function(type, nextNum) {
			if ($slide.is(":animated")) {
				return false;
			}
			var onIndex = $wrapper.find(o.slide+'.on').index();
			if (nextNum == null) {
				nextNum = nextNumber(onIndex, type);
			} else {
				if (onIndex > nextNum) {
					type = "prev";
				}
			}

			c.render(onIndex, nextNum, type);

		};

		c.play = function () {
			var onIndex = $wrapper.find(o.slide+'.on').index();

			if (o.autoplay) {
				return false;
			}
			o.autoplay = true;
			$playButton.addClass('on');
			$stopButton.removeClass('on');
			slideTimer = setTimeout(function(){c.render(onIndex, nextNumber(onIndex, "next"), "next")}, o.timerDur);
		};

		c.stop = function () {
			clearTimeout(slideTimer);
			o.autoplay = false;
			$playButton.removeClass('on');
			$stopButton.addClass('on');
		};

		c.render = function (onNum, nextNum, type) {
			clearTimeout(slideTimer);
			var leftValue = '100%',
				on_leftValue = '-100%';
			if (type == "prev") {
				leftValue = '-100%';
				on_leftValue = '100%';
			}
			$slide.eq(onNum).css('display', 'block').removeClass('on').animate({
				'left' : on_leftValue
			}, {
				duration : o.duration,
				complete : function() {
					$(this).removeAttr('style');
					$pagination.eq(onNum).removeClass('on');
				}
			});
			$slide.eq(nextNum).css('left', leftValue).addClass('on').animate({
				'left' : 0
			}, {
				duration : o.duration,
				complete : function() {
					$(this).removeAttr('style');
					$pagination.eq(nextNum).addClass('on');
				}
			});
			if (o.autoplay) {
				slideTimer = setTimeout(function(){c.render(nextNum, nextNumber(nextNum, "next"), "next")}, o.timerDur);
			}
		};

		c.init();
	};

	return uit;
});
