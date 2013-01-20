var EffectsManager = function(params) {
	var _this = this;

	this.container = params.el;
	window.c = this.container;
	var defaultbg = ["green"] || params.defaultbg;
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

	$(this.container).css("opacity", 1);
	for (var i = 0; i < iterations; i++) {
		(function(i){
			setTimeout(function(){
				$(_this.container).fadeIn(speed, function(){
					$(_this.container).fadeOut(speed, function(){
					});
				});
			}, i * speed);
		})(i);
	}
	return this;
}

EffectsManager.prototype.sPlay = function(id) {
	soundManager.play(id);
	return this;
}

EffectsManager.prototype.sTogglePause = function(id) {
	soundManager.togglePause(id);
	return this;
}

EffectsManager.prototype.sVolume = function(id, volume) {
	soundManager.setVolume(id, volume);
	return this;
}

EffectsManager.prototype.setbg = function(color) {
	$(this.container).css("background-color", color);
}

EffectsManager.prototype.lumos = function(magnitude) { // from 0 - 1
	this.setbg("orange");
	$(this.container).fadeTo(100, magnitude);
	return this;
}

EffectsManager.prototype.nyancat = function() {
        this.setbg("white");
	$("<link/>", {
		rel: "stylesheet",
		type: "text/css",
		href: "/displays/nyan.css"
	}).appendTo("head");
	var nyanhtml = '<div id="mainContainer"> <div id="nyanCat"> <div id="wholeHead"> <div class="skin ear"></div> <div class="skin ear rightEar"></div> <div id="mainHead" class="skin"> <div class="eye"></div> <div class="eye rightEye"></div> <div class="nose"></div> <div class="chick"></div> <div class="chick rightChick"></div> <div class="mouth">E</div> </div> </div> <div id="toastBody"> <div> &nbsp; &nbsp; &nbsp;.&nbsp;&nbsp;.&nbsp; &nbsp; &nbsp;..&nbsp; &nbsp; &nbsp;.&nbsp;.&nbsp; &nbsp; &nbsp;&nbsp&nbsp&nbsp;..&nbsp; &nbsp; &nbsp;.&nbsp;&nbsp;. </div> </div> <div id="wholeTail"> <div class="tail skin"></div> <div class="tail middleTail skin"></div> <div class="tail backTail skin"></div> </div> <div id="allYourLegAreBelongToUs"> <div class="skin leg back leftBack"></div> <div class="skin leg back"></div> <div class="skin leg front leftFront"></div> <div class="skin leg front"></div> </div> <div class="rainbow"></div> <div class="rainbow r2"></div> <div class="rainbow r3"></div> <div class="rainbow r4"></div> </div> <div class="star starMovement1"> <div number="1"></div> <div number="2"></div> <div number="3"></div> <div number="4"></div> <div number="5"></div> <div number="6"></div> <div number="7"></div> <div number="8"></div> </div> <div class="star starMovement2 backwards"> <div number="1"></div> <div number="2"></div> <div number="3"></div> <div number="4"></div> <div number="5"></div> <div number="6"></div> <div number="7"></div> <div number="8"></div> </div> <div class="star starMovement3"> <div number="1"></div> <div number="2"></div> <div number="3"></div> <div number="4"></div> <div number="5"></div> <div number="6"></div> <div number="7"></div> <div number="8"></div> </div> <div class="star starMovement4"> <div number="1"></div> <div number="2"></div> <div number="3"></div> <div number="4"></div> <div number="5"></div> <div number="6"></div> <div number="7"></div> <div number="8"></div> </div> <div class="star starMovement5"> <div number="1"></div> <div number="2"></div> <div number="3"></div> <div number="4"></div> <div number="5"></div> <div number="6"></div> <div number="7"></div> <div number="8"></div> </div> </div>';  
	$('body').html(nyanhtml);
	$('body').append('<audio loop="loop" src="/displays/sounds/nyancat.ogg" autoplay="true">');
}

EffectsManager.prototype.totem = function() {
	$(this.container).css("opacity", 1);
	var totemhtml = "<img src='totem.gif' style='zoom:3'>"
	$('#animationarea').html(totemhtml);
}


EffectsManager.prototype.logo = function() {
	$(this.container).css("opacity", 1);
	var logohtml = "<div style='display:absolute; z-index:999999999; margin: 0 auto; font-size: 170pt; font-family: Arial'>Magic Wand.</div>"
	$('#animationarea').html(logohtml);
}


EffectsManager.prototype.troll = function() {
	$(this.container).css("opacity", 1);
	var trollhtml = "<img src='troll.png' style='margin-left: 200px; height: 400px'>";
	$('#animationarea').html(trollhtml);
}

EffectsManager.prototype.sound1 = function() {
	var _this = this;
	this.setbg("red");
	this.sPlay('/displays/sounds/1.mp3');
	setTimeout(function(){_this.fade(300, 13000);}, 500);
}

EffectsManager.prototype.sound2 = function() {
	var _this = this;
	this.setbg("blue");
	this.sPlay('/displays/sounds/2.mp3');
	setTimeout(function(){_this.fade(150, 15000);}, 200);
}

EffectsManager.prototype.sound3 = function() {
	var _this = this;
	this.setbg("green");
	this.sPlay('/displays/sounds/3.mp3');
	setTimeout(function(){_this.flash(150, 8000);}, 150);
}

EffectsManager.prototype.sound4 = function() {
	var _this = this;
	this.setbg("purple");
	this.sPlay('/displays/sounds/4.mp3');
	setTimeout(function(){_this.flash(80, 6000);}, 200);
}

EffectsManager.prototype.soundtogether = function() {
	var _this = this;
	this.setbg("magenta");
	this.sPlay('/displays/sounds/5.mp3');
	setTimeout(function(){_this.fade(1000, 24000);}, 200);
}

EffectsManager.prototype.boom1 = function() {
	var _this = this;
	this.setbg("white");
	this.sPlay('/displays/sounds/boom.mp3');
	setTimeout(function(){
		_this.logo();
	}, 300);
	setTimeout(function(){
		_this.totem();
	}, 4400);
	setTimeout(function() {
		_this.troll();
	}, 8500);
}


