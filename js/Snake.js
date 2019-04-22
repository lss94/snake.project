//蛇类
function Snake(obj) {
	//数组用于保存蛇的整个身体的位置
	this.arr = [
	{x:6,y:6},
	{x:6,y:7},
	{x:6,y:8},
	{x:6,y:9},
	{x:6,y:10}
	];
	this.direction = 39;//方向默认向右
	this.lock = true;
	//定义蛇的头部 身体 和尾部
	this.head = obj.snakehead;
	this.body = obj.snakebody;
	this.tail = obj.snaketail;

	//设置蛇头的默认index 为2(第三张图片 蛇头默认向右)
	this.headidx = 2;
	//设置蛇尾的默认idx=0 尾巴向左 为第一张图片
	this.tailidx = 0;
}

//蛇移动的方法
Snake.prototype.move = function () {
	//创建蛇的头部  方向默认向右 所以蛇头应该是arr中的最后一项
	var snakehead = {
		 x : this.arr[this.arr.length - 1].x,
		 y : this.arr[this.arr.length - 1].y
	}
	//判断蛇的方向来改变蛇的头部位置
	if(this.direction === 37) {
		//蛇向左转 x值不变  y-1的位置变为蛇头
		snakehead.y--;
	}else if(this.direction === 38) {
		//蛇向上转 y值不变  x-1的位置变为蛇头
		snakehead.x--;
	}else if(this.direction === 39) {
		//蛇向右转 x值不变  y+1的位置变为蛇头
		snakehead.y++;
	}else if(this.direction === 40) {
		//蛇向下转 y值不变  x+1的位置变为蛇头
		snakehead.x++;
	}
	// 把每一项的新的蛇头添加到arr的最后
	this.arr.push(snakehead);
	//删除arr的第一项及是蛇的尾部
	this.arr.shift();


	//蛇移动后判断蛇的尾部和蛇的前一节的关系
	//获取蛇的尾部
	var tail = this.arr[0];
	//获取蛇尾的前一节
	var pretail = this.arr[1];
	//判断蛇尾与蛇尾前一节的关系  如果蛇尾的列比前一节的列大 说明蛇头在左侧 蛇尾向右改变蛇尾的idx值为2
	// 如果蛇尾的行大于前一节身体的行 说明蛇头向上 蛇尾的idx = 3 ......
	if(tail.x === pretail.x) {
		//三元表达式判断取值
		this.tailidx = tail.y > pretail.y ? 2 : 0;
	}else if(tail.y === pretail.y) {
		this.tailidx = tail.x > pretail.x ? 3 : 1;
	}
}


//添加蛇改变方向方法
Snake.prototype.change = function(direction) {
	//函数节流
	if(!this.lock) {
		return;
	}
	lock = false;
	//判断用户按下的方向和蛇正在运动的方向
	//分析如果用户按下的方向和蛇正在运动的方向相同或者相反 就什么也不做
	var result = Math.abs(this.direction - direction);//绝对值
	if(result === 0 || result === 2) {
		return;
	}else {
		this.direction = direction;
	}
	//执行change方法 改变蛇的运动方向的时候 需要对蛇头的idx 值进行重新的赋值
	if(direction === 37) {
		//向左 idx = 0
		this.headidx = 0;
	}else if(direction === 38) {
		//向上
		this.headidx = 1;
	}else if(direction === 39) {
		// 向右
		this.headidx = 2;
	}else if(direction === 40) {
		this.headidx = 3;
	}
	//锁打开
	this.lock = true;
}

//蛇吃到食物 生长的方法
Snake.prototype.growup = function() {
	//定义蛇的尾部
	var tail = this.arr[0];
	//把定义好的蛇尾添加到蛇身体数组的第一项 也就是蛇的尾部
	this.arr.unshift(tail);
}