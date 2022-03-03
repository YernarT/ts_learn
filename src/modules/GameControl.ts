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
			case 'ArrowDown':
			case 'Down':
			case 'ArrowLeft':
			case 'Left':
			case 'ArrowRight':
			case 'Right':
				this.direction = e.code;
				this.run();

			case 'Space':
			default:
			// pause()
		}
	}

	// 控制蛇移动的方法
	run() {
		let x = this.snake.x;
		let y = this.snake.y;

		switch (this.direction) {
			case 'ArrowUp':
			case 'Up':
				y -= 10;
				break;

			case 'ArrowDown':
			case 'Down':
				y += 10;
				break;

			case 'ArrowLeft':
			case 'Left':
				x -= 10;
				break;

			case 'ArrowRight':
			case 'Right':
			default:
				x += 10;
				break;
		}

		this.snake.x = x;
		this.snake.y = y;
	}
}
