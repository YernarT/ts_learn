// 记分牌的类
export default class ScorePanel {
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
