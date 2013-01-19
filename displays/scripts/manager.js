var EffectsManager = function(params) {
	var _this = this;

	this.container = params.el;
	window.c = this.container;
	var defaultbg = "black";
	soundManager.setup({
  		url: 'swf/',
	});

	soundManager.onready(function(){
		if (params.sounds){
			var sounds = params.sounds;
			sounds.forEach(function(soundurl){
				(function(){
					console.log(soundurl);
					soundManager.createSound({
						id: soundurl,
						url: soundurl
					});
				})(soundurl)
			})
		}
	})
}

EffectsManager.prototype.flash = function(delay, duration) {
	var _this = this;
	var iterations = Math.ceil(duration/delay);

	for (var i = 0; i < iterations; i++) {
		(function(i){
			setTimeout(function(){
				$(_this.container).css("opacity", 1);
				setTimeout(function(){
					$(_this.container).css("opacity", 0);
				}, delay + i * delay)	
			}, i * delay)
		})(i)
	}

	return this;
}

EffectsManager.prototype.fade = function(speed, duration) { // duration is in ms
	var _this = this;
	var iterations = Math.ceil(duration/(speed * 2));
	console.log(iterations);

	for (var i = 0; i < iterations; i++) {
		(function(i){
			setTimeout(function(){
				$(_this.container).fadeOut(speed, function(){
					$(_this.container).fadeIn(speed, function(){
					});
				});
			}, i * speed);
		})(i);
	}
	return this;
}

EffectsManager.prototype.sound = function(id) {
	soundManager.play(id);
	return this;
}

EffectsManager.prototype.setbg = function(color) {
	$(this.container).css("background-color", color);
}