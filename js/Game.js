//游戏类
function Game(map,food,blcok,snake) {
	this.map = map;
	this.food = food;
	this.block = block;
	this.snake = snake;
	this.timer = null;
	//判断游戏是否在进行中 当游戏在进行中是 才会执行某些代码
	this.flag = null;

	this.init();
}
//方法初始化
Game.prototype.init = function() {
	this.mapblock();
	this.renderfood();
	this.rendersnake();
	this.renderblock();
	this.start();
	this.event();


}
//渲染地图
Game.prototype.mapblock = function () {
	this.map.fill();
}
//渲染食物
Game.prototype.renderfood = function () {
	var x = this.food.x;
	var y = this.food.y;
	// this.map.arr[x][y].style.backgroundColor = "red";
	this.map.arr[x][y].style.backgroundImage = "url("+this.food.img+")";
	this.map.arr[x][y].style.backgroundSize = "cover";

}
//渲染蛇
Game.prototype.rendersnake = function () {
	// 获取蛇身体的每一部分并渲染上颜色
	// for(var i = 0;i<this.snake.arr.length;i++) {
	// 	var x = this.snake.arr[i].x;
	// 	var y = this.snake.arr[i].y;
	// 	this.map.arr[x][y].style.backgroundColor = "orange";
	// }
	//渲染蛇的头部
	var head = this.snake.arr[this.snake.arr.length - 1];
	this.map.arr[head.x][head.y].style.backgroundImage = "url("+this.snake.head[this.snake.headidx]+")";
	this.map.arr[head.x][head.y].style.backgroundSize = "cover";
	
	//渲染蛇的身体
	for(var i = 1;i<this.snake.arr.length - 1;i++) {
		var bodyx = this.snake.arr[i].x;
		var bodyy = this.snake.arr[i].y;
		this.map.arr[bodyx][bodyy].style.backgroundImage = "url("+this.snake.body[0]+")";
		this.map.arr[bodyx][bodyy].style.backgroundSize = "cover";
	
	}
	//渲染蛇尾
	var tail = this.snake.arr[0];
	this.map.arr[tail.x][tail.y].style.backgroundImage = "url("+this.snake.tail[this.snake.tailidx]+")";
	this.map.arr[tail.x][tail.y].style.backgroundSize = "cover";

}
//渲染障碍物
Game.prototype.renderblock = function() {
	for(var i = 0; i< this.block.arr.length;i++) {
		var x = this.block.arr[i].x;
		var y = this.block.arr[i].y;
		// this.map.arr[x][y].style.backgroundColor = "#000";
		this.map.arr[x][y].style.backgroundImage = "url("+this.block.img+")";
		this.map.arr[x][y].style.backgroundSize = "cover";

	}
}
//游戏开始
Game.prototype.start = function() {
	//备份this
	var me = this;
	//让flag= true; 执行如果中间代码判断游戏结束 就让flag = false 了  然而在后面某些代码在flag为真的情况下才会执行 避免了不必要的bug出现
	this.flag = true;
	//设置定时器让蛇移动开始游戏
	timer = setInterval(function () {
		//移动
		me.snake.move();
		//一直循环检查蛇是否碰到边界 碰到自身 是否吃到食物 是否撞到障碍物
		me.checkfood();
		me.checkmap();
		me.checksnake();
		me.checkblock();
		//如果有些没有结束 才会执行下面的代码
		if(me.flag){
		//清屏
		me.map.clearscreen();
		//渲染食物
		me.renderfood();
		//渲染蛇
		me.rendersnake();
		//渲染障碍物
		me.renderblock();
	}
	},300);
}


//绑定事件 用户按下上下左右键时改变蛇的方向
Game.prototype.event = function() {
	//备份this
	var me = this;
	document.onkeydown = function (e) {
		var code = e.keyCode;//获取用户按下的编码
		//如果用户按下的相应的键获得的对应编码妈祖条件 就调用snake的change方法
		if(code === 37 || code === 38 || code === 39 || code === 40){
			me.snake.change(code);
		}
	}
}


//有些结束方法
Game.prototype.gameover = function() {
	//当游戏结束时 让flag = false 不再执行某些代码
	this.flag = false;
	//游戏结束清除定时器
	clearInterval(timer);
}


//检测蛇头是否撞到墙
Game.prototype.checkmap = function() {
	//获取蛇头的位置
	var snakehead = this.snake.arr[this.snake.arr.length - 1];
	//判断蛇头的位置是否到达了map 的四个边界
	if(snakehead.x < 0 || snakehead.y < 0 || snakehead.x >= this.map.row || snakehead.y >= this.map.col) {
		//蛇撞墙了
		alert("蛇撞墙了！！！");
		//指向gameover方法
		this.gameover();
	}
}


//检测蛇是否碰到了食物 
Game.prototype.checkfood = function() {
	//获取蛇头的位置
	var snakehead = this.snake.arr[this.snake.arr.length - 1];
	//判断蛇的列和行是否都等于 食物所在的列和行 如果相等 就执行growup方法
	if(snakehead.x === this.food.x && snakehead.y === this.food.y) {
		this.snake.growup();
		//碰到食物 则执行食物重置方法
		this.resetfood();
	}
}


//蛇碰到食物 食物重置 并且新出现的食物不能再蛇身上  利用for 循环获取蛇身体的每一个坐标值与食物的坐标值进行比较 如果相等就表示重合 再次执行食物的重置方法
Game.prototype.resetfood = function() {
	//食物出现的位置是随机出现的 但是必须在map的 row col 值内
	var x = parseInt(Math.random() * this.map.row);
	var y = parseInt(Math.random() * this.map.col);
	for(var i = 0;i<this.snake.arr.length - 1;i++) {
		var position = this.snake.arr[i];
		if(position.x === this.food.x && position.y === this.food.y) {
			alert("食物和蛇重合了");
			//当食物和蛇身体重合了  就让重置食物方法自执行 知道食物不出现在蛇的身体上 就会执行下一步
			this.resetfood();
			return;
		}
		//判断食物是否出现在了障碍物的身上、
	for(var j = 0;j<this.block.arr.length;j++) {
		var block = this.block.arr[j];
		if(block.x === this.food.x && block.y === this.food.y) {
			alert("食物和障碍物重合了");
			this.resetfood();
			return;
		}
	}
		//如果食物没有重合到蛇的身上 就执行food的resetfood方法
		this.food.resetfood(x,y);

	}
}




//检查蛇是否碰到了自己 
Game.prototype.checksnake = function() {
	//获取蛇头的的位置 判断蛇头的xy值 是否与蛇身体的任意一段的xy值相等 如果相等就结束游戏
	var head = this.snake.arr[this.snake.arr.length - 1];
	//除去蛇头 循环与蛇头的位置进行判断
	for(var i = 0; i<this.snake.arr.length - 1;i++) {
		var body = this.snake.arr[i];
		if(head.x === body.x && head.y === body.y) {
			//蛇碰到自己游戏结束
			alert("GAME OVER!!!");
			this.gameover();
		}
	}
}

//检查蛇是否碰到了障碍
Game.prototype.checkblock = function() {
	//检查蛇头的xy值 是否等于循环的障碍物的每一个的xy的坐标值
	var head = this.snake.arr[this.snake.arr.length - 1];
	for(var i = 0;i<this.block.arr.length;i++) {
		var blockx = this.block.arr[i].x;
		var blocky = this.block.arr[i].y;
		if(head.x === blockx && head.y === blocky) {
			alert("GAME OVER!!!");
			//定时器结束
			this.gameover();
		}
	}
}
