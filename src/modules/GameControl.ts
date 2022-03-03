import Snake from './Snake';
import Food from './Food';
import ScorePanel from './ScorePanel';

// 游戏控制器
export default class GameControl {
	snake: Snake;
	food: Food;
	scorePanel: ScorePanel;

	constructor() {
		this.snake = new Snake();
		this.food = new Food();
		this.scorePanel = new ScorePanel();
	}
}
