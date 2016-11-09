var Card = class{
	constructor(y){
		this.x=0;
		this.originDiff = 0;
		this.willSlideOff = false;
		this.y = y;
		this.xDiff;
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
		else{
			
			if (this.x>=atom.canvas.width/2){
				this.willSlideOff = true;
			}
			if(this.x-atom.canvas.width*1.> -10){
				this.willSlideOff = false;
			}
			
			//slides off screen
			if(this.willSlideOff){
				this.x = this.originDiff;
				this.originDiff = this.originDiff*1.1;
			}
			//moves to x = 0
			else{
				this.x = this.originDiff;
				this.originDiff = this.originDiff*0.25;
			}
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