
game = Object.create(Game.prototype);
window.onresize();
var a = atom.context;
var touchX, touchY = 0;
var isTouching = false;

var hand = [new Card(50), new Card(200), new Card(350)];
for (let i = 0; i<7; i++){
	hand.push(new Card(50+150*i));
}

    function makeFullscreen(element) {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        }else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        }
    }
atom.canvas.addEventListener("touchstart", (e)=>{
	touchX = e.targetTouches[0].pageX; 
	touchY = e.targetTouches[0].pageY;
	e.preventDefault();
	makeFullScreen(atom.canvas);
	for(let i=hand.length-1; i>=0; i-=1){
		if(hand[i].checkCollision()){
			hand[i].xDiff = hand[i].x - touchX;
			hand[i].yDiff = hand[i].y - touchY;
			hand[i].isClicked = true;
			break;
		}
	}
});
atom.canvas.addEventListener("touchmove", (e)=>{touchX = e.targetTouches[0].pageX; touchY = e.targetTouches[0].pageY; e.preventDefault();});
atom.canvas.addEventListener("touchend", (e)=>{
	touchX = e.changedTouches[0].pageX; 
	touchY = e.changedTouches[0].pageY;
	e.preventDefault();
	//
	for(let i = 0; i< hand.length; i++) hand[i].isClicked = false;
})


game.update = function(dt){
	for(let i = 0; i< hand.length; i++) hand[i].update();
}

game.draw = function(){
	this.drawBackground();
	
	for(let i = 0; i< hand.length; i++) hand[i].show();
}

game.drawBackground = function(){
	a.beginPath();
	a.fillStyle = '#37474F';
	a.fillRect(0, 0, atom.width, atom.height);
}

//
window.onfocus = function(){
	game.run();
}
game.run();