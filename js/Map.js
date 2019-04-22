//地图类
function Map(row,col,width,height) {
	this.row = row;
	this.col = col;
	this.width = width;
	this.height = height;
	//数组用于储存每一个元素
	this.arr = [];
	this.dom = document.createElement("div");
	this.dom.className = "dom";
}
//将方法添加在原型中
Map.prototype.fill = function () {

	//填充满每一行
	for(var i = 0;i<this.row;i++) {
		this.dom_row = document.createElement("div");
		this.dom_row.className = "row";
		//数组用于储存每个行元素
		var row_arr = [];

		//填充每一列
		for(var j = 0;j<this.col;j++){
		//创建一个span元素  追加到每个dom_row里面
		this.dom_col = document.createElement("span");
		this.dom_row.appendChild(this.dom_col);
		//给this.dom_col添加类名用于样式的设置
		this.dom_col.className = "col";
		//将创建的span 都添加到row_arr中
		row_arr.push(this.dom_col);
		
	}
		//把每一行填充完的每一列 都追加到dom里面
		this.dom.appendChild(this.dom_row);
		//再把row_arr 都添加到this.arr中
		this.arr.push(row_arr);	
		}
	//上树
	document.body.appendChild(this.dom);

	
	}

	//清屏
	Map.prototype.clearscreen = function() {
		for(var i = 0;i<this.arr.length;i++) {
			for(var j = 0;j<this.arr.length;j++) {
				this.arr[i][j].style.backgroundImage = "none";
			}
		}
	}
	
