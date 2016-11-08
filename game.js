atom.input.bind(atom.button.LEFT, 'left'); //makes atom.button.LEFT trigger 'left' to become true
var a = atom.context;
game = Object.create(Game.prototype);

game.update = function(dt){
	if (atom.input.pressed('left')){
		this.drawTestRect(0, 0, 22, 22);
	}
	else if (atom.input.down('left')){
		this.drawTestRect(0, 0, 22, 22);
	}
}

game.draw = function(){
	atom.context.fillStyle = 'black';
	atom.context.fillRect(0, 0, atom.width, atom.height);
	this.drawBackground();
	this.drawTestRect(atom.input.mouse.x, atom.input.mouse.y);
		if (atom.input.pressed('left')){
		this.drawTestRect(0, 0, 22, 22);
	}
	else if (atom.input.down('left')){
		this.drawTestRect(0, 0, 22, 22);
	}
}

game.drawBackground = function(){
	a.beginPath();
	a.fillStyle = '#FAFAFA';
	a.fillRect(0, 0, atom.width, atom.height/2);
}

game.drawTestRect = function(x, y){
	a.beginPath();
	a.fillStyle = '#FF0000';
	a.fillRect(x, y, 20, 20);
}
//
window.onfocus = function(){
	game.run();
}

game.run();