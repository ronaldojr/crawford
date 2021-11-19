const $content = document.querySelector(".content");
const $menuBars = document.getElementById("menu-bars");
const $menuSpans = document.querySelectorAll(".menu-bar");
const $navUl = document.querySelector("nav > ul");

$menuBars.addEventListener('click', function (event) {
    event.preventDefault();
    collectionToggleClass($menuSpans, 'active');
  	$navUl.classList.toggle('active');
}, false);


function collectionToggleClass(elements, classToggle) {
    let size = elements.length;
    for (let i = 0; i < size; i++) {
        elements[i].classList.toggle(classToggle);
    }

}