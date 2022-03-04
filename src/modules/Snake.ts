// 蛇类
export default class Snake {
	// 蛇的容器
	element: HTMLElement;
	// 蛇头元素
	head: HTMLElement;
	// 蛇身元素 (包括蛇头)
	bodies: HTMLCollection;

	constructor() {
		this.element = document.getElementById('snake')!;

		this.head = document.querySelector('#snake > div') as HTMLElement;
		this.bodies = this.element.getElementsByTagName('div');
	}

	// 获取蛇头水平坐标
	get x() {
		return this.head.offsetLeft;
	}

	// 获取蛇头垂直坐标
	get y() {
		return this.head.offsetTop;
	}

	// 设置蛇头水平坐标
	set x(value: number) {
		// 如果新旧值相同 则不再修改
		if (this.x === value) {
			return;
		}

		// x值的合法范围 [0, 290]
		if (value < 0 || value > 290) {
			// 蛇撞墙
			throw Error('hit the wall');
		}

		// 禁止掉头
		if (
			this.bodies[1] &&
			(this.bodies[1] as HTMLElement).offsetLeft === value
		) {
			// 如果发生掉头, 让它反方向继续移动
			if (value > this.x) {
				// 如果 新值value 大于 旧值x, 则说明蛇在往右走, 此时发生掉头, 应该继续往左走
				value = this.x - 10;
			} else {
				// 向左走
				value = this.x + 10;
			}
		}

		this.head.style.left = `${value}px`;
		this.moveBody();
		this.checkHeadBodyCollide();
	}

	// 设置蛇头垂直坐标
	set y(value: number) {
		// 如果新旧值相同 则不再修改
		if (this.x === value) {
			return;
		}

		// y值的合法范围 [0, 290]
		if (value < 0 || value > 290) {
			// 蛇撞墙
			throw Error('hit the wall');
		}

		// 禁止掉头
		if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
			// 如果发生掉头, 让它反方向继续移动
			if (value > this.y) {
				value = this.y - 10;
			} else {
				value = this.y + 10;
			}
		}

		this.head.style.top = `${value}px`;
		this.moveBody();
		this.checkHeadBodyCollide();
	}

	// 添加蛇身
	addBody() {
		// beforeend 表示插入到 结束标签之前
		this.element.insertAdjacentHTML('beforeend', '<div></div>');
	}

	// 移动蛇身
	moveBody() {
		/**
		 * 将 i节身体位置 修改为 i-1 节身体位置
		 * 栗子:
		 *   第3节位置 = 第2节位置
		 *   第2节位置 = 蛇头
		 *   蛇头 往指定方向 移动一格
		 *   PS: 此方法不操作蛇头, 仅移动蛇身 move body!
		 */

		// 遍历所有身体节点 (从后往前)
		for (let i = this.bodies.length - 1; i > 0; i++) {
			// 获取前面蛇身位置
			let x = (this.bodies[i - 1] as HTMLElement).offsetLeft;
			let y = (this.bodies[i - 1] as HTMLElement).offsetTop;

			// 设置到当前身体
			(this.bodies[i] as HTMLElement).style.left = `${x}px`;
			(this.bodies[i] as HTMLElement).style.top = `${y}px`;
		}
	}

	// 检查头和身体是否相撞
	checkHeadBodyCollide() {
		// 获取所有身体, 检查是否和蛇头坐标发生重叠
		for (let i = 1; i < this.bodies.length; i++) {
			let body = this.bodies[i] as HTMLElement;

			// 蛇头撞到身体, 游戏结束
			if (this.x === body.offsetLeft && this.y === body.offsetTop) {
				throw Error('bump into yourself');
			}
		}
	}
}
