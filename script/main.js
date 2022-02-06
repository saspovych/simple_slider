const prev = document.querySelector(".previous");
const next = document.querySelector(".next");
const slider = document.querySelector(".slider");
const sliderWrapper = document.querySelector(".slider_wrapper");
const sliderItems = document.querySelectorAll(".slider_item");
let sliderItemStep = sliderItems[0].offsetWidth + 40;
const sliderItemsLength = sliderItems.length;
const complite = document.querySelector(".complite");
const compliteStep = 100 / (sliderItemsLength - 4);
let interval;
let pressed = false;
let startx;
let x;

console.log(sliderItemStep);

function startInterval() {
	interval = setInterval(() => next.click(), 4000);
}
window.onload = startInterval();


sliderWrapper.addEventListener("mousedown", (e) => {
	pressed = true;
	startx = e.offsetX - slider.offsetLeft;
	sliderWrapper.style.cursor = "grabbing";
	clearInterval(interval);
});

sliderWrapper.addEventListener("mouseenter", () => {
	sliderWrapper.style.cursor = "grab";
});

sliderWrapper.addEventListener("mouseup", () => {
	sliderWrapper.style.cursor = "grab";
	pressed = false;
	clearInterval(interval);
	startInterval();
});

window.addEventListener("mouseup", () => {
	pressed = false;
	clearInterval(interval);
	startInterval();
});

sliderWrapper.addEventListener("mousemove", (e) => {
	if(!pressed) return;

	clearInterval(interval);

	e.preventDefault();
	x = e.offsetX;

	slider.style.left = `${x - startx}px`;
	complite.style.width = (-slider.style.left.replace(/px/, "") / sliderItemStep * compliteStep) > 100
		? "100%"
		: -slider.style.left.replace(/px/, "") / sliderItemStep * compliteStep + "%";
	checkBoundary()
});

function checkBoundary() {
	let outer = sliderWrapper.getBoundingClientRect();
	let inner = slider.getBoundingClientRect();

	if(parseInt(slider.style.left) > 0) {
		slider.style.left = "0px";
	} else if (inner.right < outer.right) {
		slider.style.left = `-${inner.width - outer.width}px`;
	}
}

prev.addEventListener("click", () => {
	let compliteWidth = +complite.style.width.replace(/%/, "");
	let left = +slider.style.left.replace(/px/, "");
	if(left >= 0) {
		left = -(sliderItemStep * (sliderItemsLength - 3));
		complite.style.width = "100%";
	} else {
		complite.style.width = `${compliteWidth - compliteStep}%`;
	}
	slider.style.left = `${left + sliderItemStep}px`;

	clearInterval(interval);
	startInterval();
})

next.addEventListener("click", () => {
	let compliteWidth = +complite.style.width.replace(/%/, "");
	let left = +slider.style.left.replace(/px/, "");
	if(compliteWidth >= 100) {
		complite.style.width = "0%";
	} else {
		complite.style.width = `${compliteWidth + compliteStep}%`;
	}


	if(left <= -(sliderItemStep * (sliderItemsLength - 4))) {
		left = sliderItemStep;
	}
	slider.style.left = `${left - sliderItemStep}px`;

	clearInterval(interval);
	startInterval();
});


function changeHeight() {
	let headerHeight = 0;
	sliderItems.forEach(item => {
		headerHeight = (item.querySelector('h3').offsetHeight > headerHeight)
			? item.querySelector('h3').offsetHeight
			: headerHeight;
	})

	sliderItems.forEach(item => {
		item.querySelector('h3').style.height = `${headerHeight}px`;
	})
}

changeHeight();