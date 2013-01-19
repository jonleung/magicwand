var ScreenSimulator = function(params) {
	this.container = params.el;
	this.cols = params.cols;
	this.rows = params.rows;
	this.screenbox = params.screenbox || {
		width: "100px",
		height: "80px",
		gutter: "10px"
	}
	this.screenboxcontainer = ".screenbox";
	this.effects = []; // row, col
	window.eee = this.effects;
	this.init();
}

ScreenSimulator.prototype.init = function() {
	var _this = this;

	var w = parseInt(this.screenbox.width);
	var h = parseInt(this.screenbox.height);
	var g = parseInt(this.screenbox.gutter);


	$(this.container).css("width", (w + g) * this.cols + g);
	$(this.container).css("height", (h + g) * this.rows + g);

	for (var r = 0; r < _this.rows; r++) {
		(function(r){
			_this.effects[r] = [];
			for (var c = 0; c < _this.cols; c++) {
				(function(c){
					console.log(r.toString() + " " + c.toString());
					var id = r.toString() + c.toString();
					var params = {
						el: "#"+id
					}

					$(_this.container).append("<div class='screenbox' id='" + id + "'></div>");
					_this.effects[r][c] = new EffectsManager(params);
				})(c)
			}
		})(r);
	}

	$(this.screenboxcontainer).css("width", this.screenbox.width);
	$(this.screenboxcontainer).css("height", this.screenbox.height);
	$(this.screenboxcontainer).css("margin-right", this.screenbox.gutter);
	$(this.screenboxcontainer).css("margin-bottom", this.screenbox.gutter);
}

ScreenSimulator.prototype.flash = function(arrayofclients){
	var _this = this;
	arrayofclients.forEach(function(client) {
		_this.effects[client[0]][client[1]].flash(100, 5000);
	})
	return this;
}

ScreenSimulator.prototype.fade = function(arrayofclients){
	
	var _this = this;
	arrayofclients.forEach(function(client) {
		_this.effects[client[0]][client[1]].fade(1000, 5000);
	})
	return this;
}

ScreenSimulator.prototype.sound = function(r, c){
	return this;
}


// begin object for screen
var Screen = function(row, col) {
	this.row = row;
	this.col = col;
}

Screen.prototype.create = function() {
}