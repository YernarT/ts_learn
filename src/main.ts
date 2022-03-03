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

// 记分牌的类
class ScroePanel {
	// 记录分数和等级
	score = 0;
	level = 1;

	// 分数和等级所在的元素, 在构造函数中初始化
	scoreDOM: HTMLElement;
	levelDOM: HTMLElement;

	// 限制等级上限
	levelCap: number;
	// 升级所需分数
	scoreRequiredToLevelUp: number;

	constructor(levelCap: number = 10, scoreRequiredToLevelUp: number = 10) {
		this.scoreDOM = document.getElementById('score')!;
		this.levelDOM = document.getElementById('level')!;

		this.levelCap = levelCap;
		this.scoreRequiredToLevelUp = scoreRequiredToLevelUp;
	}

	// 加分方法
	addScore() {
		this.score += 1;
		this.scoreDOM.innerHTML = this.score.toString();

		// 是否升级
		if (this.score % this.scoreRequiredToLevelUp === 0) {
			this.levelUp();
		}
	}

	// 升级方法
	levelUp() {
		// 高于等级上限不改变
		if (this.level < this.levelCap) {
			this.level += 1;
			this.levelDOM.innerHTML = this.level.toString();
		}
	}
}
