
game = Object.create(Game.prototype);
window.onresize();
var a = atom.context;
var touchX, touchY, sendTransparency = 0;


var hand = [];
for (let i = 0; i<7; i++){
	hand.push(new Card(50+20*i));
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
			if((hand[i].y>atom.canvas.height*0.66)){
				hand[i].yTarget = atom.canvas.height*0.66-i*10;
			}
			else{
				hand[i].yTarget=hand[i].y;
			}
		}
		if(hand[0].y<atom.canvas.height*0.02){
			hand[0].makeTweenY(atom.canvas.height*0.03);
		}
	}
);

game.update = function(dt){
	for(let i = 0; i<hand.length; i++) {
		hand[i].update(); 
	}
	for(let i = 1; i<hand.length; i++) {
		while(hand[i].y-hand[i-1].y<50 && !hand[i].isClicked){
			hand[i].y+=10;
		} 
	}

	for(let i = hand.length-2; i>=0; i--) {
		while(hand[i+1].y-hand[i].y<50 && !hand[i].isClicked){
			hand[i].y-=10;
		} 
	}

}

game.draw = function(){
	this.drawBackground();
	//a.globalAlpha = sendTransparency;
	
	a.globalAlpha = 1;	
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