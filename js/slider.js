const wrapper = document.querySelector('.example__interactive');
const control = document.querySelector('.example__interactive-range');
const beforeImg = document.querySelector('.cat-before-img');
const before = document.querySelector('.example__interactive-cat-before');
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
  console.log(Number(width) + 5)
	before.style.width = `${Number(width) + 2}%`;
};

control.addEventListener('input', (e) => {
	if (!isActive) {
		return;
	}
	beforeAfterSlider();
});

