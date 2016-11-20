var Card = class{
	constructor(y){
		this.x=0;
		this.tweenX = 0;
		this.xTarget = 0;
		this.xDiff = 0;

		this.y = y;
		this.tweenY = 0;
		this.yTarget = y;
		this.yDiff = 0;

		this.boxSize = atom.canvas.width;
		this.isClicked = false;
		this.text = "";
	}


	//tweening functions
	makeTweenX(target){
		this.xTarget = target;
		this.tweenX = target + this.x;
	}
	makeTweenY(target){
		this.yTarget = target;
		this.tweenY = target + this.y;
	}
	tweenUpdate(){
		this.x = this.xTarget + this.tweenX;
		this.y = this.yTarget + this.tweenY;
		if (Math.abs(this.tweenX)>1){
			this.tweenX = this.tweenX*0.66;
		}
		if (Math.abs(this.tweenY)>1){
			this.tweenY = this.tweenY*0.66;
		}
	}

	//draws the Card
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

	//updates the Card coordinates
	update(){
		if(this.isClicked){
			this.x = touchX + this.xDiff;
			this.y = touchY + this.yDiff;
		}
		else{
			this.tweenUpdate();
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