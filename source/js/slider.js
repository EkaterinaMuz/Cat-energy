const wrapper = document.querySelector('.example__interactive');
const control = document.querySelector('.example__interactive-range');
const beforeImg = document.querySelector('.cat-before-img');
const afterImg = document.querySelector('.cat-after-img');
const before = document.querySelector('.example__interactive-cat-before');
const after = document.querySelector('.example__interactive-cat-after');
const body = document.body;

let isActive = false;

document.addEventListener('DOMContentLoaded', () => {
	let width = wrapper.offsetWidth;
	beforeImg.style.width = `${width}px`;
});

control.addEventListener('input', (e) => {
  e.preventDefault();
	isActive = true;
});


window.onresize = function(e) {
  let width = wrapper.offsetWidth;
	beforeImg.style.width = `${width}px`;

}

const beforeAfterSlider = () => {
  const width = control.value
	before.style.width = `${Number(width) + 2}%`;
	after.style.width = `${100 - (Number(width))}%`;

};

control.addEventListener('input', (e) => {
	if (!isActive) {
		return;
	}
	beforeAfterSlider();
});

