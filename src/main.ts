import './style/reset.less';
import './style/index.less';

// 食物类
class Food {
	// 定义一个属性表示食物所对应的元素
	element: HTMLElement;

	constructor() {
		// 获取页面中的 food元素, 并将其赋值给 element属性
		this.element = document.getElementById('food')!;
	}

	// 获取食物水平坐标
	get x() {
		return this.element.offsetLeft;
	}

	// 获取食物垂直坐标
	get y() {
		return this.element.offsetTop;
	}

	// 修改食物位置
	changePosition() {
		// 食物位置 最小是 0, 最大是 舞台宽度-食物大小 290
		// 生成随机位置
		// 蛇移动一次是一格, 一格大小是 10, 食物坐标必须是 整10

		const x = Math.floor(Math.random() * 29) * 10;
		const y = Math.floor(Math.random() * 29) * 10;

		this.element.style.left = `${x}px`;
		this.element.style.top = `${y}px`;
	}
}

// 测试代码
const food = new Food();

console.log(food.x, food.y);
food.changePosition();
console.log(food.x, food.y);
