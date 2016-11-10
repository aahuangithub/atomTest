
game = Object.create(Game.prototype);
window.onresize();
var a = atom.context;
var touchX, touchY = 0;


var hand = [];
for (let i = 0; i<7; i++){
	hand.push(new Card(50+50*i));
}

atom.canvas.addEventListener("touchstart", (e)=>{
	touchX = e.targetTouches[0].pageX; 
	touchY = e.targetTouches[0].pageY;
	e.preventDefault();
	for(let i=hand.length-1; i>=0; i-=1){
		if(hand[i].checkCollision()){
			this.originDiff = 0;
			hand[i].xDiff = hand[i].x - touchX;
			hand[i].yDiff = hand[i].y - touchY;
			hand[i].isClicked = true;
			break;
		}
	}
});
atom.canvas.addEventListener("touchmove", (e)=>{
	touchX = e.targetTouches[0].pageX; 
	touchY = e.targetTouches[0].pageY; 
	e.preventDefault();
});
atom.canvas.addEventListener("touchend", (e)=>{
	touchX = e.changedTouches[0].pageX; 
	touchY = e.changedTouches[0].pageY;
	e.preventDefault();
	//
	
	for(let i = 0; i< hand.length; i++){
		hand[i].isClicked = false;
		if(hand[i].x>atom.canvas.width/2){
			hand[i].makeTweenX(atom.canvas.width*1.1);
		}
		else{
			hand[i].makeTweenX(0);
		}
		if(hand[i].y<atom.canvas.height*0.02){hand[i].makeTweenY(atom.canvas.height*0.03);}
		else if (hand[i].y>atom.canvas.height*0.75){hand[i].makeTweenY(atom.canvas.height*0.74);}
		else{hand[i].yTarget=hand[i].y;}
	}
})


game.update = function(dt){
	for(let i = 0; i< hand.length; i++) {
		hand[i].update(); 
	}
}

game.draw = function(){
	this.drawBackground();
	
	for(let i = 0; i< hand.length; i++){
		hand[i].show();
	}
}

game.drawBackground = function(){
	a.beginPath();
	a.fillStyle = '#37474F';
	a.fillRect(0, 0, atom.width, atom.height);
}

game.run();