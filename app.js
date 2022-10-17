const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');
const backgrounds = [
	'linear-gradient(90deg, #16D9E3 0%, #30C7EC 47%, #46AEF7 100%)',
	'linear-gradient(90deg, #95e699 0%, #60e867 47%, #18e222 100%)',
	'linear-gradient(90deg, #ef9175 0%, #f06b42 47%, #eb420e 100%)',
	'linear-gradient(90deg, #e3ef75 0%, #dbed3d 47%, #d5ec0a 100%)',
	'linear-gradient(90deg, #ef75d0 0%, #ef35c0 47%, #ee08b4 100%)'];

let time = 0;
let score = 0;

startBtn.addEventListener('click', event => {
	event.preventDefault();
	screens[0].classList.add('up');
});

timeList.addEventListener('click', event => {
	if (event.target.classList.contains('time-btn')) {
		time = parseInt(event.target.getAttribute('data-time'));
		screens[1].classList.add('up');
		startGame();
	}
});

board.addEventListener('click', event => {
	if (event.target.classList.contains('circle')) {
		score++;
		event.target.remove();
		createCircle();
	}
})

function startGame() {
	setInterval(decreaseTime, 1000);

	createCircle();		
}

function decreaseTime() {
	if (time === 0) {
		finishGame();
	} else {
		let current = --time;

		if (current < 10) {
			timeEl.innerHTML = `00:0${time}`;
			setTime('0' + current);
		} else {
			setTime(current);
		}
	}	
}

function setTime(value) {
	timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
	timeEl.parentNode.classList.add('hide');
	board.innerHTML = `<h1>Score: <span class="primary">${score}</span></h1>`;
}

function createCircle() {
	const circle = document.createElement('div');
	const size = getRandomNumber(5, 70);
	const {width, height} = board.getBoundingClientRect();
	const x = getRandomNumber(0, width - size);
	const y = getRandomNumber(0, height - size);
	const background = getRandomBackground();

	circle.classList.add('circle');
	circle.style.width = `${size}px`;
	circle.style.height = `${size}px`;
	circle.style.top = `${y}px`;
	circle.style.left = `${x}px`;
	circle.style.background = background;

	board.append(circle);
}

function getRandomNumber(min, max) {
	return min + Math.floor(Math.random() * (max - min));
}

function getRandomBackground() {
	return backgrounds[Math.floor(Math.random() * backgrounds.length)];
}