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
		this.head.style.left = `${value}px`;
	}

	// 设置蛇头垂直坐标
	set y(value: number) {
		this.head.style.top = `${value}px`;
	}

	// 添加蛇身
	addBody() {
		// beforeend 表示插入到 结束标签之前
		this.element.insertAdjacentHTML('beforeend', '<div></div>');
	}
}
