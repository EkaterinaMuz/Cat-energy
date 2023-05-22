const slider = document.querySelector('.example__interactive-range')
const beforePicture = document.querySelector('.example__interactive-image-before')
const afterPicture = document.querySelector('.example__interactive-image-after')

slider.addEventListener('input', function(e) {
	beforePicture.style.width = 100 - e.target.value + '%'
	afterPicture.style.width = e.target.value + '%'
})
