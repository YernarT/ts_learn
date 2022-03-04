import Snake from './Snake';
import Food from './Food';
import ScorePanel from './ScorePanel';

// 游戏控制器
export default class GameControl {
	snake: Snake;
	food: Food;
	scorePanel: ScorePanel;

	// 移动方向 (按键方向)
	direction: string = '';
	// 游戏暂停
	isPause = false;
	// 游戏结束
	isDone = false;

	constructor() {
		this.snake = new Snake();
		this.food = new Food();
		this.scorePanel = new ScorePanel();

		this.init();
	}

	// 游戏的初始化方法, 调用后游戏即开始
	init() {
		document.addEventListener('keydown', this.keyDownHandler.bind(this));
	}

	// 键盘按下的响应函数
	keyDownHandler(e: KeyboardEvent) {
		switch (e.code) {
			case 'ArrowUp':
			case 'Up':
			case 'KeyW':
			case 'ArrowDown':
			case 'Down':
			case 'KeyS':
			case 'ArrowLeft':
			case 'Left':
			case 'KeyA':
			case 'ArrowRight':
			case 'Right':
			case 'KeyD':
				this.direction = e.code;
				this.run();
				break;

			case 'Space':
				this.isPause = !this.isPause;
				break;
		}
	}

	// 控制蛇移动的方法
	run() {
		let x = this.snake.x;
		let y = this.snake.y;

		switch (this.direction) {
			case 'ArrowUp':
			case 'Up':
			case 'KeyW':
				y -= 10;
				break;

			case 'ArrowDown':
			case 'Down':
			case 'KeyS':
				y += 10;
				break;

			case 'ArrowLeft':
			case 'Left':
			case 'KeyA':
				x -= 10;
				break;

			case 'ArrowRight':
			case 'Right':
			case 'KeyD':
				x += 10;
				break;
		}

		// 检测蛇 是否吃到食物
		this.checkFoodWasEat();

		try {
			if (!this.isPause && !this.isDone) {
				this.snake.x = x;
				this.snake.y = y;
			}
		} catch (e) {
			// 游戏结束
			console.log(e);
			this.isDone = true;
		}

		!this.isDone &&
			!this.isPause &&
			setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30);
	}

	// 蛇吃食
	checkFoodWasEat() {
		if (this.snake.x === this.food.x && this.snake.y === this.food.y) {
			// 重置食物位置
			this.food.changePosition();
			// 分数增加
			this.scorePanel.addScore();
			// 蛇 增加一节
			this.snake.addBody();
		}
	}
}
