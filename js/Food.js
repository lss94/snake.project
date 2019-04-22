//食物类
function Food(x,y,img) {
	this.x = x;
	this.y = y;

	this.img = img;
}


//当蛇吃到食物 食物重置方法 
Food.prototype.resetfood = function(x,y) {
	this.x = x;
	this.y = y;
}