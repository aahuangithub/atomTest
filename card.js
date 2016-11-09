var Card = class{
	constructor(y){
		this.x = 0;
		this.y = y;
		this.xDiff = 0;
		this.yDiff = 0;
		this.boxSize = atom.canvas.width;
		this.isClicked = false;
	}
	show(){
		a.beginPath();
		a.rect(this.x, this.y, this.boxSize, atom.canvas.height);
		a.shadowColor = '#000';
		a.shadowBlur = 90;
		a.shadowOffsetX, a.shadowOffsetY = 20;
		a.fillStyle = '#F5F5F5';
		a.fill();
		a.closePath();
	}
	update(){
		if(this.isClicked){
			this.x = touchX + this.xDiff;
			this.y = touchY + this.yDiff;
		}
	}
	checkCollision(){
		if(touchX<this.x+this.boxSize && touchX>this.x && touchY<this.y+this.boxSize && touchY>this.y){
			return true;
		}
		else{
			return false;
		}
	}
}